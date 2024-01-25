"use client";
import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useUsuario from "@/lib/useUsuario";
import { formatearFecha } from "@/lib/fechaService";

export default function EvaluacionesResueltas() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id_usuario } = useUsuario();

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      if (!id_usuario) return;

      try {
        const ahora = new Date();

        const { data: evaluationsData } = await supabase
          .from("usuarios_evaluaciones")
          .select(
            `
            *,
            evaluaciones: id_evaluacion (
              nombre,
              activa,
              duracion,
              calificacion
            )
          `
          )
          .eq("usuarios_id", id_usuario)
          // Filtra las evaluaciones entregadas o con fecha final pasada
          .or(
            `entrega_evaluacion.not.is.null,final_evaluacion.lte.${ahora.toISOString()}`
          );

        setEvaluaciones(evaluationsData);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluaciones();
  }, [id_usuario]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="p-4 mx-auto w-full max-w-6xl mt-4">
        <div className="rounded-lg shadow-lg">
          <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
            <h1 className="text-2xl font-bold mb-2">Evaluaciones resueltas</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Nombre</TableHead>
                  <TableHead className="w-[200px]">Calificacion</TableHead>
                  <TableHead className="w-[200px]">Resultado</TableHead>
                  <TableHead className="w-[250px]">Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluaciones?.map((evaluacion, index) => (
                  <TableRow key={index}>
                    <TableCell>{evaluacion.evaluaciones.nombre}</TableCell>
                    <TableCell>
                      {evaluacion.calificacion
                        ? evaluacion.calificacion + "%"
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {evaluacion.calificacion >=
                      evaluacion.evaluaciones.calificacion
                        ? "Aprobaste"
                        : "Desaprobaste"}
                    </TableCell>
                    <TableCell>
                      {evaluacion.entrega_evaluacion
                        ? formatearFecha(evaluacion.entrega_evaluacion)
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
