"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";

import supabase from "@/lib/supabaseClient";
import { Notificacion } from "@/components/notification";

export default function AsignarRespuestas({ id_pregunta }) {
  const router = useRouter();

  // Estado inicial para el formulario
  const [formState, setFormState] = useState({
    tipo_respuesta: "",
    descripcion: "",
    correcta: false,
  });

  const [nombrePregunta, setNombrePregunta] = useState("");
  const [respuestas, setRespuestas] = useState([]);
  const [isFirstEffectFinished, setIsFirstEffectFinished] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);

  useEffect(() => {
    const getPregunta = async () => {
      const { data, error } = await supabase
        .from("preguntas")
        .select("pregunta")
        .eq("id_pregunta", id_pregunta)
        .single();

      if (error) {
        console.log(error);
      } else {
        setNombrePregunta(data.pregunta);
        setIsFirstEffectFinished(true);
        setFormState((prevState) => ({
          ...prevState,
          id_pregunta: id_pregunta,
        }));
      }
    };

    getPregunta();
  }, []);

  useEffect(() => {
    if (isFirstEffectFinished) {
      const getRespuestas = async () => {
        // obtener preguntas de id_pregunta
        const { data, error } = await supabase
          .from("respuestas")
          .select("descripcion, id_respuesta,correcta, tipo_respuesta")
          .eq("id_pregunta", id_pregunta);

        if (error) {
          console.log(error);
        } else {
          console.log("Esto es data:", data);
          setRespuestas(data);
        }
      };
      getRespuestas();
    }
  }, [isFirstEffectFinished, triggerEffect]);

  // eliminar pregunta
  const handleDelete = async (id_respuesta) => {
    const { data, error } = await supabase
      .from("respuestas")
      .delete()
      .match({ id_respuesta: id_respuesta });

    setTriggerEffect((prev) => !prev);
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
        mensaje: "Se eliminado una respuesta", // Ajusta según necesites
      });
    }
  };

  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: "",
  });

  // Manejar cambios en los inputs
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (value, fieldName) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // comprobar campos

    if (!formState.tipo_respuesta) {
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "El campo tipo de respuesta es requerido",
      });
      return;
    }

    if (!formState.descripcion) {
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "El campo descripción es requerido",
      });

      return;
    }

      // Verifica si ya existe una respuesta marcada como correcta
  const existeRespuestaCorrecta = respuestas.some((respuesta) => respuesta.correcta);

  if (formState.correcta && existeRespuestaCorrecta) {
    setNotification({
      visible: true,
      titulo: "Error",
      mensaje: "Ya existe una respuesta marcada como correcta.",
    });
    return;
  }

    if (formState.id_respuesta) {
      console.log("Estado del formulario al enviar:", formState);

      // Modo edición - Actualizar la pregunta existente
      const { error } = await supabase
        .from("respuestas")
        .update({
          tipo_respuesta: formState.tipo_respuesta,
          descripcion: formState.descripcion,
          correcta: formState.correcta,
        })
        .eq("id_respuesta", formState.id_respuesta);

      if (error) {
        setNotification({
          visible: true,
          titulo: "Error al actualizar",
          mensaje: error.message,
        });
      } else {
        setNotification({
          visible: true,
          titulo: "Éxito",
          mensaje: "Respuesta se actualizado con éxito",
        });
        // Limpiar el formulario
        setFormState({
          tipo_respuesta: "",
          descripcion: "",
          correcta: false,
          id_pregunta: id_pregunta,
        });
      }
    } else {
      // Modo inserción - Crear una nueva pregunta
      console.log("Estado del formulario al enviar: modo insercion", formState);

      const { error } = await supabase.from("respuestas").insert([formState]);

      if (error) {
        setNotification({
          visible: true,
          titulo: "Error al insertar",
          mensaje: error.message,
        });
      } else {
        setNotification({
          visible: true,
          titulo: "Éxito",
          mensaje: "Se ha creado una nueva respuesta",
        });
      }
    }
    // Disparar cualquier efecto o refresco necesario
    setTriggerEffect((prev) => !prev);
  };

  const handleEdit = async (id_respuesta) => {
    const { data, error } = await supabase
      .from("respuestas")
      .select(
        "tipo_respuesta, descripcion, correcta, id_pregunta, id_respuesta"
      )
      .eq("id_respuesta", id_respuesta)
      .single();

    if (error) {
      console.error("Error cargando la pregunta:", error);
    } else if (data) {
      console.log("Valor original de correcta:", data.correcta);
      // Convertir 'correcta' a booleano si es necesario
      const isCorrecta = data.correcta === true || data.correcta === "true";

      setFormState({
        tipo_respuesta: data.tipo_respuesta,
        descripcion: data.descripcion,
        correcta: isCorrecta,
        id_pregunta: data.id_pregunta,
        id_respuesta: data.id_respuesta,
      });
      console.log("Estado del formulario después de editar:", formState);
    }
  };

  return (
    <>
      <div className="flex w-full h-full">
        <div className="w-1/2 p-4">
          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl"
          >
            <div>
              <h1 className="text-center text-xl font-bold">
                Crear respuestas para la pregunta
              </h1>
            </div>
            <div>
              <span className="font-bold mb-4">Pregunta: </span>
              {nombrePregunta}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="font-bold" htmlFor="type">
                  Tipo:
                </label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, "tipo_respuesta")
                  }
                  value={formState.tipo_respuesta}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Text">Texto</SelectItem>
                    <SelectItem value="Number">Número</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="correcta"
                  checked={!!formState.correcta} // Usa !! para convertir a booleano en caso de que sea undefined o null
                  onChange={handleInputChange}
                  className="mr-2"
                  id="correcta"
                />
                <label className="font-semibold" htmlFor="correcta">
                  Respuesta correcta
                </label>
              </div>
              <div className="grid grid-cols-1 col-span-full">
                <label className="font-bold" htmlFor="description">
                  Descripción:
                </label>
                <textarea
                  name="descripcion"
                  value={formState.descripcion}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border-2"
                  id="description"
                  placeholder="4"
                  rows="2"
                />
              </div>

              <div className="flex justify-between">
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
        <div className="w-1/2 p-4">
          <div className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl">
            <h2 className="text-center text-xl font-bold">
              Respuestas asignadas a la pregunta
            </h2>
            <div>
              <span className="font-bold mb-4">Pregunta: </span>
              {nombrePregunta}
            </div>
            <div className="space-y-4 text-center">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Correcta</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Respuesta</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {respuestas.map((respuesta, index) => (
                    <TableRow key={index}>
                      <TableCell>
                      {respuesta.correcta === "true" ? (
                        <CheckCircleIcon className="text-green-500" />
                      ) : (
                        <XCircleIcon className="text-red-500" />
                      )}
                      </TableCell>
                      <TableCell>{respuesta.tipo_respuesta}</TableCell>
                      <TableCell>{respuesta.descripcion}</TableCell>
                      <TableCell className="flex flex-row gap-1">
                        <Button
                          onClick={() => handleEdit(respuesta.id_respuesta)}
                          className="w-full"
                          type="submit"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(respuesta.id_respuesta)}
                          className="w-full"
                          type="submit"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
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

function CheckCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function XCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
