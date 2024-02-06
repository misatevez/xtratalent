"use client";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Volver from "@/components/ui/volver";

export default function BuscarVacante() {
  const router = useRouter();
  const [relauch, setRelauch] = useState(false);
  const [vacante, setVacante] = useState([]);
  const [selectedGrupoId, setSelectedGrupoId] = useState(null);

  useEffect(() => {
    const fetchVacante = async () => {
      const { data, error } = await supabase.from("vacantes").select(`*,
    departamentos:departamentos (id_departamentos, nombre),
    direcciones:direcciones (id_direcciones, nombre),
    renglon_presupuestario:renglon_presupuestario (id_renglon_presupuestario, numero),
    puestos:puestos (id_puestos, nombre),
    entidad_empresa:entidad_empresa (id_entidad_empresa, nombre),
    sub_entidad:sub_entidad (id_sub_entidad, nombre)
    `);

      if (error) console.log("Error al obtener las vacantes", error);
      else setVacante(data);
      console.log(data);
    };

    fetchVacante();
  }, [relauch]);

  const handleCheckboxChange = (userId) => {
    setSelectedGrupoId(selectedGrupoId === userId ? null : userId); // Toggle selection
  };


const handleDelete = async (id) => {

  const { data, error } = await supabase
    .from("vacantes")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("Error deleting vacante", error);
  } else {
    console.log("Deleted vacante", data);
    setRelauch(!relauch);
    setSelectedGrupoId(null);
  }
}



  return (
    
    <div className="bg-white p-4 rounded-md shadow-md m-auto w-full max-w-7xl text-center">
      <h1 className="text-xl font-bold text-center mb-4">Buscar Vacante</h1>

      <div className="grid grid-cols-3 gap-4 mb-4"></div>

      <div className="flex justify-center">
        <Input className="mr-2" placeholder="Buscar.." type="text" />
      </div>
      <div className="overflow-x-auto mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Entidad empresa</TableHead>
              <TableHead className="w-[200px]">Subentidad</TableHead>
              <TableHead className="w-[200px]">Area - Dirección</TableHead>
              <TableHead className="w-[200px]">Departamento</TableHead>
              <TableHead className="w-[100px]">Puesto</TableHead>
              <TableHead className="w-[50px]">Renglón número</TableHead>
              <TableHead className="w-[50px]">Plazas</TableHead>
              <TableHead className="w-[100px]">Estatus Vacante</TableHead>
              <TableHead className="w-[100px]">Vigencia inicio</TableHead>
              <TableHead className="w-[100px]">Vigencia final</TableHead>
              <TableHead className="w-[50px]">Seleccionar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vacante.map((vacante) => {
              return (
                <TableRow key={vacante.id}>
                  <TableCell>{vacante.entidad_empresa.nombre}</TableCell>
                  <TableCell>{vacante.sub_entidad.nombre}</TableCell>
                  <TableCell>{vacante.direcciones.nombre}</TableCell>
                  <TableCell>{vacante.departamentos.nombre}</TableCell>
                  <TableCell>{vacante.puestos.nombre}</TableCell>
                  <TableCell>{vacante.renglon_presupuestario.numero}</TableCell>
                  <TableCell>{vacante.plazas}</TableCell>
                  <TableCell>{vacante.estatus}</TableCell>
                  <TableCell>{vacante.vigencia_inicio}</TableCell>
                  <TableCell>{vacante.vigencia_final}</TableCell>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedGrupoId === vacante.id}
                      onChange={() => handleCheckboxChange(vacante.id)}
                      className="accent-blue-500 h-5 w-5"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-around items-center mt-4">
        <Button
          className={`bg-blue-500 text-white ${
            !selectedGrupoId ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!selectedGrupoId}
          onClick={() =>
            router.push(`/dashboard/entidades/puestos/vacantes/buscarvacante/${selectedGrupoId}`)
          }
        >
          Modificar
        </Button>

        <Button
          className={`bg-black text-white ${
            !selectedGrupoId ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!selectedGrupoId}
          onClick={() =>
            router.push(`/dashboard/entidades/puestos/vacantes/nuevadireccion/${selectedGrupoId}`)
          }
        >
          Crear direccion web
        </Button>

        <Button
          className={`bg-red-500 text-white ${
            !selectedGrupoId ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!selectedGrupoId}
          onClick={() => handleDelete(selectedGrupoId)}
        >
          Eliminar
        </Button>
        <Volver />
      </div>
    </div>
  );
}
