'use client'
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import supabase from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { Notificacion } from "@/components/notification"

export default function ReporteTemas() {
  const router = useRouter();
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Puedes ajustar esto según tus necesidades
  const [totalEvaluaciones, setTotalEvaluaciones] = useState(0);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });

  useEffect(() => {
    const buscarTemas = async () => {
      const startIndex = (currentPage - 1) * pageSize;
  
      const { data, error, count } = await supabase
        .from('temas')
        .select(`
          *,
          preguntas(*)
        `, { count: 'exact' })
        .range(startIndex, startIndex + pageSize - 1);
  
      if (error) {
        alert(error.message);
      } else {
        // Procesar los datos para contar preguntas totales, fijas y aleatorias
        const temasConConteos = data.map(tema => {
          let preguntasFijas = 0;
          let preguntasAleatorias = 0;
          
          tema.preguntas.forEach(pregunta => {
            if (pregunta.pregunta_concepto === 'fija') {
              preguntasFijas++;
            } else if (pregunta.pregunta_concepto === 'aleatoria') {
              preguntasAleatorias++;
            }
          });
  
          return {
            ...tema, // Conservar los datos originales del tema
            totalPreguntas: tema.preguntas.length, // Total de preguntas
            preguntasFijas, // Total de preguntas fijas
            preguntasAleatorias // Total de preguntas aleatorias
          };
        });
  
        setEvaluaciones(temasConConteos);
        setTotalEvaluaciones(count);
      }
    };
    buscarTemas();
  }, [currentPage, triggerEffect])

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };
  

  const handleDelete = async (id_tema) => {
    console.log(id_tema);
    const { error } = await supabase
      .from('temas')
      .delete()
      .eq('id_tema', id_tema);

    if (error) {
      alert(error.message);
    } else {
      setTriggerEffect(prev => !prev);
      setCurrentPage(currentPage);
      setNotification({
        visible: true,
        titulo: "Éxito",
        mensaje: "Se ha borrado su tema" // Ajusta según necesites
      });

    }
  }

  const totalPages = Math.ceil(totalEvaluaciones / pageSize);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // +1 porque enero es 0
    const año = fecha.getFullYear();
  
    return `${dia}/${mes}/${año}`;
  }
  

  const filteredEvaluaciones = evaluaciones.filter(evaluaciones =>
    evaluaciones.nombre?.toLowerCase().includes(searchTerm) ||
    evaluaciones.nivel?.toLowerCase().includes(searchTerm) ||
    evaluaciones.clase?.toLowerCase().includes(searchTerm) 
    // Añadir mas campos si quieremos que se pueda buscar por mas campos
  );

  return (
    <>
    <div className="bg-white p-4 rounded-md shadow-md m-auto text-center">
      <h1 className="text-xl font-bold text-center text-[#2c5282] mb-4">
      Catálogo de Temas
      </h1>
      <div className="flex w-full max-w-full items-center space-x-2 mb-10">
        <Input placeholder="Search" type="text" onChange={handleSearchChange} />
        <Button type="submit">Buscar</Button>
      </div>
      <div className="overflow-x-auto mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nombre Tema</TableHead>
              <TableHead className="w-[150px]">Nivel</TableHead>
              <TableHead className="w-[150px]">Clase-tipo</TableHead>
              <TableHead className="w-[150px]">Preguntas disponibles</TableHead>
              <TableHead className="w-[150px]">Fijas</TableHead>
              <TableHead className="w-[150px]">Aleatorias</TableHead>
              <TableHead className="w-[150px]">Fecha creación</TableHead>
              <TableHead className="w-[150px]">Fecha modificación</TableHead>
              <TableHead className="w-[300px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvaluaciones.map((evaluacion, index) => (
              <TableRow key={index}>
                <TableCell>{evaluacion.nombre}</TableCell>
                <TableCell>{evaluacion.nivel}</TableCell>
                <TableCell>{evaluacion.clase}</TableCell>
                <TableCell>{evaluacion.totalPreguntas}</TableCell>
                <TableCell>{evaluacion.preguntasFijas}</TableCell>
                <TableCell>{evaluacion.preguntasAleatorias}</TableCell>
                <TableCell>{ formatearFecha( evaluacion.fecha_creado)}</TableCell>
                <TableCell>{ formatearFecha( evaluacion.fecha_actualizado )}</TableCell>
                <TableCell>
                  <Button onClick={() => router.push(`/dashboard/evaluaciones/temas/${evaluacion.id_tema}`)} variant="ghost">Editar</Button>
                  <Button onClick={() => handleDelete(evaluacion.id_tema)} variant="ghost">Borrar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="pagination-controls flex justify-around mt-6">
        <Button 
          variant="outline"
          onClick={goToPreviousPage} 
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button 
          variant="outline"
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
        >
          Siguiente
        </Button>
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
