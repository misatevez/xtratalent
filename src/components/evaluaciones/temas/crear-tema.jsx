"use client";

import { useState } from "react";
import FormTema from "./formTema";

import { Notificacion } from "@/components/notification";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";


export default function CrearTema() {

 const router = useRouter();

   // Estado inicial para el formulario
   const [formState, setFormState] = useState({
    nombre: '',
    descripcion: '',
    nivel:'',
    clase:''
  });
  
  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });

   // Manejar cambios en los inputs
   const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

const handleSelectChange = (value, fieldName) => {
  setFormState(prevState => ({
    ...prevState,
    [fieldName]: value,
  }));
};



const handleCloseNotification = () => {
  setNotification((prev) => ({ ...prev, visible: false }));
};


const handleSubmit = async (e) => {
  e.preventDefault();

  console.log(formState)

  // Insertar en Supabase
  const { data, error } = await supabase.from('temas').upsert([formState]).select();

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
      mensaje: "Se ha creado su tema" // Ajusta según necesites
    });
  }

    // Asegúrate de que data no está vacía y tiene al menos un elemento (la fila insertada)
    if(data && data.length > 0) {
      const idTema = data[0].id_tema; // Ajusta 'id' al nombre real de tu columna de ID en la tabla de 'evaluaciones'
      router.push(`/dashboard/evaluaciones/preguntas/crearpregunta/${idTema}`);
    } else {
      // Manejar el caso en que no hay datos retornados
      console.error("No se retornaron datos de la inserción");
    }

};

  return (
    <>
    <div className="p-4 mx-auto w-full max-w-3xl">
    <FormTema
    
    titulo="Crear tema"
    formState={formState} 
    handleInputChange={handleInputChange} 
    handleSubmit={handleSubmit}
    handleSelectChange={handleSelectChange}

    />
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
