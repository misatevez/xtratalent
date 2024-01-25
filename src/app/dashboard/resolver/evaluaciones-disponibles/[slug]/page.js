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
import useUsuario from "@/lib/useUsuario";
  

export default function Page({params}) {

    const router = useRouter();
    const {id_usuario} = useUsuario();

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

    const handleEntregarEvaluacion = async () => {
      const entrega = new Date();
    
      try {
        // Paso 1: Obtener los id_tema para la id_evaluacion dada
        const { data: temasData, error: errorTemas } = await supabase
          .from('temas')
          .select('id_tema')
          .eq('id_evaluacion', id_evaluacion);
        if (errorTemas) throw errorTemas;
    
        // Extraer los id_tema de los resultados
        const idsTema = temasData.map(tema => tema.id_tema);
    
        // Paso 2: Obtener el total de preguntas usando los id_tema obtenidos
        const { count: totalPreguntas, error: errorPreguntas } = await supabase
          .from('preguntas')
          .select('id_pregunta', { count: 'exact' })
          .in('id_tema', idsTema);
        if (errorPreguntas) throw errorPreguntas;
        console.log('Total de preguntas:', totalPreguntas);
    
        // Paso 3: Obtener los id_respuesta de las respuestas correctas
        const { data: respuestasCorrectasData, error: errorRespuestas } = await supabase
          .from('respuestas')
          .select('id_respuesta')
          .eq('correcta', 'true');
        if (errorRespuestas) throw errorRespuestas;
    
        // Extraer los id_respuesta de los resultados
        const idsRespuestasCorrectas = respuestasCorrectasData.map(respuesta => respuesta.id_respuesta);
    
        // Contar cuántas de estas respuestas correctas pertenecen al usuario y evaluación específicos
        const { count: totalRespuestasCorrectas, error: errorConteoRespuestas } = await supabase
          .from('usuario_evaluacion_respuesta')
          .select('id_respuesta', { count: 'exact' })
          .eq('usuario_id', id_usuario)
          .eq('id_evaluacion', id_evaluacion)
          .in('id_respuesta', idsRespuestasCorrectas);
        if (errorConteoRespuestas) throw errorConteoRespuestas;
        console.log('Respuestas correctas:', totalRespuestasCorrectas);
    
        // Paso 4: Calcular el porcentaje de acierto
        const porcentajeAcierto = (totalRespuestasCorrectas / totalPreguntas) * 100;
        console.log('Porcentaje de acierto:', porcentajeAcierto);
    
        // Paso 5: Actualizar la evaluación con la fecha de entrega y la calificación
        const { error: errorActualizacion } = await supabase
          .from('usuarios_evaluaciones')
          .update({
            entrega_evaluacion: entrega,
            calificacion: porcentajeAcierto
          })
          .match({ id_evaluacion: id_evaluacion, usuarios_id: id_usuario });
    
        if (errorActualizacion) throw errorActualizacion;
        console.log('Actualización de la evaluación realizada con éxito');
    
        // Redirigir al usuario a la página de evaluaciones resueltas
        router.push('/dashboard/resolver/evaluaciones-resueltas');
      } catch (error) {
        console.error('Error en handleEntregarEvaluacion:', error);
      }
    };
    
    
    
    

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
                {Array.isArray(temas) && temas.map((tema, index) => (
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
                <Button onClick={handleEntregarEvaluacion} >Entregar evaluacion</Button>
              <Volver/>
              </div>
            </div>
          </div>
        </div>
  
  
      </>
    );
}
