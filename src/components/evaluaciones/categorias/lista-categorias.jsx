'use client'

import { useEffect, useState } from "react";

import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import supabase from "@/lib/supabaseClient";

export default function ListaCategorias( { onGrupoTipoChange, selectedTipoId } ) {
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    const fetchTipos = async () => {
      const { data, error } = await supabase.from('categorias').select('id_categoria, nombre');
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
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Listas de familias disponibles</h2>
          <Select onValueChange={onGrupoTipoChange} value={selectedTipoId?.toString()}>
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        
        <SelectContent position="popper">
          {tipos.map((tipo, index) => (
            <SelectItem key={index} value={tipo.id_categoria.toString()}>{tipo.nombre}</SelectItem>
          ))}
        </SelectContent>

      </Select>
          
        </div>
      </div>
    );
}

