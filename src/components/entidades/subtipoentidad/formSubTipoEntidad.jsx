import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ListaGruposCorporativos from '../gruposcorporativos/listagruposcorporativos';



export default function FormSubTipoEntidad({ formState, handleInputChange, handleSubmit, titulo }) {

  const handleGrupoTipoChange = (id_grupocorporativo) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange({ target: { name: 'id_grupocorporativo', value: id_grupocorporativo } });
  };

    return (
        <form  onSubmit={handleSubmit}>
        <div className="bg-white p-4 rounded-md shadow-md mt-4">
        <h2 className="text-lg font-bold text-[#2c5282] mb-4">{titulo}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
          <ListaGruposCorporativos 
           selectedTipoId={formState.id_grupocorporativo} 
          onGrupoTipoChange={handleGrupoTipoChange} />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1" htmlFor="group-name">
            Nombre SubTipo:
          </label>
          <Input name="nombre" value={formState.nombre} onChange={handleInputChange} id="group-name" placeholder="Especial" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1" htmlFor="group-description">
            Descripción SubTipo:
          </label>
          <textarea
          name="descripcion" value={formState.descripcion} onChange={handleInputChange}
            className="resize-none border rounded-md w-full p-2"
            id="group-description"
            placeholder="El grupo especial..."
            rows="4"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button>Guardar</Button>
        </div>
      </div>
      </form>
    );
}


