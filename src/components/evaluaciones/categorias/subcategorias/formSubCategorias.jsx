import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ListaCategorias from "../lista-categorias";
import ListaSubCategorias from "./lista-subcategorias";

export default function FormSubCategoria({
  formState,
  handleInputChange,
  handleSubmit,
  titulo,
}) {

  const handleGrupoTipoChange = (id_categoria) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange({ target: { name: 'id_categoria', value: id_categoria } });
  };
  return (


    <form onSubmit={handleSubmit} className="rounded-lg shadow-lg">
    <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-center">
          <h1 className="text-3xl font-bold text-center mt-4  text-gray-800">
            {titulo}
          </h1>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <ListaCategorias
              selectedTipoId={formState.id_categoria} 
              onGrupoTipoChange={handleGrupoTipoChange}
              />
            </div>
          </div>
          <div className="mt-4 p-6">
            <label
              className="block text-sm font-medium mb-2 text-start"
              htmlFor="group-name"
            >
              Nombre Sub-Familia de Categoria:
            </label>
            <Input 
            name="nombre"
            value={formState.nombre}
            onChange={handleInputChange}
            id="group-name" placeholder="Secretarial" />
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
