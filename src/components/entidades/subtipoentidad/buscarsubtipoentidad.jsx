'use client'
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { Notificacion } from "@/components/notification";
import { formatearFecha } from "@/lib/fechaService";

export default function BuscarSubTipoEntidad() {
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
      const { data, error } = await supabase.from('subtipo_entidad').select(`
      id_subtipo_entidad,
      nombre,
      descripcion,
        fecha_creado,
        fecha_actualizado,
      grupo_corporativo:grupo_corporativo (id_grupocorporativo, nombre)
    `);
      if (error) {
        console.error(error);
        setNotification({
          visible: true,
          titulo: "Error",
          mensaje: "Error al cargar grupos: " + error.message
        });
      } else {
        setGrupos(data);
        setLoading(false);
      }
    }
    fetchData();
  }, []);



  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  const handleCheckboxChange = (userId) => {
    setSelectedGrupoId(selectedGrupoId === userId ? null : userId); // Toggle selection
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDeleteGrupo = async () => {
    if (!selectedGrupoId) return;
    setLoading(true);
    const { error } = await supabase.from('subtipo_entidad').delete().eq('id_subtipo_entidad', selectedGrupoId);
    if (error) {
      console.error("Error deleting group: ", error);
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Error al eliminar: Tiene informacion pendiente por eliminar"
      });
    } else {
      setGrupos(prevGrupos => prevGrupos.filter(grupo => grupo.id_subtipo_entidad !== selectedGrupoId));
      setSelectedGrupoId(null);
      setNotification({
        visible: true,
        titulo: "Éxito",
        mensaje: "Sub-Entidad eliminada correctamente"
      });
    }
    setLoading(false);
  };

  const filteredGrupos = grupos.filter(grupo =>
    grupo.nombre.toLowerCase().includes(searchTerm) ||
    grupo.descripcion.toLowerCase().includes(searchTerm) ||
    grupo.grupo_corporativo.nombre.toLowerCase().includes(searchTerm)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      
      <div className="p-4 mx-auto w-full max-w-6xl mt-4">
                <div className="rounded-lg shadow-lg">
                  <div className="bg-white p-6 rounded-lg shadow-inner m-auto">


        <h1 className="text-xl font-bold mb-4">BUSCAR  SUB TIPO ENTIDADES</h1>
        <div className="flex justify-center">
          <Input className="mr-2" placeholder="Buscar" type="text" onChange={handleSearchChange} />
        </div>
        <div className="overflow-x-auto mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Grupo Tipo</TableHead>
                <TableHead className="w-[200px]">Nombre del Subtipo Entidad</TableHead>
                <TableHead className="w-[200px]">Descripcion del Subtipo Entidad</TableHead>
                <TableHead className="w-[150px]">Fecha Registro</TableHead>
                <TableHead className="w-[150px]">Última Modificación</TableHead>
                <TableHead className="w-[100px]">Seleccionar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrupos.map((grupo, index) => (
                <TableRow key={index}>
                  <TableCell>{grupo.grupo_corporativo.nombre}</TableCell>
                  <TableCell>{grupo.nombre}</TableCell>
                  <TableCell>{grupo.descripcion}</TableCell>
                  <TableCell>{ formatearFecha( grupo.fecha_creado)}</TableCell>
                  <TableCell>{ formatearFecha( grupo.fecha_actualizado)}</TableCell>
                  <TableCell><input
                  type="checkbox"
                  checked={selectedGrupoId === grupo.id_subtipo_entidad}
                  onChange={() => handleCheckboxChange(grupo.id_subtipo_entidad)}
                  className="accent-black h-5 w-5"
                /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-around mt-4">
      <Button
          className={`bg-black text-white ${!selectedGrupoId ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!selectedGrupoId}
          onClick={() => router.push(`/dashboard/entidades/subtipoentidad/${selectedGrupoId}`)}
        >
          Modificar
        </Button>
        
        <Button
  className={`bg-red-500 text-white ${!selectedGrupoId ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={!selectedGrupoId}
  onClick={handleDeleteGrupo}
>
  Eliminar
</Button>


      </div>
      </div>
      </div>
      </div>
      {notification.visible && (
        <Notificacion
          titulo={notification.titulo}
          mensaje={notification.mensaje}
          visible={notification.visible}
          onClose={handleCloseNotification}
        />
      )}
    </>
  );
}
