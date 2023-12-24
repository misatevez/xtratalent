
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function BuscarGrupoCoorporativo() {
    return (
      <div className="bg-white p-4 rounded-md shadow-md m-auto text-center">
      <h1 className="text-xl font-bold text-center text-[#2c5282] mb-4">
       Buscar Grupos Coorporativos
      </h1>
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
              <TableHead className="w-[100px]">Grupo Tipo</TableHead>
              <TableHead className="w-[200px]">Nombre del GRUPO</TableHead>
              <TableHead className="w-[150px]">Fecha Registro</TableHead>
              <TableHead className="w-[150px]">Última Modificación</TableHead>
              <TableHead className="w-[100px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Público</TableCell>
              <TableCell>Sector Público – Gobierno – Estatal</TableCell>
              <TableCell>01/11/2023</TableCell>
              <TableCell>28/11/2023</TableCell>
              <TableCell>
                <Button variant="ghost">Editar</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Privado</TableCell>
              <TableCell>Sector Privado Empresarial</TableCell>
              <TableCell>01/11/2023</TableCell>
              <TableCell>28/11/2023</TableCell>
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
        <Button variant="outline">Nuevo GRUPO</Button>
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