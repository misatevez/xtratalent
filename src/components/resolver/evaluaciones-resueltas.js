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
import Volver from "../ui/volver";
import useUsuario from "@/lib/useUsuario";

export default function EvaluacionesResueltas() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const {id_usuario} = useUsuario()
  
  
  useEffect(() => {
    const fetchEvaluaciones = async () => {
      if (!id_usuario) return;
  
      try {
        const ahora = new Date();
  
        const { data: evaluationsData } = await supabase
          .from("usuarios_evaluaciones")
          .select(`
            *,
            evaluaciones: id_evaluacion (
              nombre,
              activa,
              duracion
            )
          `)
          .eq("usuarios_id", id_usuario)
          // Filtra las evaluaciones entregadas o con fecha final pasada
          .or(`entrega_evaluacion.not.is.null,final_evaluacion.lte.${ahora.toISOString()}`)
  
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
  
  
  

  const iniciarEvaluacion = async (evaluacionId, duracion) => {
    try {
      // Verificar si ya existe un registro de inicio_evaluacion
      const { data: evaluacionExistente, error } = await supabase
        .from('usuarios_evaluaciones')
        .select('inicio_evaluacion')
        .match({ id_evaluacion: evaluacionId, usuarios_id: id_usuario })
        .single();
  
      if (error) {
        console.error('Error al verificar la evaluación existente:', error);
        return;
      }
  
      // Si inicio_evaluacion ya está registrado, no hacer nada
      if (evaluacionExistente && evaluacionExistente.inicio_evaluacion) {
          // Redirige al usuario a la página de la evaluación
    router.push(`/dashboard/resolver/evaluaciones-disponibles/${evaluacionId}`);
        return;
      }
  
      // Si no, calcular finEvaluacion y actualizar la base de datos
      const inicio = new Date(); 
      const finEvaluacion = new Date(inicio); 
      finEvaluacion.setMinutes(finEvaluacion.getMinutes() + duracion);
  
      await supabase
        .from('usuarios_evaluaciones')
        .update({ inicio_evaluacion: inicio, final_evaluacion: finEvaluacion })
        .match({ id_evaluacion: evaluacionId, usuarios_id: id_usuario });
  
  
    } catch (err) {
      console.error('Error al iniciar la evaluación:', err);
    }
  
    // Redirige al usuario a la página de la evaluación
    router.push(`/dashboard/resolver/evaluaciones-disponibles/${evaluacionId}`);
  };
  
  

  if (loading) {
    return <div>Cargando...</div>;
  }

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
                {evaluaciones?.map((evaluacion, index) => (
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
                      variant="link"
                      >
            Ver reporte
          </Button>
                    </TableCell>
                  </TableRow>
                ))}
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
