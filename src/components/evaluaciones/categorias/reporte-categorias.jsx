"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notificacion } from "@/components/notification";
import { useRouter } from "next/navigation";



export default function ReporteCategorias() {
  const router = useRouter();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Ajustar según necesidades
  const [totalCategorias, setTotalCategorias] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });

  useEffect(() => {
    const getCategorias = async () => {
      const startIndex = (currentPage - 1) * pageSize;

      // Agregar búsqueda y paginación a la consulta
      const { data, count, error } = await supabase
        .from("categorias")
        .select("*", { count: "exact" })
        .ilike("nombre", `%${searchTerm}%`)
        .range(startIndex, startIndex + pageSize - 1);

      if (error) {
        console.error(error);
      } else {
        setCategorias(data);
        setTotalCategorias(count);
        setLoading(false);
      }
    };

    getCategorias();
  }, [currentPage, searchTerm, triggerEffect]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Reiniciar a la primera página al buscar
  };

  const totalPages = Math.ceil(totalCategorias / pageSize);

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

  function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // +1 porque enero es 0
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año}`;
  }

  const filteredCategorias = categorias.filter(
    (categorias) => categorias.nombre?.toLowerCase().includes(searchTerm)
    // Añadir mas campos si quieremos que se pueda buscar por mas campos
  );

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  const handleDelete = async (id_categoria) => {
    const { error } = await supabase
      .from('categorias')
      .delete()
      .eq('id_categoria', id_categoria);

    if (error) {
      console.log(error.message);
    } else {
      setTriggerEffect(prev => !prev);
      setCurrentPage(currentPage);
      setNotification({
        titulo: "Exito",
        mensaje: "La categoria fue eliminada correctamente",
        visible: true,
      });
    }
  }

  if (loading) return <div>Cargando...</div>;

  return (
    <>
    <div className="p-4 mx-auto w-full max-w-2xl mt-4">
      <div className="rounded-lg shadow-lg">
        <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-center">
          <h1 className="text-xl font-bold text-center mb-4">
            Catalogo Familia de Evaluaciones
          </h1>
          <div className="flex w-full max-w-full items-center space-x-2 mb-10">
            <Input
              placeholder="Buscar"
              type="text"
              onChange={handleSearchChange}
            />
          </div>
          <div className="overflow-x-auto mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Nombre Familia</TableHead>
                  <TableHead className="w-[200px]">Fecha creación</TableHead>
                  <TableHead className="w-[300px]">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategorias?.map((categoria, index) => (
                  <TableRow key={index}>
                    <TableCell>{categoria.nombre}</TableCell>
                    <TableCell>
                      {formatearFecha(categoria.fecha_creado)}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        onClick={() =>
                          router.push(
                            `/dashboard/evaluaciones/categorias/${categoria.id_categoria}`
                          )
                        }
                        variant="ghost"
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleDelete(categoria.id_categoria)}
                        variant="ghost"
                      >
                        Borrar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="pagination-controls flex justify-around mt-4">
            <Button
              variant="outline"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
            >
              Siguiente
            </Button>
          </div>
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
