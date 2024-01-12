'use client'

import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Notificacion } from "@/components/notification";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ReporteSubCategorias() {
  const router = useRouter();
  const [subCategorias, setSubCategorias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Ajustar según necesidades
  const [totalSubCategorias, setTotalSubCategorias] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });

  useEffect(() => {
    const getSubCategorias = async () => {
      const startIndex = (currentPage - 1) * pageSize;

      const { data, count, error } = await supabase
        .from("sub_categorias")
        .select(`
          *,
          categoria: id_categoria (
            nombre
          )
        `, { count: "exact" })
        .ilike("nombre", `%${searchTerm}%`)
        .range(startIndex, startIndex + pageSize - 1);

      if (error) {
        console.error(error);
      } else {

        setSubCategorias(data);
        setTotalSubCategorias(count);
      }
    };

    getSubCategorias();
  }, [currentPage, searchTerm, triggerEffect]);

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value.toLowerCase().trim();
    setSearchTerm(newSearchTerm);
    setCurrentPage(1); // Reiniciar a la primera página al buscar
  };
  

  const totalPages = Math.ceil(totalSubCategorias / pageSize);

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
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año}`;
  }

  const filteredSubCategorias = subCategorias.filter((subCategoria) => {
    return subCategoria.nombre.toLowerCase().includes(searchTerm);
  });
  
  const handleDelete = async (id_subcategorias) => {
    const { error } = await supabase
      .from('sub_categorias')
      .delete()
      .eq('id_subcategorias', id_subcategorias);
    
    if (error) {
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: error.message
      });
    } else {
      setTriggerEffect(prev => !prev);
      setCurrentPage(currentPage);
      setNotification({
        visible: true,
        titulo: "Exito",
        mensaje: "La sub-categoria fue eliminada correctamente"
      });
    }
  }
  
  

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  // Implementar la lógica de borrado aquí si es necesario

  return (
    <>
      <div className="p-4 mx-auto w-full max-w-3xl mt-4">
        <div className="rounded-lg shadow-lg">
          <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-center">
            <h1 className="text-xl font-bold text-center mb-4">
              Catalogo sub-familia de Evaluaciones
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
                    <TableHead className="w-[300px]">Nombre sub-familia</TableHead>
                    <TableHead className="w-[200px]">Fecha creación</TableHead>
                    <TableHead className="w-[400px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubCategorias.map((subCategoria, index) => (
                    <TableRow key={index}>
                      <TableCell>{subCategoria.categoria?.nombre ? subCategoria.categoria?.nombre : 'Falta asignar familia'}</TableCell>
                      <TableCell>{subCategoria.nombre}</TableCell>
                      <TableCell>{formatearFecha(subCategoria.fecha_creado)}</TableCell>
                      <TableCell>
                      {" "}
                      <Button
                        onClick={() =>
                          router.push(
                            `/dashboard/evaluaciones/categorias/subcategorias/${subCategoria.id_subcategorias}`
                          )
                        }
                        variant="ghost"
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleDelete(subCategoria.id_subcategorias)}
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
