'use client'
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import supabase from "@/lib/supabaseClient"
import { Notificacion } from "../notification";
import Volver from "../ui/volver";
export default function AsignarPerfil({id_perfil}) {

  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });
    const [usuarios, setUsuarios] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [loading, setLoading] = useState(true);

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


      const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
      }

      const filteredUsuarios = usuarios.filter(usuario =>
        usuario.primer_nombre?.toLowerCase().includes(searchTerm) ||
        usuario.apellido_paterno?.toLowerCase().includes(searchTerm) ||
        usuario.correo_electronico?.toLowerCase().includes(searchTerm)
        // Añadir mas campos si quieremos que se pueda buscar por mas campos
      );

      const handleAsignarPerfil = async (id_usuario) => {
        try {
          // Primero, intenta obtener un registro existente para el usuario
          const { data: existingData, error: selectError } = await supabase
            .from('perfiles_usuario')
            .select('*')
            .eq('id_usuario', id_usuario)
            .single(); // Asumiendo que cada usuario solo puede tener un perfil a la vez
      
          if (selectError && selectError.message !== "JSON object requested, single row, multiple (or no) rows returned") {
            throw selectError; // Lanza cualquier error que no sea el de múltiples o ningún resultado
          }
      
          // Decide si actualizar o insertar
          if (existingData) {
            // Actualizar si el registro existe
            const { error: updateError } = await supabase
              .from('perfiles_usuario')
              .update({ id_perfil: id_perfil })
              .eq('id_usuario', id_usuario);
      
            if (updateError) throw updateError;
      
            setNotification({
              visible: true,
              titulo: "Éxito",
              mensaje: "Perfil actualizado correctamente"
            });
          } else {
            // Insertar si el registro no existe
            const { error: insertError } = await supabase
              .from('perfiles_usuario')
              .insert([
                { id_perfil: id_perfil, id_usuario: id_usuario }
              ]);
      
            if (insertError) throw insertError;
      
            setNotification({
              visible: true,
              titulo: "Éxito",
              mensaje: "Perfil asignado correctamente"
            });
          }
        } catch (error) {
          console.error('Error al asignar o actualizar el perfil:', error);
          setNotification({
            visible: true,
            titulo: "Error",
            mensaje: "Vuelva a intentar más tarde: " + error.message
          });
        }
      };
      
      

      const handleCloseNotification = () => {
        setNotification((prev) => ({ ...prev, visible: false }));
      };


      if(loading) {
        return <div>Loading...</div>
      }

    return (
      <>
        <div className="p-4 mx-auto w-full max-w-6xl mt-4">
        <div className="rounded-lg shadow-lg">
          <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
            <h1 className="text-2xl font-bold mb-2">Asignar perfil a usuario</h1>
    
          <div className="flex w-full max-w-full items-center space-x-2 mb-10">
            <Input placeholder="Buscar" type="text" onChange={handleSearchChange} />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Nombre y apellido</TableHead>
                <TableHead className="w-[200px]">Nombre Perfil</TableHead>
                <TableHead className="w-[250px]">Email</TableHead>
                <TableHead className="w-[100px]">Accion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsuarios.map((usuario, index) => (
                <TableRow key={index}>
                  <TableCell>
      {usuario.primer_nombre || usuario.apellido_paterno ? `${usuario.primer_nombre || ""} ${usuario.apellido_paterno || ""}`.trim() : "Sin asignar"}
    </TableCell>
                  <TableCell>{usuario.tipo_usuario}</TableCell>
                  <TableCell>{usuario.correo_electronico}</TableCell>
                  <TableCell>
                    <Button
                      className="mr-2 p-2"
                      size="small"
                      onClick={() => handleAsignarPerfil(usuario.usuario_id)}
                    >
                      Asignar
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

