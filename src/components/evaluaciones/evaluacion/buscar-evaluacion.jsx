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
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")

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
        console.log(data);
        setEvaluaciones(data);
        setTotalEvaluaciones(count);
      }
    };
    buscarEvaluaciones();
  }, [currentPage, triggerEffect])

  const handleDelete = async (id_evaluacion) => {
    const { error } = await supabase
      .from('evaluaciones')
      .delete()
      .eq('id_evaluacion', id_evaluacion);

    if (error) {
      alert(error.message);
    } else {
      setTriggerEffect(prev => !prev);
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const filteredEvaluaciones = evaluaciones.filter(evaluaciones =>
    evaluaciones.nombre?.toLowerCase().includes(searchTerm) ||
    evaluaciones.descripcion?.toLowerCase().includes(searchTerm)
    // Añadir mas campos si quieremos que se pueda buscar por mas campos
  );

  return (
    <div className="bg-white p-4 rounded-md shadow-md m-auto text-center">
      <h1 className="text-xl font-bold text-center text-[#2c5282] mb-4">
      Catálogo de Evaluaciones
      </h1>
      <div className="flex w-full max-w-full items-center space-x-2 mb-10">
        <Input placeholder="Search" type="text" onChange={handleSearchChange} />
        <Button type="submit">Buscar</Button>
      </div>
      <div className="overflow-x-auto mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nombre</TableHead>
              <TableHead className="w-[150px]">Familia</TableHead>
              <TableHead className="w-[150px]">Sub-familia</TableHead>
              <TableHead className="w-[150px]">Estado</TableHead>
              <TableHead className="w-[150px]">Clase</TableHead>
              <TableHead className="w-[150px]">Nivel</TableHead>
              <TableHead className="w-[150px]">Duracion</TableHead>
              <TableHead className="w-[300px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvaluaciones.map((evaluacion, index) => (
              <TableRow key={index}>
                <TableCell>{evaluacion.nombre}</TableCell>
                <TableCell>{evaluacion.categorias?.nombre}</TableCell>
                <TableCell>{evaluacion.sub_categorias?.nombre}</TableCell>
                <TableCell>{evaluacion.activa ? "ACTIVA" : "DESACTIVADA"}</TableCell>

                <TableCell>{evaluacion.clase}</TableCell>
                <TableCell>{evaluacion.nivel}</TableCell>
                <TableCell>{evaluacion.duracion} Mins</TableCell>
                <TableCell>
                <Button onClick={() => router.push(`/dashboard/evaluaciones/evaluacion/asignar/${evaluacion.id_evaluacion}`)} variant="ghost">Asignar</Button>
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
