import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
  } from "@/components/ui/table";
  import { Button } from "@/components/ui/button";
  
  export default function ReporteSubCategorias() {
    return (
      <div className="p-4 mx-auto w-full max-w-2xl mt-4">
        <div className="rounded-lg shadow-lg">
          <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-center">
            <h1 className="text-2xl font-bold text-center mt-4  text-gray-800">
              Reporte - Catalogo Familia y Sub-Familias de Evaluaciones 
            </h1>
            <div className="grid grid-cols-1 gap-4 mt-6">
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Fecha creación</TableHead>
                      <TableHead className="w-[200px]">No. Categoría</TableHead>
                      <TableHead className="w-[300px]">
                        Nombre Familia - Categoria
                      </TableHead>
                      <TableHead className="w-[300px]">
                      No. Sub-Categoría
                      </TableHead>
                      <TableHead className="w-[300px]">
                        Nombre Sub-Categoría
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>20/10/22</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>Administracion</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>Compras</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="flex justify-around mt-4">
            <Button>Generar PDF</Button>
          </div>
          </div>
        </div>
      </div>
    );
  }
  