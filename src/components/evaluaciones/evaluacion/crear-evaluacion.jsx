'use client'
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import FormEvaluacion from "./formEvaluacion";
import { Notificacion } from "@/components/notification";
import supabase from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function CrearEvaluacion() {

  const router = useRouter();


    // Estado inicial para el formulario
    const [formState, setFormState] = useState({
      nombre: '',
      descripcion: '',
      id_categoria:'',
      id_subcategoria:'',
      nivel:'',
      clase:'',
      duracion:'',
      limite_tiempo: null,
      calificacion:'',
      activa: null,
      instrucciones:'',
      areas:'',
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
    const { data, error } = await supabase.from('evaluaciones').upsert([formState]);

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
        mensaje: "Se ha creado su evaluacion" // Ajusta según necesites
      });
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    // Insertar en Supabase
    const { data, error } = await supabase.from('evaluaciones').upsert([formState]).select();


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
        mensaje: "Se ha creado su evaluacion" // Ajusta según necesites
      });
    }

    // Asegúrate de que data no está vacía y tiene al menos un elemento (la fila insertada)
    if(data && data.length > 0) {
      const idEvaluacion = data[0].id_evaluacion; // Ajusta 'id' al nombre real de tu columna de ID en la tabla de 'evaluaciones'
      router.push(`/dashboard/evaluaciones/temas/asignartema/${idEvaluacion}`);
    } else {
      // Manejar el caso en que no hay datos retornados
      console.error("No se retornaron datos de la inserción");
    }

  };


  return (
    <>
    <div className=" p-4 mx-auto w-full max-w-5xl mt-4 ">
    <FormEvaluacion titulo="Crear Evaluacion"
    formState={formState} 
    handleInputChange={handleInputChange} 
    handleSubmit={handleSubmit}
    handleSubmit2={handleSubmit2}
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
