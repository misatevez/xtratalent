import { SelectValue, SelectTrigger, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function CrearRespuesta() {
    return (
        <div key="1" className="bg-white p-4">
        <div className="bg-[#003366] p-4 text-white">
          <h1 className="text-center text-xl font-bold">MODULO 4-2-1-1 PREGUNTAS POR TEMA</h1>
        </div>
        <div className="flex justify-between items-center p-4 border-b-2 border-blue-800">
          <h2 className="text-blue-800 text-lg font-bold">Editar - PREGUNTAS y RESPUESTAS</h2>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <BookIcon className="text-blue-800 h-6 w-6" />
              <span className="ml-2 font-bold">Tema-Contenido:</span>
              <span className="ml-2">Excel 365 - 2023</span>
            </div>
            <div className="flex items-center mb-2">
              <ListIcon className="text-blue-800 h-6 w-6" />
              <span className="ml-2 font-bold">Características y Detalle de la Pregunta:</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <span className="font-bold">Tipo:</span>
                <span className="ml-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="text">Texto</SelectItem>
                        <SelectItem value="number">Numerico</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </span>
              </div>
              <div className="flex items-center">
                <input className="ml-2" id="reviewable" type="checkbox" />
                <label className="ml-2" htmlFor="reviewable">
                  No Revisable
                </label>
                <input className="ml-2" id="fixed" type="checkbox" />
                <label className="ml-2" htmlFor="fixed">
                  Fija
                </label>
                <input className="ml-2" id="random" type="checkbox" />
                <label className="ml-2" htmlFor="random">
                  Aleatoria
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="font-bold" htmlFor="question">
                Descripción Contenido Pregunta:
              </label>
              <textarea className="mt-1 w-full p-2 border-2" id="question" placeholder="Cuanto es 2 X 2" rows="2" />
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-2">
              <span className="font-bold">Respuestas asignadas:</span>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="w-[100px]">Tipo</TableHead>
                  <TableHead className="w-[100px]">Respuesta</TableHead>
                  <TableHead className="w-[100px]">-</TableHead>
                  <TableHead className="w-[100px]">-</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>24</TableCell>
                  <TableCell />
                  <TableCell>Texto</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>Eliminar</TableCell>
                  <TableCell>Seleccionar</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="mb-4">
            <div className="mb-2">
              <span className="font-bold">Características de la respuesta:</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="font-bold" htmlFor="type">
                  Tipo:
                </label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Texto" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="text">Texto</SelectItem>
                    <SelectItem value="number">Número</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center">
                <input className="mr-2" id="correct" type="checkbox" />
                <label className="font-bold" htmlFor="correct">
                  Respuesta correcta:
                </label>
              </div>
              <div className="grid grid-cols-1 col-span-full">
                <label className="font-bold" htmlFor="description">
                  Descripción:
                </label>
                <textarea className="mt-1 w-full p-2 border-2" id="description" placeholder="4" rows="2" />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button className="bg-blue-800 text-white">Guardar Respuesta</Button>
            <Button className="bg-red-600 text-white">Regresar</Button>
          </div>
        </div>
      </div>
    );
}

