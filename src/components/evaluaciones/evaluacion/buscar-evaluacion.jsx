'use client'
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import supabase from "@/lib/supabaseClient"



export default function BuscarEvaluacion() {

    const [evaluaciones, setEvaluaciones] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Puedes ajustar esto según tus necesidades
    const [triggerEffect, setTriggerEffect] = useState(false);
      
    useEffect(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize - 1;
      
        const buscarEvaluaciones = async () => {
            const { data, error } = await supabase
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
                `)
                .range(startIndex, endIndex)
            if (error) return alert(error.message);
            console.log(data)
            setEvaluaciones(data);
        }
        buscarEvaluaciones();
      }, [currentPage, triggerEffect])
      
     const handleDelete = async (id_evaluacion) => {
        const { data, error } = await supabase
          .from('evaluaciones')
          .delete()
          .eq('id_evaluacion', id_evaluacion)
        if (error) return alert(error.message);
        console.log(data)
        setTriggerEffect(prev => !prev);
      }

    return (
      <div className="bg-white p-4 rounded-md shadow-md m-auto text-center">
      <h1 className="text-xl font-bold text-center text-[#2c5282] mb-4">
       Buscar Evaluaciones
      </h1>
      {/* <div className="flex justify-center">
        <Input className="mr-2" placeholder="Search" type="text" />
        <Button variant="outline">
          Buscar
          <div className="ml-1" />
        </Button>
      </div> */}
      <div className="overflow-x-auto mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nombre</TableHead>
              <TableHead className="w-[150px]">Familia</TableHead>
              <TableHead className="w-[150px]">Sub-familia</TableHead>
              <TableHead className="w-[200px]"> Accion </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {evaluaciones.map((evaluacion, index) => (
              <TableRow key={index}>
                <TableCell>{evaluacion.nombre}</TableCell>
                <TableCell>{evaluacion.categorias.nombre}</TableCell>
                <TableCell>{evaluacion.sub_categorias.nombre}</TableCell>
                <TableCell>
                  <Button variant="ghost">Editar</Button>
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
    onClick={() => setCurrentPage(currentPage - 1)} 
    disabled={currentPage === 1}
  >
    Anterior
  </Button>
  <span> Página {currentPage} </span>
  <Button 
    variant="outline"
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Siguiente
  </Button>
</div>
    </div>
    );
}
