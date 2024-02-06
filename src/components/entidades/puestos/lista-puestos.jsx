'use client'
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function ListaPuesto( {  selectedTipoId, handleGrupoTipoChange}) {

  const [puesto, setPuestos] = useState([]);

  useEffect(() => {
    const fetchPuestos = async () => {
      const { data, error } = await supabase
        .from('puestos')
        .select('*');

      if (error) {
        console.error("Error al obtener los renglones", error);
      } else {
        setPuestos(data);
      }
    }
    fetchPuestos();
  }, []);

    return (
      <>
      <label className="block text-sm font-medium mb-1" htmlFor="group-type">
        Puestos:
      </label>
      <Select onValueChange={handleGrupoTipoChange} value={selectedTipoId?.toString()} >
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        
        <SelectContent position="popper">
          {puesto.map((tipo, index) => (
            <SelectItem key={index} value={tipo.id_puestos.toString()}>{tipo.nombre}</SelectItem>
          ))}
        </SelectContent>

      </Select>
    </>
    );
}

