import { Button } from "@/components/ui/button";
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
import ListaCategorias from "../categorias/lista-categorias";
import ListaSubCategorias from "../categorias/subcategorias/lista-subcategorias";

export default function CrearEvaluacion() {
  return (
    <div className=" p-4 mx-auto w-full max-w-5xl mt-4 ">
    <div className="bg-white p-6 shadow-lg rounded-lg mx-auto my-4 text-left">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-700">
          CREADOR - GENERADOR DE EVALUACIONES
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="grid col-span-full">
          <label className="font-semibold " htmlFor="nombre">
            Nombre Evaluacion
          </label>
          <input
            className="border p-2"
            id="nombre"
            placeholder="Microsoft Excel 365"
            type="text"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <ListaCategorias />
        </div>
        <div>
          <ListaSubCategorias />
        </div>
        <div className="flex flex-col">
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
        <div  className="flex justify-center items-center">
        ESPACIO PARA EXPLICACION
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="clase">
            Clase-Tipo Objetivo Asociado
          </label>
          <Select>
            <SelectTrigger id="clase">
              <SelectValue placeholder="Objetivo Asociado" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="objetivo">Objetivo Asociado</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div  className="flex  justify-center items-center">
        ESPACIO PARA EXPLICACION
        </div>
        <div className="grid grid-cols-2 col-span-full gap-4 mb-4 ">

                    <div className="grid grid-cols-2 ">
            <div>
              <label className="font-semibold" htmlFor="duracion">
                Duracion (Minutos)
              </label>
              <input
                className="border p-2"
                id="duracion"
                placeholder="80"
                type="number"
              />
            </div>
            <div className="flex items-center">
              <input className="mr-2" id="limite" type="checkbox" />
              <label className="font-semibold" htmlFor="limite">
                Limite de tiempo
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 ">
            <div>
              <label className="font-semibold" htmlFor="duracion">
                Calificacion (Minima Req)
              </label>
              <input
                className="border p-2"
                id="duracion"
                placeholder="80"
                type="number"
              />
            </div>
            <div  className="flex items-center">
              <input className="mr-2" id="limite" type="checkbox" />
              <label className="font-semibold" htmlFor="limite">
                Evaluacion Activa
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="font-semibold" htmlFor="descripcion">
          Descripción:
        </label>
        <textarea
          className="w-full border p-2"
          id="descripcion"
          placeholder="Esta evaluación es ideal para medir el conocimiento de Excel 365 a los candidatos que requieren conocer, administrar y aplicar herramientas de apoyo y auxiliares para distintos procesos y funciones administrativas y operativas con el propósito de medir desempeño óptimo de sus actividades responsabilidades."
          rows="3"
        />
      </div>
      <div className="mb-4">
        <label className="font-semibold" htmlFor="instrucciones">
          Instrucciones:
        </label>
        <textarea
          className="w-full border p-2"
          id="instrucciones"
          placeholder="Lea y evalúe detenidamente cada una de las siguientes preguntas y responda sobre las opciones de respuesta, de acuerdo a su forma de pensar, actuar en base a su conocimiento y/o experiencia."
          rows="3"
        />
      </div>
      <div className="mb-4">
        <label className="font-semibold" htmlFor="instrucciones">
        Areas a Evaluar:
        </label>
        <textarea
          className="w-full border p-2"
          id="instrucciones"
          placeholder="Dominio de calculos y formulas"
          rows="3"
        />
      </div>
      <div className="flex justify-end">
        <Button className="bg-blue-500 text-white" variant="default">
          Guardar
        </Button>
      </div>
    </div>
    </div>
  );
}
