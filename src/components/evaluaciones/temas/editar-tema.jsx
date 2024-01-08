"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Notificacion } from "@/components/notification";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";

export default function EditarTema({ id_tema }) {
  const router = useRouter();

  const niveles = [
    { valor: "Basico", nombre: "1. Básico" },
    { valor: "Medio", nombre: "2. Medio" },
    { valor: "Intermedio", nombre: "3. Intermedio" },
    { valor: "Avanzado", nombre: "4. Avanzado" },
    { valor: "Experto", nombre: "5. Experto" },
    { valor: "Instructor", nombre: "6. Instructor" },
  ];

  const objetivo = [
    { valor: "Actitud", nombre: "Actitud" },
    { valor: "Aptitud", nombre: "Aptitud" },
    { valor: "Conocimiento", nombre: "Conocimiento" },
    { valor: "Competencia", nombre: "Competencia" },
    { valor: "Especifica-Desempeño", nombre: "Especifica-Desempeño" },
    { valor: "Habilidad", nombre: "Habilidad" },
    { valor: "Tecnico", nombre: "Tecnico" },
    { valor: "Psicometrico", nombre: "Psicometrico" },
  ];

  const [formState, setFormState] = useState({
    nombre: '',
    descripcion: '',
    nivel: '',
    clase: ''
  });
  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });

  useEffect(() => {
    const obtenerTema = async () => {
      if (id_tema) {
        const { data, error } = await supabase
          .from('temas')
          .select('*')
          .eq('id_tema', id_tema)
          .single();

        if (error) {
          console.error("Error fetching evaluation details: ", error);
        } else {
          setFormState({ ...data });
        }
      }
    };

    obtenerTema();
  }, [id_tema]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
    const { error } = await supabase
      .from('temas')
      .update(formState)
      .eq('id_tema', id_tema);

    if (error) {
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Vuelva a intentar más tarde: " + error.message
      });
    } else {
      setNotification({
        visible: true,
        titulo: "Éxito",
        mensaje: "Tema actualizado correctamente"
      });
    }
  };

  const handleSaveAndAssignQuestions = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página
    const { error } = await supabase
      .from('temas')
      .update(formState)
      .eq('id_tema', id_tema);
  
    if (error) {
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Vuelva a intentar más tarde: " + error.message
      });
    } else {
      setNotification({
        visible: false, // Ocultar notificación para evitar que bloquee la navegación
      });
      // Redirige para asignar preguntas
      router.push(`/dashboard/evaluaciones/preguntas/crearpregunta/${id_tema}`);
    }
  };

  return (
    <>
    
    <div className="p-4 mx-auto w-full max-w-3xl">
    <form   onSubmit={handleSubmit} className="rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-start">
        <h1 className="text-3xl font-bold text-center mt-4  text-gray-800">
          Editar tema
        </h1>
        <div className="grid grid-cols-3 mt-6">
          <div className="flex flex-col m-2">
            <div>
              <label className="block font-semibold" htmlFor="group-name">
                Nombre Tema:
              </label>
              <Input
                name="nombre"
                value={formState.nombre}
                onChange={handleInputChange}
                id="group-name"
                placeholder="Microsoft Excel 365"
              />
            </div>
          </div>

          <div className="flex flex-col m-2">
            <label className="font-semibold" htmlFor="nivel">
              Nivel de Profundidad
            </label>

            <Select
              onValueChange={(value) => handleSelectChange(value, "nivel")}
              value={formState.nivel}
            >
              <SelectTrigger id="group-type">
                <SelectValue placeholder="Seleccione uno" />
              </SelectTrigger>

              <SelectContent position="popper">
                {niveles.map((nivel, index) => (
                  <SelectItem key={index} value={nivel.valor}>
                    {nivel.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col m-2">
            <label className="font-semibold" htmlFor="clase">
              Objetivo Asociado
            </label>
            <Select
              onValueChange={(value) => handleSelectChange(value, "clase")}
              value={formState.clase}
            >
              <SelectTrigger id="group-type">
                <SelectValue placeholder="Seleccione uno" />
              </SelectTrigger>

              <SelectContent position="popper">
                {objetivo.map((nivel, index) => (
                  <SelectItem key={index} value={nivel.valor}>
                    {nivel.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="m-2">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="group-description"
          >
            Descripción Tema:
          </label>
          <textarea
            name="descripcion"
            value={formState.descripcion}
            onChange={handleInputChange}
            className="resize-none border rounded-md w-full p-2"
            id="group-description"
            placeholder="Microsoft Excel, forma parte de la suite de Microsoft Office, es una aplicación que permite realizar hojas de cálculo, que está organizada por filas y columnas, y que se utiliza para capturar, calcular y analizar datos numéricos."
            rows="4"
          />
        </div>

        <div className="flex justify-around mt-4">
        <Button
            type="button" // Cambiar a 'button' para evitar el comportamiento de 'submit'
            className="bg-green-500 text-white"
            variant="default"
            onClick={handleSaveAndAssignQuestions} // Llamar a la función que maneja la lógica para guardar y asignar preguntas
          >
           Asignar Preguntas
          </Button>

          <Button type="submit" className="bg-blue-500 text-white" variant="default">
            Guardar cambios
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
