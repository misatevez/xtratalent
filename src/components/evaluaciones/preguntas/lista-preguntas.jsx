'use client'

import { useEffect, useState } from "react";

import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import supabase from "@/lib/supabaseClient";

export default function ListaPreguntas( { onGrupoTipoChange, selectedTipoId } ) {
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    const fetchTipos = async () => {
      const { data, error } = await supabase.from('preguntas').select('id_pregunta, pregunta');
      if (error) {
        console.error("Error al obtener los tipos de subentidad ", error);
      } else {
        setTipos(data);
      }
    };
    fetchTipos();
  }, [onGrupoTipoChange]);

  
    return (
        <div className="flex justify-between items-start">
        <div className="w-full">
          <Select onValueChange={onGrupoTipoChange} value={selectedTipoId?.toString()}>
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        
        <SelectContent position="popper">
          {tipos.map((tipo, index) => (
            <SelectItem key={index} value={tipo.id_pregunta.toString()}>{tipo.pregunta}</SelectItem>
          ))}
        </SelectContent>

      </Select>
          
        </div>
      </div>
    );
}

