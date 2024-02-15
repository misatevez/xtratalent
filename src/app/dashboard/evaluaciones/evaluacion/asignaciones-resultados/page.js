'use client'
import { useEffect, useState } from "react"
import supabase from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from 'next/navigation'
import { Notificacion } from "@/components/notification"
import Volver from "@/components/ui/volver"
import usePermisosEvaluaciones from "@/lib/usePermisosEvaluaciones"


export default function BuscarPersonal() {
  const router = useRouter()
  const permisos = usePermisosEvaluaciones();
  const [usuarios, setUsuarios] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
      if (error) console.log(error)
      else {
    setUsuarios(data)
  setLoading(false);
  };
    }
    fetchData()
  }, [])

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const handleCheckboxChange = (userId) => {
    setSelectedUserId(selectedUserId === userId ? null : userId); // Toggle selection
  }

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;  // Verifica si se ha seleccionado un usuario
  
    setLoading(true);  // Opcional: Manejar el estado de carga
  
    const { error } = await supabase
      .from('usuarios')
      .delete()
      .eq('usuario_id', selectedUserId);
  
    if (error) {
      console.error("Error deleting user: ", error);
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Vuelva a intentar mas tarde: " + error.message // Ajusta según necesites
      });
    } else {
      // Opcional: Actualizar el estado para reflejar que el usuario ha sido eliminado
      setUsuarios(prevUsuarios => prevUsuarios.filter(user => user.usuario_id !== selectedUserId));
      setSelectedUserId(null);  // Resetear el usuario seleccionado
      setNotification({
        visible: true,
        titulo: "Éxito",
        mensaje: "Se ha eliminado el usuario" // Ajusta según necesites
      });
    }
  
    setLoading(false);  // Opcional: Restablecer el estado de carga
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }


  function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año}`;
  }

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.primer_nombre?.toLowerCase().includes(searchTerm) ||
    usuario.apellido_paterno?.toLowerCase().includes(searchTerm) ||
    usuario.correo_electronico?.toLowerCase().includes(searchTerm)
    // Añadir mas campos si quieremos que se pueda buscar por mas campos
  );

  return (
    <>
    <div className="p-4 mx-auto w-full max-w-6xl mt-4">
    <div className="rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
        <h1 className="text-2xl font-bold mb-2">Asignaciones y resultados de usuarios</h1>

      <div className="flex w-full max-w-full items-center space-x-2 mb-10 mt-4">
        <Input placeholder="Buscar" type="text" onChange={handleSearchChange} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Nombre y apellido</TableHead>
            <TableHead className="w-[250px]">Email</TableHead>
            <TableHead className="w-[100px]">Seleccionar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsuarios.map((usuario, index) => (
            <TableRow key={index}>
              <TableCell>
  {usuario.primer_nombre || usuario.apellido_paterno ? `${usuario.primer_nombre || ""} ${usuario.apellido_paterno || ""}`.trim() : "Sin asignar"}
</TableCell>
              <TableCell>{usuario.correo_electronico}</TableCell>
              <TableCell><input
                  type="checkbox"
                  checked={selectedUserId === usuario.usuario_id}
                  onChange={() => handleCheckboxChange(usuario.usuario_id)}
                  className="accent-black h-5 w-5"
                /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4">
      <Button
          className={`bg-black text-white ${!selectedUserId ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!selectedUserId || !permisos.evaluaciones}
          onClick={() => router.push(`/dashboard/evaluaciones/evaluacion/asignaciones-resultados/${selectedUserId}`)}
        >
          Ver asignaciones y resultados
        </Button>
<Volver />
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
