'use client'
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function ListaRenglones() {

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
        console.log(data);
      }
    }
    fetchRenglones();
  }, []);

  const handleGrupoTipoChange = (numero) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange({ target: { name: 'numero', value: numero } });
  };

    return (
      <>
      <label className="block text-sm font-medium mb-1" htmlFor="group-type">
        Renglones numero:
      </label>
      <Select onValueChange={handleGrupoTipoChange}>
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        
        <SelectContent position="popper">
          {renglones.map((tipo, index) => (
            <SelectItem key={index} value={tipo.numero.toString()}>{tipo.numero}</SelectItem>
          ))}
        </SelectContent>

      </Select>
    </>
    );
}

