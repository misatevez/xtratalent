'use client'

import { useEffect, useState } from "react";

import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import supabase from "@/lib/supabaseClient";

export default function ListaDirecciones( { onGrupoTipoChange, selectedTipoId, filter } ) {
  const [direcciones, setDirecciones] = useState([]);


  useEffect(() => {
    const fetchDirecciones = async () => {
      if (filter) {
        const { data, error } = await supabase
          .from('direcciones')
          .select('id_direcciones, nombre')
          .eq('id_sub_entidad', filter);

        if (error) {
          console.error("Error al obtener las direcciones: ", error);
        } else {
          setDirecciones(data);
        }
      } else {
        setDirecciones([]);  // Resetea las direcciones si no hay filtro
      }
    };

    fetchDirecciones();
  }, [filter]);


  return (
    <>
      <label className="block text-sm font-medium mb-1" htmlFor="group-type">
        Direcciones:
      </label>
      <Select onValueChange={onGrupoTipoChange} value={selectedTipoId?.toString()}>
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        
        <SelectContent position="popper">
          {direcciones.map((tipo, index) => (
            <SelectItem key={index} value={tipo.id_direcciones.toString()}>{tipo.nombre}</SelectItem>
          ))}
        </SelectContent>

      </Select>
    </>
  );
}
