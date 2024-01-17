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

  export default function EvaluacionesDisponibles() {
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const fetchEvaluaciones = async () => {
        try {
          const { data: session } = await supabase.auth.getSession();

          const userEmail = session.session.user.email;

          console.log("Este es el email", userEmail);

          const { data: userData } = await supabase
            .from("usuarios")
            .select("usuario_id") // Solo seleccionamos el campo necesario
            .eq("correo_electronico", userEmail)
            .single();

          console.log("Este es el usuario", userData.usuario_id);
          setUsuario(userData.usuario_id);

          const { data: evaluationsData } = await supabase
            .from("usuarios_evaluaciones")
            .select(
              `
                          *,
                          evaluaciones: id_evaluacion (
                              nombre,
                              activa,
                              duracion
                          )
                      `
            )
            .eq("usuarios_id", userData.usuario_id);

          console.log("Estas son las evaluaciones", evaluationsData);

          setEvaluaciones(evaluationsData);
        } catch (err) {
          console.error("Error:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEvaluaciones();
    }, []);

    const iniciarEvaluacion = async (evaluacionId) => {
      // Registra el momento de inicio en la base de datos
      // Puedes usar new Date() para obtener la fecha y hora actual
      const inicio = new Date();
  
      await supabase
      .from('usuarios_evaluaciones')
      .update({ inicio_evaluacion: inicio })
      .match({ id_evaluacion: evaluacionId, usuarios_id: usuario });
  
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
                Evaluaciones disponibles
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
                  {evaluaciones.map((evaluacion, index) => (
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
                        onClick={() => iniciarEvaluacion(evaluacion.id_evaluacion)}>
              Resolver
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
