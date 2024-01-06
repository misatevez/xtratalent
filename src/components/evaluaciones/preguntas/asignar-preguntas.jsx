"use client";

import { useEffect, useState } from "react";
import { Notificacion } from "@/components/notification";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import supabase from "@/lib/supabaseClient";

export default function AsignarPregunta({ id_tema }) {
    const [nombreTema, setNombreTema] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    const [isFirstEffectFinished, setIsFirstEffectFinished] = useState(false);
    const [triggerEffect, setTriggerEffect] = useState(false);


    const router = useRouter();
   // Estado inicial para el formulario
   const [formState, setFormState] = useState({
    pregunta: '',
    tipo_pregunta:'',
    revisable: false,
    pregunta_concepto: '',
  });

  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: "",
  });


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
  
    // Verificar si estamos en modo de edición (es decir, si hay un id_pregunta)
    if (formState.id_pregunta) {
      console.log("Estado del formulario al enviar:", formState);

      // Modo edición - Actualizar la pregunta existente
      const { error } = await supabase
        .from('preguntas')
        .update({
          pregunta: formState.pregunta,
          tipo_pregunta: formState.tipo_pregunta,
          revisable: formState.revisable,
          pregunta_concepto: formState.pregunta_concepto,
        })
        .eq('id_pregunta', formState.id_pregunta); // Asegurarse de actualizar la pregunta correcta
  
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
          mensaje: "Pregunta actualizada con éxito",
        });
         // Limpiar el formulario
         setFormState({
          id_tema: id_tema,
          pregunta: '',
          tipo_pregunta:'',
          revisable: false,
          pregunta_concepto: '',
        });
      }
    } else {
      // Modo inserción - Crear una nueva pregunta
      console.log("Estado del formulario al enviar: modo insercion", formState);

      const { error } = await supabase
        .from('preguntas')
        .insert([formState]);
  
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
          mensaje: "Se ha creado una nueva pregunta",
        });
       
      }
    }
    // Disparar cualquier efecto o refresco necesario
    setTriggerEffect(prev => !prev);
  };
  


  const handleEdit = async (id_pregunta) => {

    const { data, error } = await supabase
      .from("preguntas")
      .select("pregunta, id_pregunta, tipo_pregunta, revisable, pregunta_concepto, id_tema")
      .eq("id_pregunta", id_pregunta)
      .single();
  
    if (error) {
      console.error('Error cargando la pregunta:', error);
      // Aquí podrías establecer una notificación de error o alguna otra forma de manejo de errores
    } else if (data) {
      setFormState({
        id_pregunta: data.id_pregunta,
        pregunta: data.pregunta,
        tipo_pregunta: data.tipo_pregunta,
        pregunta_concepto: data.pregunta_concepto,
        revisable: data.revisable,
        id_tema: data.id_tema,
      });
    }
  }
  

  // eliminar pregunta
  const handleDelete = async (id_pregunta) => {
    const { data, error } = await supabase
      .from("preguntas")
      .delete()
      .match({ id_pregunta: id_pregunta })

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
          mensaje: "Se eliminado una  pregunta", // Ajusta según necesites
        });
      }
  };


  useEffect(() => {
    const getEvaluacion = async () => {
      const { data, error } = await supabase
        .from("temas")
        .select("nombre")
        .eq("id_tema", id_tema)
        .single();

      if (error) {
        console.log(error);
      } else {
        setNombreTema(data.nombre);
        setIsFirstEffectFinished(true);
        setFormState((prevState) => ({
          ...prevState,
          id_tema: id_tema,
        }));
      }
    };


    getEvaluacion();
  }, []);

  useEffect(() => {
    if (isFirstEffectFinished) {
    const getPreguntas = async () => {
      console.log(id_tema)
        // obtener preguntas de id_tema
        const { data, error } = await supabase
        .from("preguntas")
        .select("pregunta, id_pregunta")
        .eq("id_tema", id_tema)      
        
        if(error){
          console.log(error);
      }
      else{
        console.log('Esto es data:', data);
        setPreguntas(data);
      }
    }
    getPreguntas();
  }
  }, [isFirstEffectFinished, triggerEffect]);


  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  

  return (
    <>
    <div className="flex w-full h-full">
      <div className="w-1/2 p-4">
      <form  onSubmit={handleSubmit} key="1" className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl">
      <div>
        <h1 className="text-center text-xl font-bold">Crear preguntas para el tema</h1>
      </div>
      <div>
      <span className="font-bold mb-4">Tema-Contenido:  </span>
      {nombreTema}
      </div>
      <br />
      <span className="font-bold">
        Características y Detalle de la Pregunta:
      </span>
      <div>
        <div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <span className="font-bold">Tipo:</span>
              <span className="ml-2">
                <Select
                  onValueChange={(value) => handleSelectChange(value, "tipo_pregunta")}
                  value={formState.tipo_pregunta}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="text">Texto</SelectItem>
                      <SelectItem value="number">Numerico</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </span>
            </div>

            <div className="flex items-center">
              <div className="flex items-center">
                <span className="font-bold">Seleccione:</span>
                <span className="ml-2">
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange(value, "pregunta_concepto")
                    }
                    value={formState.pregunta_concepto}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="fija">Fija</SelectItem>
                        <SelectItem value="aleatoria">Aleatoria</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </span>
              </div>
            </div>

          </div>

          <div className="flex justify-start mb-4 ">
              <input
                type="checkbox"
                name="revisable"
                checked={!!formState.revisable} // Usa !! para convertir a booleano en caso de que sea undefined o null
                onChange={handleInputChange}
                className="mr-2"
                id="revisable"
              />
              <label className="font-semibold" htmlFor="revisable">
                Revisable
              </label>
            </div>


          <div className="mb-4">
            <label className="font-bold" htmlFor="question">
              Pregunta:
            </label>
            <textarea
              name="pregunta"
              value={formState.pregunta}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 border-2"
              id="question"
              placeholder="Cuanto es 2 X 2"
              rows="2"
            />
          </div>
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
        <h2 className="text-center text-xl font-bold">Preguntas asignadas del tema</h2>
        <div>
      <span className="font-bold mb-4">Tema-Contenido: </span>
      {nombreTema}
      </div>
        <div className="space-y-4 text-center">
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pregunta</TableHead>
              <TableHead>Accion</TableHead>
              
              <TableHead>Respuestas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {preguntas.map((pregunta, index) => (
            <TableRow key={index}>
              <TableCell>{pregunta.pregunta}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(pregunta.id_pregunta)} className="w-1/2" type="submit">
                  Edit
                  </Button>
                  <Button onClick={() => handleDelete(pregunta.id_pregunta)} className="w-1/2" type="submit">
                  Delete
                </Button>
              </TableCell>

              <TableCell>
                <Button onClick={() => router.push(`/dashboard/evaluaciones/respuestas/crear-respuesta/${pregunta.id_pregunta}`)} className="w-1/2" type="submit">
                  Asignar Respuesta
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
