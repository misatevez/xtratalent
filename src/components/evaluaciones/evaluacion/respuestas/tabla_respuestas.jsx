'use client'
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { Notificacion } from "@/components/notification";

export default function Tabla_respuestas( { idPregunta, onChange}) {

  const router = useRouter();
  const [grupos, setGrupos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrupoId, setSelectedGrupoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('respuestas').select(`
      id_respuesta,
        tipo_respuesta,
        descripcion,
        correcta,
        preguntas (id_pregunta)
      `).eq('preguntas.id_pregunta', idPregunta); // Asumiendo que idPregunta es pasado como prop
  
      if (error) {
        console.error(error);
        setNotification({
          visible: true,
          titulo: "Error",
          mensaje: "Error al cargar respuestas: " + error.message
        });
      } else {
        setGrupos(data);
        setLoading(false);
      }
    }
    fetchData();
  }, [idPregunta, onChange]); 
  



  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  const handleCheckboxChange = (userId) => {
    setSelectedGrupoId(selectedGrupoId === userId ? null : userId); // Toggle selection
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDeleteGrupo = async (id_respuesta) => {
    setLoading(true);
    const { error } = await supabase.from('respuestas').delete().eq('id_respuesta', id_respuesta);
    if (error) {
      console.error("Error deleting group: ", error);
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Error al eliminar grupo: " + error.message
      });
    } 
    if (!error) {
      setGrupos(prevGrupos => prevGrupos.filter(grupo => grupo.id_respuesta !== id_respuesta));
      setNotification({
        visible: true,
        titulo: "Éxito",
        mensaje: "Respuesta eliminada correctamente"
      });
    }
    setLoading(false);
  };

  const filteredGrupos = grupos.filter(grupo =>
    grupo.descripcion.toLowerCase().includes(searchTerm)
  );

  if (loading) {
    return <div>Loading...</div>;
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
      <TableHead>Accion</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {grupos.map((respuesta, index) => (
      <TableRow key={index}>
        <TableCell>{respuesta.tipo_respuesta}</TableCell>
        <TableCell>{respuesta.correcta ? "Sí" : "No"}</TableCell>
        <TableCell>{respuesta.descripcion}</TableCell>
       <TableCell> <Button
  className={`bg-red-500 text-white }`}
  onClick={() => handleDeleteGrupo(respuesta.id_respuesta)}
>Eliminar</Button>
</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

      </div>
    );
}


