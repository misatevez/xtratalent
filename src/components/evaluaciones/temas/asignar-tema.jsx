"use client";

import { useEffect, useState } from "react";
import { Notificacion } from "@/components/notification";
import supabase from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ListaTemas from "./lista-de-temas";
import Link from "next/link";

export default function AsignarTema({ id_evaluacion }) {
  const [nombreEvaluacion, setNombreEvaluacion] = useState([]);

  const [formState, setFormState] = useState({
    id_tema: "",
    id_evaluacion: "",
  });

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
        .select("nombre")
        .eq("id_evaluacion", id_evaluacion)
        .single();

      if (error) {
        console.log(error);
      } else {
        setNombreEvaluacion(data.nombre);
        setFormState((prevState) => ({
          ...prevState,
          id_evaluacion: id_evaluacion,
        }));
      }
    };

    getEvaluacion();
  }, []);


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

  return (
    <>
      <div className="p-4 mx-auto w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="rounded-lg shadow-lg">
          <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-start">
            <h1 className="text-3xl font-bold text-center mt-4  text-gray-800">
              Asignar Tema a Evaluacion
            </h1>
            <div className="grid grid-cols-2 mt-6">
              <div className="flex flex-col m-2">
                <div>
                  <label className="block font-semibold" htmlFor="group-name">
                    Nombre de evaluacion:
                  </label>
                  <span className="text-sm"> {nombreEvaluacion} </span>
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
