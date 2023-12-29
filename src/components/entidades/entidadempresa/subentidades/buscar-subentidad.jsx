'use client'
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { Notificacion } from "@/components/notification";

export default function BuscarSubEntidad() {
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
      const { data, error } = await supabase.from('sub_entidad').select(`
      id_sub_entidad,
      nombre,
      descripcion,
      fecha_creado,
      fecha_actualizado,
      entidad_empresa:entidad_empresa (id_entidad_empresa, nombre)
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
    const { error } = await supabase.from('sub_entidad').delete().eq('id_sub_entidad', selectedGrupoId);
    if (error) {
      console.error("Error deleting group: ", error);
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Error al eliminar grupo: " + error.message
      });
    } else {
      setGrupos(prevGrupos => prevGrupos.filter(grupo => grupo.id_sub_entidad !== selectedGrupoId));
      setSelectedGrupoId(null);
      setNotification({
        visible: true,
        titulo: "Éxito",
        mensaje: "Grupo eliminado correctamente"
      });
    }
    setLoading(false);
  };

  const filteredGrupos = grupos.filter(grupo =>
    grupo.nombre.toLowerCase().includes(searchTerm) ||
    grupo.descripcion.toLowerCase().includes(searchTerm) ||
    grupo.entidad_empresa.nombre.toLowerCase().includes(searchTerm) 
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-md m-auto text-center">
        <h1 className="text-xl font-bold text-[#2c5282] mb-4">Buscar Sub Entidades</h1>
        <div className="flex justify-center">
          <Input className="mr-2" placeholder="Search" type="text" onChange={handleSearchChange} />
          <Button variant="outline">Buscar</Button>
        </div>
        <div className="overflow-x-auto mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Entidad empresa</TableHead>
                <TableHead className="w-[200px]">Nombre de Subentidad</TableHead>
                <TableHead className="w-[200px]">Descripcion de Subentidad</TableHead>
                <TableHead className="w-[150px]">Fecha Registro</TableHead>
                <TableHead className="w-[150px]">Última Modificación</TableHead>
                <TableHead className="w-[100px]">Seleccionar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrupos.map((grupo, index) => (
                <TableRow key={index}>
                  <TableCell>{grupo.entidad_empresa.nombre}</TableCell>
                  <TableCell>{grupo.nombre}</TableCell>
                  <TableCell>{grupo.descripcion}</TableCell>
                  <TableCell>{grupo.fecha_creado}</TableCell>
                  <TableCell>{grupo.fecha_actualizado}</TableCell>
                  <TableCell><input
                  type="checkbox"
                  checked={selectedGrupoId === grupo.id_sub_entidad}
                  onChange={() => handleCheckboxChange(grupo.id_sub_entidad)}
                  className="accent-blue-500 h-5 w-5"
                /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between mt-4">
      <Button
          className={`bg-blue-500 text-white ${!selectedGrupoId ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!selectedGrupoId}
          onClick={() => router.push(`/dashboard/entidades/entidadempresa/subentidades/${selectedGrupoId}`)}
        >
          Modificar tipo
        </Button>
        
        <Button
  className={`bg-red-500 text-white ${!selectedGrupoId ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={!selectedGrupoId}
  onClick={handleDeleteGrupo}
>
  Eliminar tipo
</Button>


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