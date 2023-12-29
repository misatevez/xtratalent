'use client'
import { SelectValue, SelectTrigger, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import FormPregunta from "./formPregunta";
import { Notificacion } from "@/components/notification";
import supabase from "@/lib/supabaseClient";
import { useState } from "react";

export default function CrearPregunta() {

    // Estado inicial para el formulario
    const [formState, setFormState] = useState({
        pregunta: '',
        id_tema:'',
        tipo_pregunta:'',
        revisable: '',
        pregunta_concepto: '',
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
      const { data, error } = await supabase.from('preguntas').insert([formState]);
  
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
          mensaje: "Se ha creado su pregunta" // Ajusta según necesites
        });
      }
    };

    
    return (
        <>
       <FormPregunta
       
       formState={formState} 
       handleInputChange={handleInputChange} 
       handleSubmit={handleSubmit}
       handleSelectChange={handleSelectChange}

       />

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

