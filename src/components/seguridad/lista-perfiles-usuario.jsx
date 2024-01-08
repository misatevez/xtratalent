'use client'
import { Button } from "@/components/ui/button"
import ListaEntidadesEmpresas from "../entidades/entidadempresa/lista-entidad-empresa";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"



export default function ListaPerfilesUsuario() {

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [perfilUsuario, setPerfilUsuario] = useState([]);
    // Estado inicial para el formulario
    const [formState, setFormState] = useState({
      nombre: '',
      descripcion: '',
      id_entidad_empresa: '',
      tipo_usuario: '',
    });

    const tipos = [
      { valor: "Internal", nombre: "Internal" },
      { valor: "External", nombre: "External" },
    ];

    useEffect(() => {
      async function fetchData() {
        const { data, error } = await supabase
          .from('perfil_usuario')
          .select(`
            *,
            entidad_empresa: id_entidad_empresa (nombre)
          `) // Asumiendo que 'nombre' es la columna en 'entidad_empresa' que quieres obtener
        if (error) {
          console.log('Error fetching profile data:', error);
          setLoading(false);
        } else {
          setPerfilUsuario(data);
          setLoading(false);
        }
      }
      fetchData();
    }, []);
    


    const filteredPerfiles = perfilUsuario.filter(usuario =>
      usuario.nombre.toLowerCase().includes(searchTerm) ||
      usuario.tipo_usuario?.toLowerCase().includes(searchTerm) ||
      usuario.id_entidad_empresa?.toLowerCase().includes(searchTerm)
      // Añadir mas campos si quieremos que se pueda buscar por mas campos
    );

    return (
        <main className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold mb-6 text-center">Perfiles de usuario</h1>
          <div className="grid grid-cols-2 gap-4">
           
          </div>


          <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Nombre</TableHead>
            <TableHead className="w-[200px]">Tipo de usuario</TableHead>
            <TableHead className="w-[300px]">Entidad Empresa</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPerfiles.map((usuario, index) => (
            <TableRow key={index}>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.tipo_usuario}</TableCell>
              <TableCell>{usuario.entidad_empresa.nombre}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          
        </main>
    );
}

