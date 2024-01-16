'use client'
import supabase from "@/lib/supabaseClient";
import { useState } from "react";
import { Notificacion } from "@/components/notification";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ListaEntidadesEmpresas from "../entidades/entidadempresa/lista-entidad-empresa";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";



export default function CrearPerfilUsuario() {

  const router = useRouter();

  const [perfilId, setPerfilId] = useState(null);

  // Estado inicial para el formulario
  const [formState, setFormState] = useState({
    nombre: '',
    descripcion: '',
  });
  
  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });


   // Manejar cambios en los inputs
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormState(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const handleCloseNotification = () => {
  setNotification((prev) => ({ ...prev, visible: false }));
};

const handleSelectChange = (value, fieldName) => {
  setFormState(prevState => ({
    ...prevState,
    [fieldName]: value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log(formState)

  // Insertar en Supabase
  const { data, error } = await supabase.from('perfil_tipo').upsert([formState]).select('id_perfil').single();

  if (error) {
    setNotification({
      visible: true,
      titulo: "Error",
      mensaje: "Vuelva a intentar mas tarde: " + error.message // Ajusta según necesites
    });
  } else {
    setNotification({
      visible: true,
      titulo: "Éxito",
      mensaje: "Se ha creado su perfil" // Ajusta según necesites
    });
    setPerfilId(data.id_perfil);
  }
};


    return (
      <>
          <main className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Perfiles de usuario</h1>

        <div className="grid grid-cols gap-4">
          <label className="flex flex-col gap-2 w-full">
            <span className="block text-sm font-medium">Nombre del perfil:</span>
            <Input
            name="nombre"
              value={formState.nombre}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              style={{
                width: "100%",
              }}
              type="text"
            />
          </label>
        </div>
        <div className="grid grid-cols gap-4">
          <label className="flex flex-col gap-2">
            <span className="block text-sm font-medium">Descripcion de funciones:</span>
            <textarea
            name="descripcion"
              value={formState.descripcion}
              onChange={handleInputChange}
            className="border rounded p-2 w-full" cols="50" rows="10" />
          </label>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Button onClick={handleSubmit} className="mt-4">Guardar</Button>
          <Button disabled={!perfilId} onClick={ () => router.push(`/dashboard/seguridad/buscarperfil/${perfilId}`) } className="mt-4">Asignar Privilegios</Button>
        </div>
      </main>
       {notification.visible && (
        <Notificacion
          titulo={notification.titulo}
          mensaje={notification.mensaje}
          visible={notification.visible}
          onClose={handleCloseNotification}
        />
      )}
      </>
    );
}


