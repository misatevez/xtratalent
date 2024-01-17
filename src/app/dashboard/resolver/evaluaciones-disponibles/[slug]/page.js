'use client'
import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import Volver from "@/components/ui/volver";
  

export default function Page({params}) {

    const router = useRouter();

    const id_evaluacion = params.slug;
    const [temas, setTemas] = useState([]);

    //obtener temas

    useEffect(() => {
        const obtenerTemas = async () => {
            try {
                const { data: temasData } = await supabase
                    .from('temas')
                    .select(`
                        *
                    `,
                    'evaluaciones: id_evaluacion (nombre)')
                    .eq('id_evaluacion', id_evaluacion);

                setTemas(temasData);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        obtenerTemas();

    }   , []);

    return (
        <>
        <div className="p-4 mx-auto w-full max-w-6xl mt-4">
          <div className="rounded-lg shadow-lg">
            <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
              <h1 className="text-2xl font-bold mb-2">
                Temas disponibles para la evaluacion
              </h1>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Nombre</TableHead>
                    <TableHead className="w-[200px]">Descripción</TableHead>
                    <TableHead className="w-[150px]">Nivel</TableHead>
                    <TableHead className="w-[150px]">Clase</TableHead>
                    <TableHead className="w-[100px]">Accion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {temas.map((tema, index) => (
                    <TableRow key={index}>
                      <TableCell>{tema.nombre}</TableCell>
                      <TableCell>
                        {tema.descripcion}
                      </TableCell>
                      <TableCell>
                        {tema.nivel}
                      </TableCell>
                      <TableCell>
                        {tema.clase}
                      </TableCell>
                      
                      <TableCell>
                        {" "}
                        <Button
                          variant="link"
                          onClick={() =>
                            router.push(
                              `/dashboard/resolver/evaluaciones-disponibles/${id_evaluacion}/${tema.id_tema}`
                            )
                          }
                        >
                          Resolver
                        </Button>

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-around mt-4">
                <Button>Entregar evaluacion</Button>
              <Volver/>
              </div>
            </div>
          </div>
        </div>
  
  
      </>
    );
}
