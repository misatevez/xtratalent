"use client";
import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatearFecha } from "@/lib/fechaService";
import Volver from "@/components/ui/volver";
import { useRouter } from "next/navigation";
import { Notificacion } from "@/components/notification";

export default function Page({ params }) {
  const usuario_id = params.slug;
  const router = useRouter();
  const [evaluacionesDisponibles, setEvaluacionesDisponibles] = useState([]);
  const [EvaluacionesResueltas, setEvaluacionesResueltas] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserIdReporte, setSelectedUserIdReporte] = useState(null);
  const [error, setError] = useState(null);

  const [notification, setNotification] = useState({
    titulo: "",
    mensaje: "",
    visible: false,
  });

  const [toggleEffect, setToggleEffect] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvaluaciones = async (filterCondition, selectClause) => {
      if (!usuario_id) return;

      try {
        const ahora = new Date().toISOString();

        const { data: evaluationsData } = await supabase
          .from("usuarios_evaluaciones")
          .select(selectClause)
          .eq("usuarios_id", usuario_id)
          .or(filterCondition.replace("ahora", ahora));

        return evaluationsData;
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      }
    };

    const initFetch = async () => {
      setLoading(true);

      const evaluacionesDisponiblesFilter = `entrega_evaluacion.is.null,final_evaluacion.gt.ahora,final_evaluacion.is.null`;
      const evaluacionesDisponiblesSelect = `
            *,
            evaluaciones: id_evaluacion (
              nombre,
              activa,
              duracion
            )
          `;
      const evaluacionesResueltasFilter = `entrega_evaluacion.not.is.null,final_evaluacion.lte.ahora`;
      const evaluacionesResueltasSelect = `
            *,
            evaluaciones: id_evaluacion (
              nombre,
              activa,
              duracion,
              calificacion
            )
          `;

      const disponibles = await fetchEvaluaciones(
        evaluacionesDisponiblesFilter,
        evaluacionesDisponiblesSelect
      );
      const resueltas = await fetchEvaluaciones(
        evaluacionesResueltasFilter,
        evaluacionesResueltasSelect
      );

      if (disponibles) setEvaluacionesDisponibles(disponibles);
      if (resueltas) setEvaluacionesResueltas(resueltas);

      setLoading(false);
    };

    initFetch();
  }, [usuario_id, toggleEffect]);

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUserId(selectedUserId === userId ? null : userId); // Toggle selection
  };

  const handleCheckboxChangeReporte = (userId) => {
    setSelectedUserIdReporte(selectedUserIdReporte === userId ? null : userId); // Toggle selection
  };

  const handleDelete = async (id) => {
    if (!id) return;

    const { error } = await supabase
      .from("usuarios_evaluaciones")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    } else {
      setNotification({
        titulo: "Evaluacion eliminada",
        mensaje: "La evaluacion fue eliminada con exito",
        visible: true,
      });
      setToggleEffect(!toggleEffect);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <>
      <div>
        <div className="p-4 mx-auto w-full max-w-6xl mt-4">
          <div className="rounded-lg ">
            <div className="bg-white p-6 rounded-lg  m-auto">
              <h1 className="text-2xl font-bold mb-2">
                Evaluaciones asignadas
              </h1>
              {evaluacionesDisponibles && evaluacionesDisponibles.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Nombre</TableHead>
                      <TableHead className="w-[200px]">Estado</TableHead>
                      <TableHead className="w-[250px]">Duracion</TableHead>
                      <TableHead className="w-[100px]">Seleccionar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {evaluacionesDisponibles?.map((evaluacion, index) => (
                      <TableRow key={index}>
                        <TableCell>{evaluacion.evaluaciones.nombre}</TableCell>
                        <TableCell>
                          {evaluacion.evaluaciones.activa
                            ? "Activa"
                            : "Inactiva"}
                        </TableCell>
                        <TableCell>
                          {evaluacion.evaluaciones.duracion} Mins
                        </TableCell>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedUserId === evaluacion.id}
                            onChange={() => handleCheckboxChange(evaluacion.id)}
                            className="accent-black h-5 w-5"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="mt-4">
                  <h2>No hay evaluaciones disponibles.</h2>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 mx-auto w-full max-w-6xl mt-4">
          <div className="rounded-lg ">
            <div className="bg-white p-6 rounded-lg  m-auto">
              <h1 className="text-2xl font-bold mb-2">
                Evaluaciones resueltas
              </h1>
              {EvaluacionesResueltas && EvaluacionesResueltas.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Nombre</TableHead>
                      <TableHead className="w-[200px]">Calificacion</TableHead>
                      <TableHead className="w-[200px]">Resultado</TableHead>
                      <TableHead className="w-[250px]">Fecha</TableHead>
                      <TableHead className="w-[50px]">Seleccionar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {EvaluacionesResueltas?.map((evaluacion, index) => (
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
                            ? "Aprobado"
                            : "Desaprobado"}
                        </TableCell>
                        <TableCell>
                          {evaluacion.entrega_evaluacion
                            ? formatearFecha(evaluacion.entrega_evaluacion)
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedUserIdReporte === evaluacion.id}
                            onChange={() => handleCheckboxChangeReporte(evaluacion.id)}
                            className="accent-black h-5 w-5"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="mt-4">
                  <h2>No hay evaluaciones resueltas disponibles.</h2>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 mx-auto w-full max-w-6xl mt-4">
          <div className="flex justify-around mt-4">
            <Button
              onClick={() =>
                router.push(
                  "/dashboard/evaluaciones/evaluacion/buscarevaluacion"
                )
              }
            >
              Asignar evaluacion nueva
            </Button>
            <Volver />

            {evaluacionesDisponibles && evaluacionesDisponibles.length > 0 ? (
              <Button
                disabled={!selectedUserId}
                onClick={() => handleDelete(selectedUserId)}
              >
                Borrar evaluacion
              </Button>
            ) : (
              "")}

{EvaluacionesResueltas && EvaluacionesResueltas.length > 0 ? (
              <Button
                disabled={!selectedUserIdReporte}
              
              >
                Reporte de evaluacion
              </Button>
            ) : (
              "")}

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
