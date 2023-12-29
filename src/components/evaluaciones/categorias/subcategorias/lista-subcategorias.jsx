import { useEffect, useState } from "react";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import supabase from "@/lib/supabaseClient";

export default function ListaSubCategorias({ onGrupoTipoChange, selectedTipoId, selectedCategoryId }) {
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    const fetchTipos = async () => {
      console.log("selectedCategoryId: ", selectedCategoryId);
      if (!selectedCategoryId) { // Retorna inmediatamente si no hay un id seleccionado
        setTipos([]); // Opcionalmente, resetea tipos a un arreglo vacío o a un estado inicial
        return;
      }
  
      let query = supabase.from('sub_categorias').select('id_subcategorias, nombre');
      query = query.eq('id_categoria', selectedCategoryId);
  
      const { data, error } = await query;
  
      if (error) {
        console.error("Error al obtener los tipos de subentidad ", error);
      } else {
        setTipos(data);
      }
    };
    
    fetchTipos();
  }, [selectedCategoryId, onGrupoTipoChange]);  // Re-fetch when category changes
  

  return (
    <div className="flex justify-between items-start">
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Listas de sub-familias disponibles</h2>
        <Select onValueChange={onGrupoTipoChange} value={selectedTipoId?.toString()}>
          <SelectTrigger id="group-type">
            <SelectValue placeholder="Seleccione uno" />
          </SelectTrigger>
          
          <SelectContent position="popper">
            {tipos.map((tipo, index) => (
              <SelectItem key={index} value={tipo.id_subcategorias.toString()}>{tipo.nombre}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
