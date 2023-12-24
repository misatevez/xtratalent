import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"


export default function UsuarioOnOFF() {
    return (
           <div className="bg-white p-4 mx-auto text-center">
          <div className="bg-[#003366] p-4 text-white">
            <h1 className="text-2xl font-bold">MODULO 1-6 ACTIVACION DE USUARIOS</h1>
          </div>
          <div>
            <p className="flex items-center space-x-2 mt-4">
              <Input placeholder="Search" type="text" />
              <Button>Buscar</Button>
            </p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <h2 className="text-xl font-semibold text-[#003366]">Activación usuarios (ON-OFF)</h2>
          </div>
          <h3 className="text-lg font-semibold mt-4 mb-2 text-[#003366]">IDENTIFICACIÓN DE USUARIO</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white bg-[#003366]">DPI</TableHead>
                <TableHead className="text-white bg-[#003366]">Nombre</TableHead>
                <TableHead className="text-white bg-[#003366]">Nombre Perfil</TableHead>
                <TableHead className="text-white bg-[#003366]">Correo Electrónico</TableHead>
                <TableHead className="text-white bg-[#003366]">Fecha Registro</TableHead>
                <TableHead className="text-white bg-[#003366]">Status Usuario</TableHead>
                <TableHead className="text-white bg-[#003366]">Seleccionar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">2980-09412-0101</TableCell>
                <TableCell>Mario López</TableCell>
                <TableCell>Evaluado (Default)</TableCell>
                <TableCell>Mario_Lopez@hotmail.com</TableCell>
                <TableCell>05/05/2023</TableCell>
                <TableCell>
                  <Badge variant="secondary">ACTIVO</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline">Activar - Desactivar</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex justify-end mt-4">
            <Button>Guardar</Button>
          </div>
        </div>

    );
}

