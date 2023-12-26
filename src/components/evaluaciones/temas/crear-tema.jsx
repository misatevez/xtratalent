"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function CrearTema() {
  const router = useRouter();
  return (
    <div className="p-4 mx-auto w-full max-w-3xl">
      <div className="rounded-lg shadow-lg">
        <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-start">
          <h1 className="text-3xl font-bold text-center mt-4  text-gray-800">
            Catalogo de Contenido - Temas
          </h1>
          <div className="grid grid-cols-3 mt-6">
          <div className="flex flex-col m-2">
          <div>
            <label
              className="block font-semibold"
              htmlFor="group-name"
            >
              Nombre Tema:
            </label>
            <Input id="group-name" placeholder="Microsoft Excel 365" />
          </div>
          </div>

          <div className="flex flex-col m-2">
            <label className="font-semibold" htmlFor="nivel">
              Nivel de Profundidad
            </label>
            <Select>
              <SelectTrigger id="nivel">
                <SelectValue placeholder="1. Básico" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="basico">1. Básico</SelectItem>
                <SelectItem value="medio">2. Medio</SelectItem>
                <SelectItem value="intermedio">3. Intermedio</SelectItem>
                <SelectItem value="avanzado">4. Avanzado</SelectItem>
                <SelectItem value="experto">5. Experto</SelectItem>
                <SelectItem value="instructor">6. Instructor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col m-2">
            <label className="font-semibold" htmlFor="clase">
              Clase-Tipo Objetivo
            </label>
            <Select>
              <SelectTrigger id="clase">
                <SelectValue placeholder="Actitud" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="objetivo">Actitud</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          </div>

          <div className="m-2">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="group-description"
            >
              Descripción Grupo:
            </label>
            <textarea
              className="resize-none border rounded-md w-full p-2"
              id="group-description"
              placeholder="Microsoft Excel, forma parte de la suite de Microsoft Office, es una aplicación que permite realizar hojas de cálculo, que está organizada por filas y columnas, y que se utiliza para capturar, calcular y analizar datos numéricos."
              rows="4"
            />
          </div>

          <div className="flex justify-around mt-4">
            <Button>Guardar</Button>
            <Button>Asignar</Button>
            <Button>Actualizar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
