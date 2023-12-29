import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ListaCategorias from "./lista-categorias";

export default function FormCategoria({
  formState,
  handleInputChange,
  handleSubmit,
  titulo,
}) {

  
  return (


    <form onSubmit={handleSubmit} className="rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-center">
        <h1 className="text-3xl font-bold text-center mt-4  text-gray-800">
          {titulo}
        </h1>
        <div className="mt-4 p-6">
          <label
            className="block text-sm font-medium mb-2 text-start"
            htmlFor="group-name"
          >
            Nombre Familia de Categoria:
          </label>
          <Input
            name="nombre"
            value={formState.nombre}
            onChange={handleInputChange}
            id="group-name"
            placeholder="Office 365"
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
