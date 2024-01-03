'use client'
import supabase from "@/lib/supabaseClient";
import { useState } from "react";
import { Notificacion } from "@/components/notification";
import FormPuesto from "./formPuesto";



export function CrearPuesto() {

  // Estado inicial para el formulario
  const [formState, setFormState] = useState({
    nombre: '',
    descripcion: '',
    id_direcciones: '',
    id_departamentos: '',
    id_entidad_empresa:'',
    id_sub_entidad:'',
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
  const { data, error } = await supabase.from('puestos').insert([formState]);

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
      mensaje: "Se ha creado su puesto" // Ajusta según necesites
    });
  }
};

  return (
    (
      <>
      <div className=" p-4 mx-auto w-full max-w-2xl mt-4">
      <FormPuesto titulo="Crear Puesto" 
     formState={formState} 
     handleInputChange={handleInputChange} 
     handleInputChange2={handleInputChange} 
     handleInputChange3={handleInputChange}
     handleInputChange4={handleInputChange}
     handleSubmit={handleSubmit}
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
    )
  );
}
