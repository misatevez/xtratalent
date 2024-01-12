'use client'
import { useRouter } from 'next/navigation'
import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { Notificacion } from "@/components/notification";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function page({params}) {
    const slug = params.slug;

    const [loading, setLoading] = useState(true)
    const router = useRouter()

  // Estado inicial para el formulario
  const [formState, setFormState] = useState({
    nombre: '',
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


const handleSubmit = async (e) => {
  e.preventDefault();

  console.log(formState)

  // actualizar registro de categorias
  const { data, error } = await supabase.from("categorias").update([
    {
      nombre: formState.nombre,
    },
  ]).eq('id_categoria', slug);

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
      mensaje: "Se ha creado su categoria" // Ajusta según necesites
    });
  }
};

useEffect(() => {
    const fetchData = async () => {
        const { data, error } = await supabase
            .from("categorias")
            .select("*")
            .eq("id_categoria", slug)
            .single();
        if (error) {
            throw error;
        }
        setFormState(data);
        setLoading(false);
        };
        fetchData();
    }
, [slug]);

if (loading) {
    return <p>Cargando...</p>;
    }


    return (
        <>
        <div className='p-4 mx-auto w-full max-w-2xl mt-4'>
           
        <form onSubmit={handleSubmit} className="rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-center">
        <h1 className="text-3xl font-bold text-center mt-4  text-gray-800">
          Editar categoria
        </h1>
        <div className="mt-4 p-6">
          <label
            className="block text-sm font-medium mb-2 text-start"
            htmlFor="group-name"
          >
            Nombre Familia de Categoria:
          </label>
          <Input
            name="nombre"
            value={formState.nombre}
            onChange={handleInputChange}
            id="group-name"
            placeholder="Office 365"
          />
        </div>
        <div className="flex justify-around mt-4">
          <Button
            type="submit"
            className="bg-blue-500 text-white"
            variant="default"

          >
            Guardar
          </Button>
          <Button
            type="button"
            className="bg-red-500 text-white"
            variant="default"
            onClick={() => router.back()}
          >
            Volver
            </Button>
        </div>
      </div>
    </form>
    </div>
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

