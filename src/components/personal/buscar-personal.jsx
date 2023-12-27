'use client'

import Link from "next/link"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useEffect, useState } from "react"
import supabase from "@/lib/supabaseClient"

export default function BuscarPersonal() {

  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
      if (error) console.log(error)
      else setUsuarios(data);
    }
    fetchData()
  }
  , [])

    return (
        <div className="bg-white p-4 m-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Buscar usuario</h1>
            </div>
            <div className="flex w-full max-w-full items-center space-x-2">
              <Input placeholder="Search" type="text" />
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
               {/* Iterar sobre cada usuario y crear una fila en la tabla */}
          {usuarios.map((usuario, index) => (
            <TableRow key={index}>
              <TableCell>{usuario.usuario_id}</TableCell>
              <TableCell>{usuario.primer_nombre} {usuario.apellido_paterno}</TableCell> 
              <TableCell>{usuario.tipo_usuario}</TableCell>
              <TableCell>{usuario.correo_electronico}</TableCell>
              <TableCell>{usuario.fecha_creado}</TableCell>
              <TableCell>
                <input className="accent-blue-500 h-5 w-5" type="checkbox" />
              </TableCell>
            </TableRow>
          ))}

              </TableBody>
            </Table>
            <div className="flex justify-between mt-4">
              <Button className="bg-blue-500 text-white">Modificar Perfil</Button>
            </div>
          </div>
    );
}

