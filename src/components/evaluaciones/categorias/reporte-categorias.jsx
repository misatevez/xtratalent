'use client'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function ReporteCategorias() {

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const getCategorias = async () => {
      const { data, error } = await supabase
        .from("categorias")
        .select("*")
      setCategorias(data);
    };

    getCategorias();
  } , []);

  function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // +1 porque enero es 0
    const año = fecha.getFullYear();
  
    return `${dia}/${mes}/${año}`;
  }

  return (
    <div className="p-4 mx-auto w-full max-w-2xl mt-4">
      <div className="rounded-lg shadow-lg">
        <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-center">
          <h1 className="text-2xl font-bold text-center mt-4  text-gray-800">
            Catalogo Familia de Evaluaciones 
          </h1>
          <div className="grid grid-cols-1 gap-4 mt-6">
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    
                    <TableHead className="w-[300px]">
                      Nombre Familia 
                    </TableHead>
                    <TableHead className="w-[200px]">Fecha creación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categorias?.map((categoria, index) => (
                    <TableRow key={index}>
                      <TableCell>{categoria.nombre}</TableCell>
                      <TableCell>{formatearFecha(categoria.fecha_creado)}</TableCell>
                    </TableRow>
                  ))
                  }
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex justify-around mt-4">
          <Button>Generar PDF</Button>
        </div>
        </div>
      </div>
    </div>
  );
}
