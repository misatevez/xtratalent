import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ListaTipodeGrupoCorporativo from './lista-tipodeGC';
import Volver from '@/components/ui/volver';


export default function FormGC({ formState, handleInputChange, handleSubmit, titulo }) {

  const handleGrupoTipoChange = (id_grupotipo) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange({ target: { name: 'id_grupotipo', value: id_grupotipo } });
  };

    return (
      <div className="p-4 mx-auto w-full max-w-2xl mt-4">
      <div className="rounded-lg shadow-lg">
        <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
        <form  onSubmit={handleSubmit}>
        <div>
        <h2 className="text-lg font-bold mb-4">{titulo}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
          <ListaTipodeGrupoCorporativo 
           selectedTipoId={formState.id_grupotipo} 
          onGrupoTipoChange={handleGrupoTipoChange} />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1" htmlFor="group-name">
            Nombre GRUPO:
          </label>
          <Input name="nombre" value={formState.nombre} onChange={handleInputChange} id="group-name" placeholder="Especial" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1" htmlFor="group-description">
            Descripción Grupo:
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
          <Volver />
        </div>
      </div>
      </form>
      </div>
      </div>
      </div>
    );
}


