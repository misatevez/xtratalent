'use client'
import { useRouter } from 'next/navigation'
import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { Notificacion } from "@/components/notification";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ListaCategorias from '@/components/evaluaciones/categorias/lista-categorias';


export default function page({params}) {
    const slug = params.slug;

    const router = useRouter()

 // Estado inicial para el formulario
 const [formState, setFormState] = useState({
    nombre: '',
    id_categoria:'',
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
  
    // Insertar en Supabase
    const { data, error } = await supabase.from('sub_categorias').upsert([formState]);
  
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
        mensaje: "Se ha actualizado su subcategoria" // Ajusta según necesites
      });
    }
  };

useEffect(() => {
    const fetchData = async () => {
        const { data, error } = await supabase
            .from("sub_categorias")
            .select("*")
            .eq("id_subcategorias", slug)
            .single();
        if (error) {
            throw error;
        }
        setFormState(data);
        };
        fetchData();
    }
, [slug]);


const handleGrupoTipoChange = (id_categoria) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange({ target: { name: 'id_categoria', value: id_categoria } });
  };


    return (
        <>
        <div className='p-4 mx-auto w-full max-w-2xl mt-4'>
           
        <form onSubmit={handleSubmit} className="rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-center">
        <h1 className="text-3xl font-bold text-center mt-4  text-gray-800">
          Editar sub-familia de categoria
        </h1>
        <div className="mt-4 p-6">
        <div className="grid grid-cols-1 gap-4 my-4">
            <div>
            <label
            className="block text-sm font-medium mb-2 text-start"
            htmlFor="group-name"
          >
            Nombre Familia de Categoria:
          </label>
              <ListaCategorias
              selectedTipoId={formState.id_categoria} 
              onGrupoTipoChange={handleGrupoTipoChange}
              />
            </div>
          </div>
          <label
            className="block text-sm font-medium mb-2 text-start"
            htmlFor="group-name"
          >
            Nombre sub-familia de Categoria:
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

