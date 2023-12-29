import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";
import ListaPreguntas from "../../preguntas/lista-preguntas";
import Tabla_respuestas from "./tabla_respuestas";


export default function FormRespuestas({formState,
  handleInputChange,
  handleSubmit,

  handleSelectChange}) {

    const handleGrupoTipoChange = (id_pregunta) => {
      // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
      handleInputChange({
        target: { name: "id_pregunta", value: id_pregunta },
      });
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl">
          <div className="mb-2">
          <span className="font-bold">Seleccione la pregunta:</span>
          <ListaPreguntas 
          
          selectedTipoId={formState.id_pregunta} 
          onGrupoTipoChange={handleGrupoTipoChange}

          />
        </div>

        {formState.id_pregunta &&  <div className="grid grid-cols-1 col-span-full">
  <h3>Lista de respuestas asignadas</h3>
   <Tabla_respuestas onChange={handleInputChange} idPregunta={formState.id_pregunta} />
</div>
          }
        <div className="mb-2">
          <span className="font-bold">Características de la respuesta:</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="type">
              Tipo:
            </label>
            <Select
            onValueChange={(value) => handleSelectChange(value, "tipo_respuesta")}
            value={formState.tipo_respuesta}

            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Texto" />
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
        </div>
        </div>
      </form>
    );
}

