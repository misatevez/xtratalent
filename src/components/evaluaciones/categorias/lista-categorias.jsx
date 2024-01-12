'use client'

import { useEffect, useState } from "react";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import supabase from "@/lib/supabaseClient";

export default function ListaCategorias({ onGrupoTipoChange, selectedTipoId }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategorias = async () => {
      const { data, error } = await supabase.from('categorias').select('id_categoria, nombre');
      if (error) {
        console.error("Error al obtener las categorías: ", error);
      } else {
        setCategorias(data);
        setLoading(false);
      }
    };
    fetchCategorias();
  }, []); // No depende de otros estados o props

  if(loading) return <div>Cargando...</div>
    

  return (
    <div className="flex justify-between items-start">
      <div className="w-full">

        <Select 
          onValueChange={onGrupoTipoChange} 
          value={selectedTipoId?.toString()}
          key={'categoria-select-key'} // A key here might not be necessary unless the Select component needs to be reset
        >
          <SelectTrigger id="group-type">
            <SelectValue placeholder="Seleccione una" />
          </SelectTrigger>
          
          <SelectContent position="popper">
            {categorias.map((categoria) => (
              <SelectItem key={categoria.id_categoria} value={categoria.id_categoria.toString()}>
                {categoria.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
