import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ReporteTemas() {
  return (
    <div className="p-4 mx-auto w-full max-w-4xl mt-4">
      <div className="rounded-lg shadow-lg">
        <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-center">
          <h1 className="text-2xl font-bold text-center mt-4  text-gray-800">
            Reporte - Catalogo Familia de Evaluaciones
          </h1>
          <div className="grid grid-cols-5 gap-4 mt-4">
            <div className=" col-span-4">
              <Input id="group-name" placeholder="MS Excel" />
              </div>
              <div>
              <Button>Buscar</Button>
              </div>
            </div>
          <h3 className="font-bold text-center mt-4  text-gray-800">
                Temas disponibles - Registrados
              </h3>
          <div className="grid grid-cols-1 gap-4 mt-6">
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      Nombre contenido - TEMA
                    </TableHead>
                    <TableHead className="w-[100px]">
                      Nivel Profundiad Desempeño
                    </TableHead>
                    <TableHead className="w-[100px]">
                      Clase-Tipo Objetivo Asociado
                    </TableHead>
                    <TableHead className="w-[50px]">
                      Preguntas Disponibles
                    </TableHead>
                    <TableHead className="w-[50px]">Fijas</TableHead>
                    <TableHead className="w-[50px]">Aleatorias</TableHead>
                    <TableHead className="w-[50px]">Fecha Creacion</TableHead>
                    <TableHead className="w-[50px]">
                      Fecha modificacion
                    </TableHead>
                    <TableHead className="w-[50px]">-</TableHead>
                    <TableHead className="w-[50px]">-</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>MS Excel Formulas</TableCell>
                    <TableCell>Medio</TableCell>
                    <TableCell>Técnico</TableCell>
                    <TableCell>40</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>13/01/2023</TableCell>
                    <TableCell>20/10/2023</TableCell>
                    <TableCell>Eliminar</TableCell>
                    <TableCell>Editar</TableCell>
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
