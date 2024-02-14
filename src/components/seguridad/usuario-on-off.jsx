"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import Loading from "../loading";
import { formatearFecha } from "@/lib/fechaService";
import Volver from "../ui/volver";
import { useRouter } from "next/navigation";

export default function OnOff() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedBanned, setSelectedBanned] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggle, setToggle] = useState(false);


  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('usuarios')
        .select("user_id, correo_electronico, fecha_creado, banned")
        .order('fecha_creado', { ascending: false });

      if (error) console.log(error);
      else {
        setUsuarios(data);
      }
    }
    fetchData();
    setLoading(false);
  }, [toggle]);

  const handleCheckboxChange = (userId, banned) => {
    setSelectedUserId(selectedUserId === userId ? null : userId); // Toggle selection
    setSelectedBanned(banned);
    
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.correo_electronico?.toLowerCase().includes(searchTerm) 
    
  );

 const handleCambiar = async (user_id, estado) => {

  const { data, error} = await supabase
  .from('usuarios')
  .update( {
    banned: !estado
  })
  .eq('user_id', user_id)

  if (error) {
    console.log(error);
  }
  else {
    setLoading(true);
    setToggle(!toggle);
  }

}

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-white p-4 m-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Activar / Desactivar Usuarios</h1>
      </div>
      <div className="flex w-full max-w-full items-center space-x-2">
      <Input placeholder="Buscar" type="text" onChange={handleSearchChange} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Email</TableHead>
            <TableHead className="w-[200px]">Estado</TableHead>
            <TableHead className="w-[150px]">Fecha Registro</TableHead>
            <TableHead className="w-[100px]">Seleccionar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsuarios.map((usuario) => (
            <TableRow key={usuario.user_id}>
              <TableCell>{usuario.correo_electronico}</TableCell>
              <TableCell>{usuario.banned ? 'Desactivado' : 'Activo'  }</TableCell>
              <TableCell>{formatearFecha(usuario.fecha_creado)}</TableCell>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedUserId === usuario.user_id}
                  onChange={() => handleCheckboxChange(usuario.user_id, usuario.banned)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 p-4">
        <div className="flex justify-around mt-4">
          <Volver />
          <Button
          disabled={!selectedUserId}
           onClick={() => handleCambiar(selectedUserId, selectedBanned)}
          >
            Activar / Desactivar
          </Button>
        </div>
      </div>
    </div>
  );
}
