'use client'
import React, {useState, useEffect} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import ListaCategorias from "../categorias/lista-categorias";
import ListaSubCategorias from "../categorias/subcategorias/lista-subcategorias";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { Notificacion } from "@/components/notification";


export default function EditarEvaluacion({ id_evaluacion }) {
  const router = useRouter();

  const handleGrupoTipoChange = (id_categoria) => {
    // Cuando cambias la categoría, resetea también la subcategoría seleccionada
    setFormState(prevState => ({
      ...prevState,
      id_categoria: id_categoria,
      id_subcategoria: id_categoria ? null : prevState.id_subcategoria,
    }));
  };
  

  const handleGrupoTipoChange2 = (id_subcategoria) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange({
      target: { name: "id_subcategoria", value: id_subcategoria },
    });
  };

  useEffect(() => {
    const obtenerEvaluaciones = async () => {
      if (id_evaluacion) {
        const { data, error } = await supabase
          .from('evaluaciones')
          .select('*')
          .eq('id_evaluacion', id_evaluacion)
          .single();

        if (error) {
          console.error("Error fetching evaluation details: ", error);
        } else {
          setFormState({ ...data });
        }
      }
    };

    obtenerEvaluaciones();
  }, [id_evaluacion]);


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

   // Función para manejar el cambio en los inputs del formulario
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
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
  const { data, error } = await supabase.from('evaluaciones').update([formState]).eq('id_evaluacion', id_evaluacion);

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
      mensaje: "Se ha actualizado su evaluacion" // Ajusta según necesites
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
      mensaje: "Se ha actualizado su evaluacion" // Ajusta según necesites
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

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="bg-white p-6 shadow-lg rounded-lg mx-auto my-4 text-left">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Editar evaluacion: </h1>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="grid col-span-full">
            <label className="font-semibold " htmlFor="nombre">
              Nombre Evaluacion
            </label>
            <input
              name="nombre"
              value={formState.nombre}
              onChange={handleInputChange}
              className="border p-2"
              id="nombre"
              placeholder="Microsoft Excel 365"
              type="text"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="grid grid-cols-1 text-center ">
            <ListaCategorias
              selectedTipoId={formState.id_categoria}
              onGrupoTipoChange={handleGrupoTipoChange}
            />
            <div className="grid place-items-center m-2">
              <label>
                <span className="font-semibold  text-gray-700">
                  ¿La familia no esta creada?
                </span>
              </label>
              <button
                className="bg-blue-500 text-white p-2 w-1/2 rounded-md "
                variant="default"
                onClick={ () => router.push("/dashboard/evaluaciones/categorias/crearcategoria")} 
              >
                Crear familia
              </button>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 text-center ">
            <ListaSubCategorias
  selectedTipoId={formState.id_subcategoria.toString()}
  selectedCategoryId={formState.id_categoria.toString()}
  onGrupoTipoChange={handleGrupoTipoChange2}
/>
              <div className="grid place-items-center m-2">
                <label>
                  <span className="font-semibold  text-gray-700">
                    ¿La sub-familia no esta creada?
                  </span>
                </label>
                <button
                  className="bg-blue-500 text-white p-2 w-1/2 rounded-md "
                  variant="default"
                  onClick={ () => router.push("/dashboard/evaluaciones/categorias/subcategorias/crearsubcategorias")} 
                >
                  Crear sub-familia
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
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
          <div className="flex justify-center items-center">
            ESPACIO PARA EXPLICACION
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="clase">
              Clase-Tipo Objetivo Asociado
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
          <div className="flex  justify-center items-center">
            ESPACIO PARA EXPLICACION
          </div>
          <div className="grid grid-cols-2 col-span-full gap-4 mb-4 ">
            <div className="grid grid-cols-2 ">
              <div>
                <label className="font-semibold" htmlFor="duracion">
                  Duracion (Minutos)
                </label>
                <input
                  name="duracion"
                  value={formState.duracion}
                  onChange={handleInputChange}
                  className="border p-2"
                  id="duracion"
                  placeholder="80"
                  type="number"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="limite_tiempo"
                  checked={!!formState.limite_tiempo} // Usa !! para convertir a booleano en caso de que sea undefined o null
                  onChange={handleInputChange}
                  className="mr-2"
                  id="limite_tiempo"
                />
                <label className="font-semibold" htmlFor="limite_tiempo">
                  Limite de tiempo
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 ">
              <div>
                <label className="font-semibold" htmlFor="duracion">
                  Calificacion (Minima Req)
                </label>
                <input
                  name="calificacion"
                  value={formState.calificacion}
                  onChange={handleInputChange}
                  className="border p-2"
                  id="duracion"
                  placeholder="80"
                  type="number"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="activa"
                  checked={!!formState.activa} // Usa !! para convertir a booleano en caso de que sea undefined o null
                  onChange={handleInputChange}
                  className="mr-2"
                  id="activa"
                />
                <label className="font-semibold" htmlFor="activa">
                  Evaluacion Activa
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="font-semibold" htmlFor="descripcion">
            Descripción:
          </label>
          <textarea
            name="descripcion"
            value={formState.descripcion}
            onChange={handleInputChange}
            className="w-full border p-2"
            id="descripcion"
            placeholder="Esta evaluación es ideal para medir el conocimiento de Excel 365 a los candidatos que requieren conocer, administrar y aplicar herramientas de apoyo y auxiliares para distintos procesos y funciones administrativas y operativas con el propósito de medir desempeño óptimo de sus actividades responsabilidades."
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold" htmlFor="instrucciones">
            Instrucciones:
          </label>
          <textarea
            name="instrucciones"
            value={formState.instrucciones}
            onChange={handleInputChange}
            className="w-full border p-2"
            id="instrucciones"
            placeholder="Lea y evalúe detenidamente cada una de las siguientes preguntas y responda sobre las opciones de respuesta, de acuerdo a su forma de pensar, actuar en base a su conocimiento y/o experiencia."
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold" htmlFor="instrucciones">
            Areas a Evaluar:
          </label>
          <textarea
            name="areas"
            value={formState.areas}
            onChange={handleInputChange}
            className="w-full border p-2"
            id="instrucciones"
            placeholder="Dominio de calculos y formulas"
            rows="3"
          />
        </div>
        <div className="flex justify-around ">
          <Button
            onClick={handleSubmit2}
            className="bg-blue-500 text-white"
            variant="default"
            disabled={!formState.activa}
          >
            Asignar temas
          </Button>
          <Button
            type="submit"
            className="bg-blue-500 text-white"
            variant="default"
          >
            Guardar
          </Button>
        </div>
      </div>
    </form>

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
