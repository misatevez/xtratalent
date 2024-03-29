'use client'
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function ListaVacantes( {  selectedTipoId, handleGrupoTipoChange, disabled}) {

  const [vacantes, setVacantes] = useState([]);

  useEffect(() => {
    const fetchVacantes = async () => {
      const { data, error } = await supabase
        .from('vacantes')
        .select('*');

      if (error) {
        console.error("Error al obtener las vacantes", error);
      } else {
        setVacantes(data);
      }
    }
    fetchVacantes();
  }, []);

    return (
      <>
      <label className="block text-sm font-medium mb-1" htmlFor="group-type">
        Vacantes:
      </label>
      <Select onValueChange={handleGrupoTipoChange} value={selectedTipoId?.toString()} disabled={disabled} >
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        
        <SelectContent position="popper">
          {vacantes.map((tipo, index) => (
            <SelectItem key={index} value={tipo.id.toString()}>{tipo.nombre}</SelectItem>
          ))}
        </SelectContent>

      </Select>
    </>
    );
}

