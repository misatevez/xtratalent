import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select, SelectGroup } from "@/components/ui/select"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"


export default function AsignarPerfil() {
    return (
        <div className="bg-white p-6 shadow-lg rounded-lg mb-6 mt-6 mx-auto max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">ASIGNACION DE PERFILES</h1>
        </div>
        <div className= "p-6 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="entidad">
                Entidad:
              </label>
              <Select>
                <SelectTrigger id="entidad">
                  <SelectValue placeholder="(Todas)" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="sosesp">Secretaria de Obras Sociales (SOSEP)</SelectItem>
                  <SelectItem value="saestrategicos">Secretaria de Asuntos Estratégicos</SelectItem>
                  <SelectItem value="inaturismo">Instituto de Turismo (INGUAT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="tipoUsuario">
                Tipo Usuario:
              </label>
              <Select>
                <SelectTrigger id="tipoUsuario">
                  <SelectValue placeholder="(Todos)" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="interno">Interno</SelectItem>
                  <SelectItem value="externo">Externo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Table className="rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Nombre Perfil</TableHead>
              <TableHead>Correo Electrónico</TableHead>
              <TableHead className="w-[120px] text-center">Seleccionar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>Juan Ejemplo</TableCell>
              <TableCell>Administrador</TableCell>
              <TableCell>Juan.ejemplo@gmail.com</TableCell>
              <TableCell className="text-center">
                <input type="checkbox" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>02</TableCell>
              <TableCell>Luisa Pérez</TableCell>
              <TableCell>Operador</TableCell>
              <TableCell>Luisa.perezlo@gmail.com</TableCell>
              <TableCell className="text-center">
                <input checked type="checkbox" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>02</TableCell>
              <TableCell>Mario López</TableCell>
              <TableCell>Evaluado (Default)</TableCell>
              <TableCell>Mario_Lopez@hotmail.com</TableCell>
              <TableCell className="text-center">
                <input type="checkbox" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-6">
          <div className="flex flex-col" />
          <div className="flex flex-col items-end">
            <div className="flex space-x-2">
              <Button className="bg-gray-400 hover:bg-gray-500" variant="default">
                <ChevronLeftIcon className="text-gray-600" />
              </Button>
              <Button className="bg-gray-400 hover:bg-gray-500" variant="default">
                <ChevronRightIcon className="text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className=" p-6 rounded-lg">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a profile" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="administrador">Administrador</SelectItem>
                  <SelectItem value="jefeReclutador">Jefe Reclutador</SelectItem>
                  <SelectItem value="reclutador">Reclutador</SelectItem>
                  <SelectItem value="operador">Operador</SelectItem>
                  <SelectItem value="evaluado">Evaluado (Default)</SelectItem>
                  <SelectItem value="auxiliarRH">Auxiliar RH</SelectItem>
                  <SelectItem value="especial">Especial</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end items-center">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">Guardar</Button>
          </div>
        </div>
      </div>
    );
}



function ChevronLeftIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    )
  }
  
  
  function ChevronRightIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    )
  }