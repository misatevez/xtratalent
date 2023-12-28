'use client'
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useState } from "react";
import { Input } from "@/components/ui/input"
import FormTipoGC from "./formTipoGC";
import { Notificacion } from "@/components/notification";
import supabase from "@/lib/supabaseClient";

export function CrearTipoGC() {


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

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formState)

    // Insertar en Supabase
    const { data, error } = await supabase.from('grupotipo').insert([formState]);

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
        mensaje: "Se ha creado su tipo de grupo corporativo" // Ajusta según necesites
      });
    }
  };


  return (
    (
      <>
      <div className=" p-4 mx-auto w-full max-w-2xl mt-4">
     <FormTipoGC titulo="Crear Tipo de Grupo Corporativo" 
     formState={formState} 
     handleInputChange={handleInputChange} 
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

