'use client'

import { useEffect, useState } from "react";

import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import supabase from "@/lib/supabaseClient";

export default function ListaSubEntidad( { onGrupoTipoChange, selectedTipoId, filter } ) {
  const [subEntidades, setSubEntidades] = useState([]);

  useEffect(() => {
    const fetchSubEntidades = async () => {
      // Aquí asumo que 'filter' es el id de la entidad seleccionada, ajusta según tu esquema de DB
      const { data, error } = await supabase
        .from('sub_entidad')
        .select('id_sub_entidad, nombre')
        .eq('id_entidad_empresa', filter); // Filtrando las subentidades por la entidad seleccionada

      if (error) {
        console.error("Error al obtener las subentidades", error);
      } else {
        setSubEntidades(data);
      }
    };

    if(filter) { // Solo busca subentidades si hay un filtro seleccionado
      fetchSubEntidades();
    } else {
      setSubEntidades([]); // Resetea las subentidades si no hay filtro
    }
  }, [filter]); // Este efecto se ejecuta cada vez que el filtro cambia


  return (
    <>
      <label className="block text-sm font-medium mb-1" htmlFor="group-type">
        Subentidad:
      </label>
      <Select onValueChange={onGrupoTipoChange} value={selectedTipoId?.toString()}>
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        
        <SelectContent position="popper">
          {subEntidades.map((tipo, index) => (
            <SelectItem key={index} value={tipo.id_sub_entidad.toString()}>{tipo.nombre}</SelectItem>
          ))}
        </SelectContent>

      </Select>
    </>
  );
}
