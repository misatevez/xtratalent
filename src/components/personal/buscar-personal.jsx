'use client'
import { useEffect, useState } from "react"
import supabase from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from 'next/navigation'

export default function BuscarPersonal() {
  const router = useRouter()
  const [usuarios, setUsuarios] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUserId, setSelectedUserId] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
      if (error) console.log(error)
      else setUsuarios(data);
    }
    fetchData()
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const handleCheckboxChange = (userId) => {
    setSelectedUserId(selectedUserId === userId ? null : userId); // Toggle selection
  }

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.primer_nombre.toLowerCase().includes(searchTerm) ||
    usuario.apellido_paterno.toLowerCase().includes(searchTerm) ||
    usuario.correo_electronico.toLowerCase().includes(searchTerm)
    // Añadir mas campos si quieremos que se pueda buscar por mas campos
  );

  return (
    <div className="bg-white p-4 m-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Buscar usuario</h1>
      </div>
      <div className="flex w-full max-w-full items-center space-x-2 mb-10">
        <Input placeholder="Search" type="text" onChange={handleSearchChange} />
        <Button type="submit">Buscar</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Código</TableHead>
            <TableHead className="w-[150px]">Nombre</TableHead>
            <TableHead className="w-[200px]">Nombre Perfil</TableHead>
            <TableHead className="w-[250px]">Email</TableHead>
            <TableHead className="w-[150px]">Fecha Registro</TableHead>
            <TableHead className="w-[100px]">Seleccionar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsuarios.map((usuario, index) => (
            <TableRow key={index}>
              <TableCell>{usuario.usuario_id}</TableCell>
              <TableCell>{usuario.primer_nombre} {usuario.apellido_paterno}</TableCell>
              <TableCell>{usuario.tipo_usuario}</TableCell>
              <TableCell>{usuario.correo_electronico}</TableCell>
              <TableCell>{usuario.fecha_creado}</TableCell>
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
          onClick={() => router.push(`/dashboard/personal/${selectedUserId}`)}
        >
          Modificar Perfil
        </Button>
      </div>
    </div>
  );
}
