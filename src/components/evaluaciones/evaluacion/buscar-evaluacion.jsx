'use client'
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import supabase from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function BuscarEvaluacion() {
  const router = useRouter();
  const [evaluaciones, setEvaluaciones] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Puedes ajustar esto según tus necesidades
  const [totalEvaluaciones, setTotalEvaluaciones] = useState(0);

  useEffect(() => {
    const buscarEvaluaciones = async () => {
      const startIndex = (currentPage - 1) * pageSize;

      const { data, error, count } = await supabase
        .from('evaluaciones')
        .select(`
          *,
          categorias: id_categoria (
            id_categoria,
            nombre
          ),
          sub_categorias: id_subcategoria (
            id_subcategorias,
            nombre
          )
        `, { count: 'exact' })
        .range(startIndex, startIndex + pageSize - 1);

      if (error) {
        alert(error.message);
      } else {
        setEvaluaciones(data);
        setTotalEvaluaciones(count);
      }
    };
    buscarEvaluaciones();
  }, [currentPage])

  const handleDelete = async (id_evaluacion) => {
    const { error } = await supabase
      .from('evaluaciones')
      .delete()
      .eq('id_evaluacion', id_evaluacion);

    if (error) {
      alert(error.message);
    } else {
      // Reload the current page
      setCurrentPage(currentPage);
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

  return (
    <div className="bg-white p-4 rounded-md shadow-md m-auto text-center">
      <h1 className="text-xl font-bold text-center text-[#2c5282] mb-4">
        Buscar Evaluaciones
      </h1>
      <div className="overflow-x-auto mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nombre</TableHead>
              <TableHead className="w-[150px]">Familia</TableHead>
              <TableHead className="w-[150px]">Sub-familia</TableHead>
              <TableHead className="w-[300px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {evaluaciones.map((evaluacion, index) => (
              <TableRow key={index}>
                <TableCell>{evaluacion.nombre}</TableCell>
                <TableCell>{evaluacion.categorias?.nombre}</TableCell>
                <TableCell>{evaluacion.sub_categorias?.nombre}</TableCell>
                <TableCell>
                <Button variant="ghost">Asignar</Button>
                  <Button onClick={() => router.push(`/dashboard/evaluaciones/evaluacion/${evaluacion.id_evaluacion}`)} variant="ghost">Editar</Button>
                  <Button onClick={() => handleDelete(evaluacion.id_evaluacion)} variant="ghost">Borrar</Button>
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
  );
}
