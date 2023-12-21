import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export default function ModificarPasswords() {
    return (
        <div className="bg-white p-4 m-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">IDENTIFICACIÓN DE USUARIO</h1>
        </div>
        <div className="flex w-full max-w-full items-center space-x-2">
          <Input placeholder="Search" type="text" />
          <Button type="submit">Buscar</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Código</TableHead>
              <TableHead className="w-[150px]">Nombre</TableHead>
              <TableHead className="w-[200px]">Nombre Perfil</TableHead>
              <TableHead className="w-[250px]">Seleccionar</TableHead>
              <TableHead className="w-[150px]">Fecha Registro</TableHead>
              <TableHead className="w-[100px]">Seleccionar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>02</TableCell>
              <TableCell>Mario López</TableCell>
              <TableCell>Evaluado (Default)</TableCell>
              <TableCell>mario.lopez@hotmail.com</TableCell>
              <TableCell>05/05/2023</TableCell>
              <TableCell>
                <input className="accent-blue-500 h-5 w-5" type="checkbox" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="mt-10 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-bold">Introducir Nueva Contraseña:</label>
              <Input placeholder="**********" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold">Confirmar Contraseña:</label>
              <Input placeholder="**********" />
            </div>
          </div>
          <p className="text-xs mt-2">
            * La contraseña debe deberá cumplir con las políticas de contraseñas seguras, con no menos de 8 caracteres
          </p>
          <div className="flex justify-between mt-4">
            <Button className="bg-blue-500 text-white">Guardar</Button>
          </div>
        </div>
      </div>
    );
}


