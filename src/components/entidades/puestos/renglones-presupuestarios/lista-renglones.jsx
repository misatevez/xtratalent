'use client'
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function ListaRenglones({  selectedTipoId, handleGrupoTipoChange, disabled }) {

  const [renglones, setRenglones] = useState([]);

  useEffect(() => {
    const fetchRenglones = async () => {
      const { data, error } = await supabase
        .from('renglon_presupuestario')
        .select('*');

      if (error) {
        console.error("Error al obtener los renglones", error);
      } else {
        setRenglones(data);
      }
    }
    fetchRenglones();
  }, []);


    return (
      <>
      <label className="block text-sm font-medium mb-1" htmlFor="group-type">
        Renglones numero:
      </label>
      <Select onValueChange={handleGrupoTipoChange} value={ selectedTipoId?.toString()} disabled={disabled} >
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        
        <SelectContent position="popper">
          {renglones.map((tipo, index) => (
            <SelectItem key={index} value={tipo.id_renglon_presupuestario.toString()}>{tipo.numero}</SelectItem>
          ))}
        </SelectContent>

      </Select>
    </>
    );
}

