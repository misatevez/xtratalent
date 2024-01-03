'use client'
import supabase from "@/lib/supabaseClient";
import { useState } from "react";

import { Notificacion } from "@/components/notification";

import FormPerfilUsuario from "./formPerfilUsuario";



export default function CrearPerfilUsuario() {


  // Estado inicial para el formulario
  const [formState, setFormState] = useState({
    nombre: '',
    descripcion: '',
    id_subtipo_entidad: ''
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
  const { data, error } = await supabase.from('entidad_empresa').insert([formState]);

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
      mensaje: "Se ha creado su subtipo de entidad" // Ajusta según necesites
    });
  }
};

    return (
       <FormPerfilUsuario
       
       formState={formState} 
       handleInputChange={handleInputChange} 
       handleSubmit={handleSubmit}

       />
    );
}


