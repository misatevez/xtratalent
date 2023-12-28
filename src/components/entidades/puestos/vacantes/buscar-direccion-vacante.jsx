
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import ListaEntidadesEmpresa from "../../entidadempresa/subentidades/lista-entidades-empresa";
import ListaDirecciones from "../../entidadempresa/subentidades/areas-direcciones/lista-direcciones";
import ListaDepartamentos from "../../entidadempresa/subentidades/areas-direcciones/departamento/lista-departamentos";
import ListaPuestos from "../lista-puestos";
import ListaRenglones from "../renglones-presupuestarios/lista-renglones";
import ListaVacantes from "./lista-vacantes";


export default function BuscarDireccionVacante() {
    return (
      <div className="bg-white p-4 rounded-md shadow-md m-auto text-center">
      <h1 className="text-xl font-bold text-center text-[#2c5282] mb-4">
     Vacantes - Crear Dirección web de Registros Masivos
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

       

      <div className="overflow-x-auto mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Area - Dirección</TableHead>
              <TableHead className="w-[100px]">Departamento</TableHead>
              <TableHead className="w-[100px]">Puesto</TableHead>
              <TableHead className="w-[100px]">Vacante</TableHead>
              <TableHead className="w-[50px]">Link de acceso</TableHead>
              <TableHead className="w-[100px]">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Dirección Financiera</TableCell>
              <TableCell>Contabilidad</TableCell>
              <TableCell>Auxiliar de impuestos</TableCell>
              <TableCell>Especialista en impuestos</TableCell>
              <TableCell>www.xtratalento.com/vacantes/registro/xxx</TableCell>
              <TableCell>
                <Button variant="ghost">Eliminar</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
      <Button variant="outline">Generar PDF</Button>
        <Button variant="outline">Crear nueva link de acceso</Button>
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