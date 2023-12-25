
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import ListaEntidadesEmpresa from "../lista-entidades-empresa";

export default function BuscarDireccion() {
    return (
      <div className="bg-white p-4 rounded-md shadow-md m-auto text-center">
      <h1 className="text-xl font-bold text-center text-[#2c5282] mb-4">
       TABLA - AREAS - DIRECCIONES
      </h1>
      <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
          <ListaEntidadesEmpresa />
          </div>
        </div>
      <div className="flex justify-center">
        <Input className="mr-2" placeholder="Search" type="text" />
        <Button variant="outline">
          Buscar
          <div className="ml-1" />
        </Button>
      </div>
      <div className="overflow-x-auto mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Nombre Entidad</TableHead>
              <TableHead className="w-[200px]">Nombre Área-Direccion</TableHead>
              <TableHead className="w-[50px]">Fecha Registro</TableHead>
              <TableHead className="w-[50px]">Vacantes activas</TableHead>
              <TableHead className="w-[50px]">Vacantes procesadas</TableHead>
              <TableHead className="w-[50px]">Última Modificación</TableHead>
              <TableHead className="w-[100px]">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Fondo de Desarrollo Social</TableCell>
              <TableCell>Direccion Ejecutiva</TableCell>
              <TableCell>01/11/2023</TableCell>
              <TableCell>02</TableCell>
              <TableCell>12</TableCell>
              <TableCell>01/11/2023</TableCell>
              <TableCell>
                <Button variant="ghost">Editar</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex mt-4 space-x-4 justify-center">
        <Button variant="outline">Reporte</Button>
        <Button variant="outline">Generar PDF</Button>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button variant="outline">Regresar</Button>
        <Button variant="outline">Nuevo tipo Entidad</Button>
      </div>
    </div>
    );
}

function SignalIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V8" />
      <path d="M22 4v16" />
    </svg>)
  );
}