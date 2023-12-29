import React, { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function Tabla_respuestas({ idPregunta }) {
  const [respuestas, setRespuestas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (idPregunta) { // Asegurándose de que idPregunta tenga un valor válido
        setLoading(true); // Establecer carga a verdadero mientras se buscan los datos
        const { data, error } = await supabase.from('respuestas').select(`
          id_respuesta,
          tipo_respuesta,
          descripcion,
          correcta
        `).eq('id_pregunta', idPregunta); 

        if (error) {
          console.error("Error al cargar respuestas:", error);
        } else {
          setRespuestas(data);
        }
        setLoading(false);
      }
    }
    fetchData();
  }, [idPregunta]); // Depende únicamente de idPregunta

  const handleDeleteRespuesta = async (id_respuesta) => {
    // Funcionalidad para borrar una respuesta
    const { error } = await supabase.from('respuestas').delete().match({id_respuesta});
    if (error) {
      console.error("Error deleting respuesta: ", error);
    } else {
      setRespuestas(respuestas => respuestas.filter(r => r.id_respuesta !== id_respuesta));
    }
  };

  if (loading) {
    return <div>Cargando respuestas...</div>;
  }

  return (
    <div className="mb-4">
      <div className="mb-2">
        <span className="font-bold">Respuestas asignadas:</span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo de Respuesta</TableHead>
            <TableHead>Correcta</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {respuestas.map((respuesta) => (
            <TableRow key={respuesta.id_respuesta}>
              <TableCell>{respuesta.tipo_respuesta}</TableCell>
              <TableCell>{respuesta.correcta ? "Sí" : "No"}</TableCell>
              <TableCell>{respuesta.descripcion}</TableCell>
              <TableCell>
                <Button className="bg-red-500 text-white" onClick={() => handleDeleteRespuesta(respuesta.id_respuesta)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
