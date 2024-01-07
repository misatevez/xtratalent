import { useEffect, useState } from "react";

import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import supabase from "@/lib/supabaseClient";

export default function ListaSubEntidad( { onGrupoTipoChange, selectedTipoId, filter } ) {
  const [subEntidades, setSubEntidades] = useState([]);

  useEffect(() => {
    const fetchSubEntidades = async () => {
      let query = supabase
        .from('sub_entidad')
        .select('id_sub_entidad, nombre');

      // Applying the filter conditionally
      if(filter) {
        query = query.eq('id_entidad_empresa', filter);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error al obtener las subentidades", error);
      } else {
        setSubEntidades(data || []);
      }
    };

    fetchSubEntidades();
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
