'use client'

import { useEffect, useState } from "react";

import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import supabase from "@/lib/supabaseClient";

export default function ListaTipodeGrupoCorporativo( { onGrupoTipoChange, selectedTipoId } ) {
  const [tipos, setTipos] = useState([]);

 // Dentro de useEffect en ListaTipodeGrupoCorporativo
useEffect(() => {
  const fetchTipos = async () => {
    const { data, error } = await supabase.from('grupotipo').select('id_grupotipo, nombre');
    if (error) {
      console.error("Error al obtener los tipos de grupos corporativos: ", error);
    } else {
      setTipos(data);
    }
  };
  fetchTipos();
}, []);


  return (
    <>
      <label className="block text-sm font-medium mb-1" htmlFor="group-type">
        Grupo Tipo Corporativo:
      </label>
      <Select onValueChange={onGrupoTipoChange} value={selectedTipoId?.toString()}>
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        
        <SelectContent position="popper">
          {tipos.map((tipo, index) => (
            <SelectItem key={index} value={tipo.id_grupotipo.toString()}>{tipo.nombre}</SelectItem>
          ))}
        </SelectContent>

      </Select>
    </>
  );
}
