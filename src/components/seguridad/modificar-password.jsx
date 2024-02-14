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

export default function ModificarPasswords() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("usuarios")
        .select("user_id, correo_electronico, fecha_creado");
      if (error) console.log(error);
      else {
        setUsuarios(data);
      }
    }
    fetchData();
    setLoading(false);
  }, []);

  const handleCheckboxChange = (userId) => {
    setSelectedUserId(selectedUserId === userId ? null : userId); // Toggle selection
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.correo_electronico?.toLowerCase().includes(searchTerm) 
    
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-white p-4 m-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Modificacion de contraseña</h1>
      </div>
      <div className="flex w-full max-w-full items-center space-x-2">
      <Input placeholder="Buscar" type="text" onChange={handleSearchChange} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Email</TableHead>
            <TableHead className="w-[150px]">Fecha Registro</TableHead>
            <TableHead className="w-[100px]">Seleccionar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsuarios?.map((usuario) => (
            <TableRow key={usuario.user_id}>
              <TableCell>{usuario.correo_electronico}</TableCell>
              <TableCell>{formatearFecha(usuario.fecha_creado)}</TableCell>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedUserId === usuario.user_id}
                  onChange={() => handleCheckboxChange(usuario.user_id)}
                  className="accent-black h-5 w-5"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 p-4">
        <div className="flex justify-between mt-4">
          <Volver />
          <Button
            onClick={() => {
              router.push(`/resetear/${selectedUserId}`);
            }}
          >
            Cambiar
          </Button>
        </div>
      </div>
    </div>
  );
}
