"use client";
import ListaVacantes from "@/components/entidades/puestos/vacantes/lista-vacantes";
import ListaEvaluaciones from "@/components/evaluaciones/evaluacion/lista-evaluacion";
import { Notificacion } from "@/components/notification";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Volver from "@/components/ui/volver";
import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";


export default function page({ params }) {
  const id = params.slug;

  const [formState, setFormState] = useState({
    nombre: "",
    descripcion: "",
    tipo_usuario: "",
    evaluaciones_asignadas: [],
    id_vacante: "",

  });
  const [loading, setLoading] = useState(false);
  const [carga, setCarga] = useState(false);
  const [selectedEvaluaciones, setSelectedEvaluaciones] = useState([]);
  const [selectedEvaluacion, setSelectedEvaluacion] = useState("");
  const [selectedToRemove, setSelectedToRemove] = useState("");
  const [selectedLink, setSelectedLink] = useState("");

  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });




  const tipo_usuario = [
    { valor: "Interno", nombre: "Interno" },
    { valor: "Externo", nombre: "Externo" },
  ];


  const handleSelectChange = (value, fieldName) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleAddEvaluacion = () => {
    if (selectedEvaluacion) {
      setSelectedEvaluaciones([...selectedEvaluaciones, selectedEvaluacion]);
      setSelectedEvaluacion("");
    }
  };

  const handleRemoveEvaluacion = () => {
    if (selectedToRemove) {
      setSelectedEvaluaciones((prevSelected) =>
        prevSelected.filter((evaluacion) => evaluacion.id !== selectedToRemove)
      );
      setSelectedToRemove("");
    }
  };
  
  const handleGuardar = async (e) => {
    e.preventDefault();
  
    const updatedFormState = {
      ...formState,
      id_vacante: id,
      evaluaciones_asignadas: selectedEvaluaciones,
    };
  
    console.log(updatedFormState);
  
    const { data, error } = await supabase
      .from("direcciones_web")
      .upsert(updatedFormState)
      .select('id');
  
    if (error) {
      console.log('Error: ', error);
    } else {
      setSelectedLink('http://localhost:3000/vacantes/registro/' + data[0].id);

      setNotification({
        visible: true,
        titulo: "Dirección web creada",
        mensaje: "La dirección web ha sido creada con éxito"
      });

    }
  };
  

  const handleEvaluaciones = (value) => {
    const [id_evaluacion, nombre] = value.split(",");
    setSelectedEvaluaciones((prevSelected) => [
      ...prevSelected,
      { id: id_evaluacion, nombre },
    ]);
  };

  const handleVacante = (id_vacante) => {
    handleInputChange({ target: { name: 'id_vacante', value: id_vacante } });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchDireccionWeb = async () => {
      const { data, error } = await supabase
        .from("direcciones_web")
        .select("id")
        .eq("id_vacante", id);
      if (error) {
        console.log("Error: ", error);
      } else {
        if (data.length > 0) {
          setCarga(true);
        } else {
          setCarga(false); // Establecer carga en falso si no hay resultados
          console.log(data);
        }
      }
    }
    setLoading(true);
    fetchDireccionWeb();
  }, []);
  

  if(carga)
  {
    return (
      <div className="p-4 mx-auto w-full max-w-2xl mt-4">
        <div className="rounded-lg shadow-lg">
          <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
            <h2 className="text-lg font-bold mb-4">Ya existe una dirección web para esta vacante</h2>
            <Volver />
          </div>
        </div>
      </div>
    );
  }

  if (!loading) {
    return (
      <div className="p-4 mx-auto w-full max-w-2xl mt-4">
        <div className="rounded-lg shadow-lg">
          <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
            <h2 className="text-lg font-bold mb-4">Cargando...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="p-4 mx-auto w-full max-w-2xl mt-4">
      <div className="rounded-lg shadow-lg">
        <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
          <form onSubmit={handleGuardar}>
            <div>
              <h2 className="text-lg font-bold mb-4">Crear dirección web</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ListaVacantes
                  readOnly
                  selectedTipoId={id}
                  onGrupoTipoChange={handleVacante}
                  disabled={true}
                  />
                </div>
                <div>
                  <label className="font-semibold" htmlFor="tipo_usuario">
                    <span className="block text-sm font-medium mb-1">
                      Tipo de usuario
                    </span>
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange(value, "tipo_usuario")
                    }
                    value={formState.tipo_usuario}
                  >
                    <SelectTrigger id="group-type">
                      <SelectValue placeholder="Seleccione uno" />
                    </SelectTrigger>

                    <SelectContent position="popper">
                      {tipo_usuario.map((nivel, index) => (
                        <SelectItem key={index} value={nivel.valor}>
                          {nivel.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
       
              </div>

              <div className="grid grid-cols-10 gap-3 mt-4 ">
                <div className=" col-start-1 col-end-5 ">
                  <ListaEvaluaciones
                    handleGrupoTipoChange={handleEvaluaciones}
                  />
                </div>

                <div className=" col-start-5 col-end-9 " >
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="selected-evaluaciones"
                  >
                    Evaluaciones asignadas:
                  </label>
                  <Select

                    value={selectedToRemove}
                    onValueChange={(value) => setSelectedToRemove(value)}
                    id="selected-evaluaciones"
                  >
                    <SelectTrigger id="selected-evaluaciones">
                      <SelectValue placeholder="Seleccione uno" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {selectedEvaluaciones.map((evaluacion, index) => (
                        <SelectItem key={index} value={evaluacion.id}>
                          {evaluacion.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              <div className="m-auto col-start-9 col-end-11 ">
              <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="selected-evaluaciones"
                  >
                    Quitar:
                  </label>
                <Button onClick={handleRemoveEvaluacion}>
                  X
                </Button>
                </div>
              </div>

              <div className="mt-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="group-name"
                >
                  Link generado:
                </label>
                <Input
                  name="link"
                  value={selectedLink}  
                  id="group-name"
                  placeholder="Aqui se generara el link de la dirección web"
                  readOnly
                  disabled
                />
              </div>


              <div className="mt-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="group-name"
                >
                  Nombre:
                </label>
                <Input
                  name="nombre"
                  value={formState.nombre}
                  onChange={handleInputChange}
                  id="group-name"
                  placeholder="Especial"
                />
              </div>
              <div className="mt-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="group-description"
                >
                  Descripción:
                </label>
                <textarea
                  name="descripcion"
                  value={formState.descripcion}
                  onChange={handleInputChange}
                  className="resize-none border rounded-md w-full p-2"
                  id="group-description"
                  placeholder="El departamento..."
                  rows="4"
                />
              </div>
              <div className="flex justify-around mt-4">
                <Button >Guardar</Button>
                <Volver />
              </div>
            </div>
          </form>
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
