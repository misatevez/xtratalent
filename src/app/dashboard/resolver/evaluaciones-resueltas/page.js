"use client";
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
import { Button } from "@/components/ui/button";


export default function page() {
    return (
        <>
        <div className="p-4 mx-auto w-full max-w-6xl mt-4">
          <div className="rounded-lg shadow-lg">
            <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
              <h1 className="text-2xl font-bold mb-2">
                Evaluaciones resueltas
              </h1>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Nombre</TableHead>
                    <TableHead className="w-[200px]">Estado</TableHead>
                    <TableHead className="w-[250px]">Duracion</TableHead>
                    <TableHead className="w-[100px]">Accion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* {evaluaciones.map((evaluacion, index) => (
                    <TableRow key={index}>
                      <TableCell>{evaluacion.evaluaciones.nombre}</TableCell>
                      <TableCell>
                        {evaluacion.evaluaciones.activa ? "Activa" : "Inactiva"}
                      </TableCell>
                      <TableCell>
                        {evaluacion.evaluaciones.duracion} Mins
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Button
                          onClick={() =>
                            router.push(
                              `/dashboard/resolver/evaluaciones-disponibles/${evaluacion.id_evaluacion}`
                            )
                          }
                        >
                          Resolver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
              <div className="flex justify-between mt-4">
                  <Volver />
              </div>
            </div>
          </div>
        </div>
  
  
      </>
    );
}

