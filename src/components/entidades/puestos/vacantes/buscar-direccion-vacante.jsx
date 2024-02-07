'use client'
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Volver from "@/components/ui/volver";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";


export default function BuscarDireccionVacante() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [direcciones, setDirecciones] = useState([]);
  const [selectedGrupoId, setSelectedGrupoId] = useState(null);
  const [toaggle, setToaggle] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    const fetchDirecciones = async () => {
      const { data, error } = await supabase
        .from('direcciones_web')
        .select(`*, 
          vacantes:id_vacante(id, nombre, id_direcciones, id_departamentos, id_puestos)
        `)
        .single();
  
      if (error) {
        console.log('Error al traer las direcciones web', error);
      } else {
        const direccionData = data;
  
        // Obtener nombre de puesto
        const puestoData = await supabase
          .from('puestos')
          .select('nombre')
          .eq('id_puestos', direccionData.vacantes.id_puestos)
          .single();
  
        // Obtener nombre de dirección
        const direccionNombreData = await supabase
          .from('direcciones')
          .select('nombre')
          .eq('id_direcciones', direccionData.vacantes.id_direcciones)
          .single();
  
        // Obtener nombre de departamento
        const departamentoData = await supabase
          .from('departamentos')
          .select('nombre')
          .eq('id_departamentos', direccionData.vacantes.id_departamentos)
          .single();

        // Agregar los nombres a los datos
        direccionData.vacantes.nombre_puesto = puestoData.data.nombre;
        direccionData.vacantes.nombre_direccion = direccionNombreData.data.nombre;
        direccionData.vacantes.nombre_departamento = departamentoData.data.nombre;
  
        setDirecciones(direccionData);

      }
    };
    setLoading(false);
    fetchDirecciones();
  }, [toaggle]);
  

const handleCheckboxChange = (userId) => {
  setSelectedGrupoId(selectedGrupoId === userId ? null : userId); // Toggle selection
};

const handleDelete = async () => {
  console.log('selectedGrupoId', selectedGrupoId);
  if (selectedGrupoId) {
    const { data } = await supabase
      .from('direcciones_web')
      .delete()
      .eq('id', selectedGrupoId);

    if (data) {
      console.log('Dirección web eliminada');
      setToaggle(!toaggle);
    }

  }

  }



const linkUrl = `http://localhost:3000/vacantes/registro/${direcciones.id}`;


if (loading) return <p>Cargando...</p>;



    return (
      <div className="bg-white p-4 rounded-md shadow-md m-auto text-center">
      <h1 className="text-xl font-bold text-center  mb-4">
     Buscar direcciones web
      </h1>
      <div className="grid grid-cols-4 gap-4 mb-4">
        </div>
      <div className="overflow-x-auto mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Area - Dirección</TableHead>
              <TableHead className="w-[200px]">Departamento</TableHead>
              <TableHead className="w-[100px]">Puesto</TableHead>
              <TableHead className="w-[200px]">Vacante</TableHead>
              <TableHead className="w-[150px]">Link de acceso</TableHead>
              <TableHead className="w-[50px]">Seleccion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{direcciones.vacantes?.nombre_direccion}</TableCell>
              <TableCell>{direcciones.vacantes?.nombre_departamento}</TableCell>
              <TableCell>{direcciones.vacantes?.nombre_puesto}</TableCell>
              <TableCell>{direcciones.vacantes?.nombre}</TableCell>
              <TableCell>
               { direcciones.id && <a href={linkUrl} target="_blank" className="text-blue-600 hover:underline">Link</a>}
              </TableCell>
              <TableCell>
               { direcciones.id && <input
                  type="checkbox"
                  checked={selectedGrupoId === direcciones.id}
                  onChange={() => handleCheckboxChange(direcciones.id)}
                />}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-around items-center mt-4">

        <Button 
        onClick={() =>
          router.push(`http://localhost:3000/dashboard/entidades/puestos/vacantes/buscardireccion/${selectedGrupoId}`)
        }
        disabled={!selectedGrupoId} >Modificar</Button>
        <Volver />
        <Button disabled={!selectedGrupoId} onClick={handleDelete} >Eliminar</Button>
      
      </div>
    </div>
    );
}
