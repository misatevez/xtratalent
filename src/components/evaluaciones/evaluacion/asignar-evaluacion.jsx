'use client'
import { useEffect, useState } from "react"
import supabase from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from 'next/navigation'
import { Notificacion } from "@/components/notification"



export default function AsignarEvaluacion({id_evaluacion}) {
  const router = useRouter()
  const [usuarios, setUsuarios] = useState([])
  const [evaluacion, setEvaluacion] = useState([])
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

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('evaluaciones')
        .select('*')
        .eq('id_evaluacion', id_evaluacion).single();
      if (error) console.log(error)
      else {
    console.log('Evaluacion', data);
    setEvaluacion(data)
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


  const handleSubmit = async (id_usuario, id_evaluacion) => {
    // Insertar en Supabase
    const { data, error } = await supabase.from('usuarios_evaluaciones').insert([
      { usuarios_id: id_usuario, id_evaluacion: id_evaluacion }
    ]);

    if (error) {
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Vuelva a intentar mas tarde: " + error.message // Ajusta según necesites
      });
    } else {
      setNotification({
        visible: true,
        titulo: "Éxito",
        mensaje: "Se ha asignado su evaluacion" // Ajusta según necesites
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.primer_nombre?.toLowerCase().includes(searchTerm) ||
    usuario.apellido_paterno?.toLowerCase().includes(searchTerm) ||
    usuario.correo_electronico?.toLowerCase().includes(searchTerm)
    // Añadir mas campos si quieremos que se pueda buscar por mas campos
  );

  return (
    <>
    <div className="bg-white p-4 m-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Asignar evaluacion: {evaluacion.nombre} </h1>
      </div>
      <div className="flex w-full max-w-full items-center space-x-2 mb-10">
        <Input placeholder="Search" type="text" onChange={handleSearchChange} />
        <Button type="submit">Buscar</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Nombre</TableHead>
            <TableHead className="w-[200px]">Perfil</TableHead>
            <TableHead className="w-[250px]">Email</TableHead>
            <TableHead className="w-[100px]">Seleccionar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsuarios.map((usuario, index) => (
            <TableRow key={index}>
              <TableCell>{usuario.primer_nombre} {usuario.apellido_paterno}</TableCell>
              <TableCell>{usuario.tipo_usuario}</TableCell>
              <TableCell>{usuario.correo_electronico}</TableCell>
              <TableCell><input
                  type="checkbox"
                  checked={selectedUserId === usuario.usuario_id}
                  onChange={() => handleCheckboxChange(usuario.usuario_id)}
                  className="accent-blue-500 h-5 w-5"
                /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4">
      <Button
          className={`bg-blue-500 text-white ${!selectedUserId ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!selectedUserId}
          onClick={() => handleSubmit(selectedUserId, id_evaluacion)}
        >
          Asignar
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
