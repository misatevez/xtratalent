
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import ListaEntidadesEmpresa from "../../subentidades/entidades-empresas/lista-entidades-empresa";
import ListaDirecciones from "../../subentidades/entidades-empresas/areas-direcciones/lista-direcciones";
import ListaDepartamentos from "../../subentidades/entidades-empresas/areas-direcciones/departamento/lista-departamentos";
import ListaPuestos from "../lista-puestos";
import ListaRenglones from "../renglones-presupuestarios/lista-renglones";
import ListaVacantes from "./lista-vacantes";


export default function BuscarVacante() {
    return (
      <div className="bg-white p-4 rounded-md shadow-md m-auto text-center">
      <h1 className="text-xl font-bold text-center text-[#2c5282] mb-4">
      Buscar Vacante
      </h1>
      <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
          <ListaEntidadesEmpresa />
          </div>
          <div>
          <ListaDirecciones />
          </div>
          <div>
          <ListaDepartamentos />
          </div>
          <div>
          <ListaPuestos />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
          <ListaVacantes />
          </div>
          <div>
         <ListaRenglones />
          </div>
          <div>
          <label className="block text-sm font-medium mb-1" htmlFor="group-type">
              Estatus:
            </label>
          <Select>
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="public">Activa - Vigente</SelectItem>
          <SelectItem value="public">Vencida</SelectItem>
          <SelectItem value="public">Cubierta</SelectItem>
          <SelectItem value="public">Cancelada</SelectItem>
        </SelectContent>
      </Select>
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
              <TableHead className="w-[100px]">Renglón número</TableHead>
              <TableHead className="w-[100px]">Area - Dirección</TableHead>
              <TableHead className="w-[100px]">Departamento</TableHead>
              <TableHead className="w-[50px]">Puesto</TableHead>
              <TableHead className="w-[50px]">Vacante</TableHead>
              <TableHead className="w-[50px]">Estatus Vacante</TableHead>
              <TableHead className="w-[50px]">Vigente hasta el</TableHead>
              <TableHead className="w-[100px]">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
            <TableCell>011</TableCell>
              <TableCell>Dirección Financiera</TableCell>
              <TableCell>Contabilidad</TableCell>
              <TableCell>Auxiliar de impuestos</TableCell>
              <TableCell>Especialista en impuestos</TableCell>
              <TableCell>Activas</TableCell>
              <TableCell>01/11/2023</TableCell>
              <TableCell>
                <Button variant="ghost">Editar</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
      <Button variant="outline">Generar PDF</Button>
        <Button variant="outline">Nueva vacante</Button>
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