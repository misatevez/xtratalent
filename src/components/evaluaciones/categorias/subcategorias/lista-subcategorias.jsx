import { useEffect, useState } from "react";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import supabase from "@/lib/supabaseClient";

export default function ListaSubCategorias({ onGrupoTipoChange, selectedTipoId, selectedCategoryId }) {
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    const fetchTipos = async () => {
      if (!selectedCategoryId) {
        setTipos([]);
        return;
      }
  
      const { data, error } = await supabase
        .from('sub_categorias')
        .select('id_subcategorias, nombre')
        .eq('id_categoria', selectedCategoryId);
  
      if (error) {
        console.error("Error al obtener los tipos de subentidad ", error);
      } else {
        setTipos(data);
      }
    };
    
    fetchTipos();
  }, [selectedCategoryId]);  // Re-fetch when category changes

  // Cuando la categoría seleccionada cambie, se reseteará el Select a "Seleccione uno"
  return (
    <div className="flex justify-between items-start">
      <div className="w-full">
        <h2 className="font-semibold">Listas de sub-familias disponibles</h2>
        <Select 
          key={selectedCategoryId || 'default-key'} 
          onValueChange={onGrupoTipoChange}
          value={selectedTipoId}
        >
          <SelectTrigger id="group-type">
            <SelectValue placeholder="Seleccione uno" />
          </SelectTrigger>
          
          <SelectContent position="popper">
            {tipos.map((tipo) => (
              <SelectItem key={tipo.id_subcategorias} value={tipo.id_subcategorias.toString()}>
                {tipo.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
