import { useEffect, useState } from "react";

import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import supabase from "@/lib/supabaseClient";

export default function ListaDirecciones( { onGrupoTipoChange, selectedTipoId, filter } ) {
  const [direcciones, setDirecciones] = useState([]);

  useEffect(() => {
    const fetchDirecciones = async () => {
      let query = supabase
        .from('direcciones')
        .select('id_direcciones, nombre');

      // Applying the filter conditionally
      if(filter) {
        query = query.eq('id_sub_entidad', filter);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error al obtener las direcciones: ", error);
      } else {
        setDirecciones(data || []);
      }
    };

    fetchDirecciones();
  }, [filter]); // Este efecto se ejecuta cada vez que el filtro cambia

  return (
    <>
      <label className="block text-sm font-medium mb-1" htmlFor="group-type">
        Direcciones:
      </label>
      <Select onValueChange={onGrupoTipoChange} value={selectedTipoId?.toString()}>
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        
        <SelectContent position="popper">
          {direcciones.map((direccion, index) => (
            <SelectItem key={index} value={direccion.id_direcciones.toString()}>{direccion.nombre}</SelectItem>
          ))}
        </SelectContent>

      </Select>
    </>
  );
}
