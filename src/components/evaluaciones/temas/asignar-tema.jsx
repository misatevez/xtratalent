"use client";

import { useEffect, useState } from "react";
import { Notificacion } from "@/components/notification";
import supabase from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ListaTemas from "./lista-de-temas";
import Link from "next/link";

import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import {
    SelectValue,
    SelectTrigger,
    SelectItem,
    SelectGroup,
    SelectContent,
    Select,
  } from "@/components/ui/select";
  import { useRouter } from "next/navigation";


export default function AsignarTema({ id_evaluacion }) {
  const [nombreEvaluacion, setNombreEvaluacion] = useState([]);
  const [isFirstEffectFinished, setIsFirstEffectFinished] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [tema, setTema] = useState([]);
  const [formState, setFormState] = useState({
  });

  const router = useRouter();

  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: "",
  });



  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formState);

 // Actualizar campo id_evaluacion en tabla temas
    const { data, error } = await supabase
      .from("temas")
      .update({ id_evaluacion: formState.id_evaluacion })
      .eq("id_tema", formState.id_tema);

      setTriggerEffect(prev => !prev);

    if (error) {
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Vuelva a intentar mas tarde: " + error.message, // Ajusta según necesites
      });
    } else {
      setNotification({
        visible: true,
        titulo: "Éxito",
        mensaje: "Se asignado el tema a la evaluacion", // Ajusta según necesites
      });
    }
  };

  useEffect(() => {
    const getEvaluacion = async () => {
      const { data, error } = await supabase
        .from("evaluaciones")
        .select('*')
        .eq("id_evaluacion", id_evaluacion)
        .single();

      if (error) {
        console.log(error);
      } else {
        setNombreEvaluacion(data);
        setIsFirstEffectFinished(true);
        setFormState((prevState) => ({
          ...prevState,
          id_evaluacion: id_evaluacion,
        }));
      }
    };

    getEvaluacion();
  }, [triggerEffect]);
  
  useEffect(() => {
    if (isFirstEffectFinished) {
      const getTemas = async () => {
        const { data, error } = await supabase
          .from("temas")
          .select("nombre, id_tema")
          .eq("id_evaluacion", id_evaluacion);
  
        if (error) {
          console.log(error);
        } else {
          console.log('Esto es data de temas:', data);
          // En lugar de agregar a los temas existentes, reemplaza completamente el estado
          setTema(data); // Asumiendo que 'data' es un arreglo de temas
        }
      };
      getTemas();
    }
  }, [isFirstEffectFinished, triggerEffect, id_evaluacion]);
  



   // Manejar cambios en los inputs
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormState(prevState => ({
    ...prevState,
    [name]: value
  }));
};


  const handleGrupoTipoChange = (id_tema) => {
    handleInputChange({ target: { name: 'id_tema', value: id_tema } });
  };


  const handleDelete = async (id_evaluacion, id_tema) => {
    const { error } = await supabase
      .from("temas")
      .update({ id_evaluacion: null }) // Establecer la llave foránea a null para "eliminar" la relación
      .match({ id_evaluacion: id_evaluacion, id_tema: id_tema });
  
    setTriggerEffect(prev => !prev); 
  
    if (error) {
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Vuelva a intentar más tarde: " + error.message, // Ajusta según necesites
      });
    } else {
      setNotification({
        visible: true,
        titulo: "Éxito",
        mensaje: "Se eliminó la relación del tema con la evaluación", // Ajusta según necesites
      });
    }
  };
  


  return (
    <>
     <div className="flex w-full h-full">
      <div className="w-1/2 p-4">
      <div className="p-8 mx-auto w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="rounded-lg shadow-lg">
          <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-start">
            <h1 className="text-center text-xl font-bold">
              Asignar tema a evaluacion
            </h1>
            <div className="grid grid-cols-2 mt-6">
              <div className="flex flex-col m-2">
                <div>
                  <label className="block font-semibold" htmlFor="group-name">
                    Nombre de evaluacion:
                  </label>
                  <span className="text-sm"> {nombreEvaluacion.nombre} </span>
                </div>
              </div>
              <div className="flex flex-col m-2">
                <ListaTemas 
                selectedTipoId={formState.id_tema} 
                onGrupoTipoChange={handleGrupoTipoChange}

                />
              </div>
             
            </div>
            <span className="text-sm font-bold mt-4  text-gray-800" >¿Todavia no ha creado el tema para esta evaluacion? <Link className="text-blue-500 underline" href={"/dashboard/evaluaciones/temas/creartema"}>Crear tema</Link> </span>
            <div className="flex justify-around mt-4">
              <Button
                type="submit"
                className="bg-blue-500 text-white"
                variant="default"
              >
                Asignar
              </Button>
            </div>
          </div>
        </form>
      </div>
      </div>
      <div className="w-1/2 p-4 ">
      <div className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl  rounded-lg shadow-lg">
        <h2 className="text-center text-xl font-bold">Temas asignados a esa evaluacion</h2>
        <div>
      <span className="font-bold mb-4">Evaluacion: </span>
      {nombreEvaluacion.nombre}
      </div>
        <div className="space-y-4 text-center">
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tema</TableHead>
              <TableHead>Accion</TableHead>
              
              <TableHead>Preguntas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {tema.map((tema, index) => (
            <TableRow key={index}>
              <TableCell>{tema.nombre}</TableCell>
              <TableCell>
                <Button onClick={() => router.push(`/dashboard/evaluaciones/temas/${tema.id_tema}`)} className="w-1/2" type="submit">
                  Edit
                  </Button>
                  <Button onClick={() => handleDelete(nombreEvaluacion.id_evaluacion,tema.id_tema)} className="w-1/2" type="submit">
                  Delete
                </Button>
              </TableCell>

              <TableCell>
                <Button onClick={() => router.push(`/dashboard/evaluaciones/preguntas/crearpregunta/${tema.id_tema}`)} className="w-1/2" type="submit">
                  Ver preguntas
                </Button>
              </TableCell>
            </TableRow>
             )) }
          </TableBody>
        </Table>
      
        </div>
      </div>
        </div>
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
