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
import { useRouter } from "next/navigation";
import Volver from "../ui/volver";
import usePermisosSeguridad from "@/lib/usePermisosSeguridad";



export default function ListaPerfilesUsuario() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [perfilUsuario, setPerfilUsuario] = useState([]);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const permisos = usePermisosSeguridad ();

    // Estado inicial para el formulario
    const [formState, setFormState] = useState({
      nombre: '',
      descripcion: '',
    });

    useEffect(() => {
      async function fetchData() {
        const { data, error } = await supabase
          .from('perfil_tipo')
          .select(`
            *
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
    }, [triggerEffect]);

   const  handleDelete = async (id) => {
    console.log(id);
      try {
        const { data, error } = await supabase
          .from('perfil_tipo')
          .delete()
          .match({ id_perfil: id })
        if (error) {
          throw error
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        setTriggerEffect(prev => !prev);
        setLoading(false)
      }
    }

    if(loading) return (<div>Cargando...</div>);


    return (
      <div className="p-4 mx-auto w-full max-w-6xl mt-4">
      <div className="rounded-lg shadow-lg">
        <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Perfiles de usuario</h1>
          <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Nombre</TableHead>
            <TableHead className="w-[200px]">Descripcion</TableHead>
            <TableHead className="w-[200px]">Accion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {perfilUsuario.map((usuario, index) => (
            <TableRow key={index}>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.descripcion}</TableCell>
              <TableCell>
                <Button
                disabled={!permisos.asignarPerfilUsuario}
                  className="mr-2 p-2"
                  size="small"
                 onClick={() => router.push(`/dashboard/seguridad/asignarperfil/${usuario.id_perfil}`)}
                >
                  Asignar
                </Button>
                <Button 
                disabled={!permisos.modificarPerfilUsuario}
                 onClick={() => router.push(`/dashboard/seguridad/buscarperfil/${usuario.id_perfil}`)}
                  className="mr-2 p-2"
                  size="small">
                  Editar
                </Button>
                <Button
                disabled={!permisos.borrarPerfilUsuario}
                onClick={() => handleDelete(usuario.id_perfil)}
                className="mr-2 p-2"
                  size="small">
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center gap-2 mt-4">
            <Volver />
          </div>
        </div>
      </div>
    </div>
    );
}

