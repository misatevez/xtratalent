"use client";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import Volver from "@/components/ui/volver";
import { formatearFecha } from "@/lib/fechaService";
import supabase from "@/lib/supabaseClient";
import { useEffect, useState, useRef } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function page({ params }) {
  const id = params.slug;
  const divRef = useRef(null);

  const [evaluaciones, setEvaluaciones] = useState([]);

  useEffect(() => {
    const fetchEvaluacion = async () => {
      const { data: evaluationsData, error } = await supabase
        .from("usuarios_evaluaciones")
        .select(
          `
                        *,
                        evaluaciones: id_evaluacion (
                        nombre,
                        nivel,
                        calificacion),
                        usuarios: usuarios_id (
                        primer_nombre,
                        segundo_nombre,
                        apellido_paterno,
                        apellido_materno,
                        anos_experiencia,
                        profesion_ocupacion
                        )

                    `
        )
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        return;
      } else {
        console.log(evaluationsData);
        setEvaluaciones(evaluationsData);
      }
    };

    fetchEvaluacion();
  }, [id]);


  const handleGenerarPDF = () => {
    // Asegurándonos de usar divRef.current para acceder al elemento actual del DOM
    const divToScreenshot = divRef.current;
  
    html2canvas(divToScreenshot, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('reporte_mejorado.pdf');
    });
  };
  
  


  return (
    <div className="p-4 mx-auto w-full max-w-2xl mt-4" ref={divRef} >
      <div className="rounded-lg shadow-lg">
        <div className="bg-white p-6 rounded-lg shadow-inner m-auto" >
          <h1 className="text-2xl font-bold mb-2">Reporte:</h1>

          <div className="mb-4">
            <h1 className="text-lg font-bold mb-2">Datos de usuario:</h1>
            <div className="mb-2 text-sm">
              <strong>Nombre:</strong> {evaluaciones?.usuarios?.primer_nombre}{" "}
              {evaluaciones?.usuarios?.segundo_nombre}{" "}
              {evaluaciones?.usuarios?.apellido_paterno}{" "}
              {evaluaciones?.usuarios?.apellido_materno}{" "}
            </div>
            <div className="mb-2 text-sm">
              <strong>Profesión:</strong>{" "}
              {evaluaciones?.usuarios?.profesion_ocupacion}{" "}
            </div>
            { evaluaciones?.usuarios?.anos_experiencia && <div className="mb-2 text-sm">
              <strong>Experiencia:</strong>{" "}
              {evaluaciones?.usuarios?.anos_experiencia}
            </div> }
            <div className="mb-4">
            <h1 className="text-lg font-bold mb-2">Datos de evaluacion:</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Nombre</TableHead>
                  <TableHead className="w-[150px]">Nivel</TableHead>
                  <TableHead className="w-[150px]">Calificacion requerida</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow key={evaluaciones?.id}>
                      <TableCell>{evaluaciones?.evaluaciones?.nombre}</TableCell>
                      <TableCell>{evaluaciones?.evaluaciones?.nivel}</TableCell>
                      <TableCell>{evaluaciones?.evaluaciones?.calificacion}</TableCell>
                    </TableRow>
                </TableBody>
                </Table>
                </div>
                <div className="mb-4">
                <h1 className="text-lg font-bold mb-2">Resultado de calificacion:</h1>
                <div className="mb-2 text-sm">
                  <strong>Resultado:</strong> {evaluaciones?.calificacion >= evaluaciones?.evaluaciones?.calificacion ? "Aprobado" : "Desaprobado"}
                  </div>
                <div className="mb-2 text-sm">
                  <strong>Calificacion:</strong> {evaluaciones?.calificacion}{" "}
                  </div>
                <div className="mb-2 text-sm">
                    <strong>Fecha de realizacion:</strong> { formatearFecha( evaluaciones?.final_evaluacion )}
                    </div>
            </div>
          
          </div>
          <div className="flex justify-between mt-4">
              <Button onClick={handleGenerarPDF}>Generar PDF</Button>
              <Volver />
              </div>
        </div>
      </div>
    </div>
  );
}
