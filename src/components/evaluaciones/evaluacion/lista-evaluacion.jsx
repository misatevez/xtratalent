'use client'
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function ListaEvaluaciones({ handleGrupoTipoChange }) {
  const [evaluaciones, setEvaluaciones] = useState([]);

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      const { data, error } = await supabase
        .from('evaluaciones')
        .select('*');

      if (error) {
        console.error("Error al obtener los renglones", error);
      } else {
        setEvaluaciones(data);
      }
    }
    fetchEvaluaciones();
  }, []);

  return (
    <>
      <label className="block text-sm font-medium mb-1" htmlFor="group-type">
        Evaluaciones disponibles:
      </label>
      <Select onValueChange={(value) => handleGrupoTipoChange(value)} >
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>

        <SelectContent position="popper">
          {evaluaciones.map((tipo, index) => (
            <SelectItem
              key={index}
              value={`${tipo.id_evaluacion},${tipo.nombre}`} // Combinar id_evaluacion y tipo.nombre en un solo valor separado por coma
            >
              {tipo.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
