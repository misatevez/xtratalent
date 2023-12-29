import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";

export default function FormTema({
  formState,
  handleInputChange,
  handleSubmit,
  titulo,
  handleSelectChange,
}) {
  const niveles = [
    { valor: "Basico", nombre: "1. Básico" },
    { valor: "Medio", nombre: "2. Medio" },
    { valor: "Intermedio", nombre: "3. Intermedio" },
    { valor: "Avanzado", nombre: "4. Avanzado" },
    { valor: "Experto", nombre: "5. Experto" },
    { valor: "Instructor", nombre: "6. Instructor" },
  ];

  const objetivo = [
    { valor: "Actitud", nombre: "Actitud" },
    { valor: "Aptitud", nombre: "Aptitud" },
    { valor: "Conocimiento", nombre: "Conocimiento" },
    { valor: "Competencia", nombre: "Competencia" },
    { valor: "Especifica-Desempeño", nombre: "Especifica-Desempeño" },
    { valor: "Habilidad", nombre: "Habilidad" },
    { valor: "Tecnico", nombre: "Tecnico" },
    { valor: "Psicometrico", nombre: "Psicometrico" },
  ];

  return (
    <form onSubmit={handleSubmit} className="rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-start">
        <h1 className="text-3xl font-bold text-center mt-4  text-gray-800">
          {titulo}
        </h1>
        <div className="grid grid-cols-3 mt-6">
          <div className="flex flex-col m-2">
            <div>
              <label className="block font-semibold" htmlFor="group-name">
                Nombre Tema:
              </label>
              <Input
                name="nombre"
                value={formState.nombre}
                onChange={handleInputChange}
                id="group-name"
                placeholder="Microsoft Excel 365"
              />
            </div>
          </div>

          <div className="flex flex-col m-2">
            <label className="font-semibold" htmlFor="nivel">
              Nivel de Profundidad
            </label>

            <Select
              onValueChange={(value) => handleSelectChange(value, "nivel")}
              value={formState.nivel}
            >
              <SelectTrigger id="group-type">
                <SelectValue placeholder="Seleccione uno" />
              </SelectTrigger>

              <SelectContent position="popper">
                {niveles.map((nivel, index) => (
                  <SelectItem key={index} value={nivel.valor}>
                    {nivel.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col m-2">
            <label className="font-semibold" htmlFor="clase">
              Objetivo Asociado
            </label>
            <Select
              onValueChange={(value) => handleSelectChange(value, "clase")}
              value={formState.clase}
            >
              <SelectTrigger id="group-type">
                <SelectValue placeholder="Seleccione uno" />
              </SelectTrigger>

              <SelectContent position="popper">
                {objetivo.map((nivel, index) => (
                  <SelectItem key={index} value={nivel.valor}>
                    {nivel.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="m-2">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="group-description"
          >
            Descripción Tema:
          </label>
          <textarea
            name="descripcion"
            value={formState.descripcion}
            onChange={handleInputChange}
            className="resize-none border rounded-md w-full p-2"
            id="group-description"
            placeholder="Microsoft Excel, forma parte de la suite de Microsoft Office, es una aplicación que permite realizar hojas de cálculo, que está organizada por filas y columnas, y que se utiliza para capturar, calcular y analizar datos numéricos."
            rows="4"
          />
        </div>

        <div className="flex justify-around mt-4">
          <Button
            type="submit"
            className="bg-blue-500 text-white"
            variant="default"
          >
            Guardar
          </Button>
        </div>
      </div>
    </form>
  );
}
