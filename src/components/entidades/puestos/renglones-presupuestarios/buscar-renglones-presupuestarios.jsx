'use client'
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Volver from "@/components/ui/volver";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { Notificacion } from "@/components/notification"
import { useRouter } from "next/navigation"
export default function BuscarRenglon() {
  const router = useRouter();

  const [renglones, setRenglones] = useState([]);
  const [ selectedRenglon, setSelectedRenglon] = useState(null);
  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRenglones = async () => {
      const { data, error } = await supabase
        .from('renglon_presupuestario')
        .select('*');

      if (error) {
        console.error("Error al obtener los renglones", error);
      } else {
        setRenglones(data);
        setLoading(false);
      }
    }
    fetchRenglones();


  }, []);

  const handleCheckboxChange = (userId) => {
    console.log(userId);
    setSelectedRenglon(selectedRenglon === userId ? null : userId); // Toggle selection
  }
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  const handleDelete = async () => {
    if (!selectedRenglon) return;
    setLoading(true);
    const { error } = await supabase.from('renglon_presupuestario').delete().eq('id_renglon_presupuestario', selectedRenglon);
    if (error) {
      console.error("Error deleting group: ", error);
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Error al eliminar: Tiene informacion pendiente por eliminar"
      });
    } else {
      setRenglones(prevGrupos => prevGrupos.filter(grupo => grupo.id_renglon_presupuestario !== selectedRenglon));
      setSelectedRenglon(null);
      setNotification({
        visible: true,
        titulo: "Éxito",
        mensaje: "Grupo eliminado correctamente"
      });
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

    return (
      <>
      <div className="p-4 mx-auto w-full max-w-6xl mt-4">
      <div className="rounded-lg shadow-lg">
        <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
      <h1 className="text-xl font-bold text-left mb-4">
       TIPOS DE PLAZAS - RENGLONES PRESUPUESTARIOS
      </h1>
      <div className="flex justify-center">
        <Input className="mr-2" placeholder="Inserte el codigo del renglón" type="text" />
      </div>
      <div className="overflow-x-auto mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Número</TableHead>
              <TableHead className="w-[200px]">Tipo</TableHead>
              <TableHead className="w-[200px]">Nombre del Renglón</TableHead>
              <TableHead className="w-[200px]">Descripcion</TableHead>
              <TableHead className="w-[100px]">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renglones.map((renglon) => {

              return (
                <TableRow key={renglon.id_renglon_presupuestario}>
                  <TableCell>{renglon.numero}</TableCell>
                  <TableCell>{renglon.tipo}</TableCell>
                  <TableCell>{renglon.nombre}</TableCell>
                  <TableCell>{renglon.descripcion}</TableCell>
                  <TableCell>
                  <input
                  type="checkbox"
                  checked={selectedRenglon === renglon.id_renglon_presupuestario}
                  onChange={() => handleCheckboxChange(renglon.id_renglon_presupuestario)}
                  className="accent-black h-5 w-5"
                />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-around mt-4">
      <Button
          className={`bg-black text-white ${!selectedRenglon ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!selectedRenglon}
          onClick={() => router.push(`/dashboard/entidades/puestos/renglones-presupuestarios/buscar-renglon/${selectedRenglon}`)}
        >
          Modificar
        </Button>
        
        <Button
  className={`bg-red-500 text-white ${!selectedRenglon ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={!selectedRenglon}
  onClick={handleDelete}
>
  Eliminar
</Button>

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
