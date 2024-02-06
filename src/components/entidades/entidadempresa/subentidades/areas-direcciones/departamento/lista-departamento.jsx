'use client'

import { useEffect, useState } from "react";

import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import supabase from "@/lib/supabaseClient";

export default function ListaDepartamentos( { onGrupoTipoChange, selectedTipoId , filter, disabled} ) {
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      console.log('Estas en lista departamento:', selectedTipoId);
      console.log('Este es un filtro:', filter);
      if (filter) {
        console.log('Este es un filtro:', filter);
        const { data, error } = await supabase
          .from('departamentos')
          .select('id_departamentos, nombre')
          .eq('id_direcciones', filter);

        if (error) {
          console.error("Error al obtener los departamentos: ", error);
        } else {
          console.log('Estos son los departamentos:', data)
          setDepartamentos(data);
        }
      } else {
        setDepartamentos([]);  // Resetea los departamentos si no hay filtro
      }
    };

    fetchDepartamentos();
  }, [filter]);

  return (
    <>
      <label className="block text-sm font-medium mb-1" htmlFor="group-type">
        Departamentos:
      </label>
      <Select onValueChange={onGrupoTipoChange} value={selectedTipoId?.toString()} disabled={disabled} >
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        
        <SelectContent position="popper">
          {departamentos.map((tipo, index) => (
            <SelectItem key={index} value={tipo.id_departamentos.toString()}>{tipo.nombre}</SelectItem>
          ))}
        </SelectContent>

      </Select>
    </>
  );
}
