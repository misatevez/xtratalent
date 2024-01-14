import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Volver from '@/components/ui/volver';

export default function FormTipoGC({ formState, handleInputChange, handleSubmit, titulo }) {
  const router = useRouter()
    return (
      <div className="p-4 mx-auto w-full max-w-2xl mt-4">
      <div className="rounded-lg shadow-lg">
        <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
        <form  onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold">{titulo}</h2>
        <div className="grid grid-cols-2 gap-4">
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1" htmlFor="group-name">
            Nombre de tipo de Grupo Corporativo:
          </label>
          <Input name="nombre" value={formState.nombre} onChange={handleInputChange} id="group-name" placeholder="Especial" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1" htmlFor="group-description">
            Descripción tipo:
          </label>
          <textarea
            name="descripcion" value={formState.descripcion} onChange={handleInputChange}
            className="resize-none border rounded-md w-full p-2"
            id="group-description"
            placeholder="El tipo de grupo corporativo..."
            rows="4"
          />
        </div>
        <div className="flex justify-around mt-4">
          <Button ype="submit">Guardar</Button>
          <Volver/>
        </div>
      </form>
      </div>
      </div>
      </div>
    );
}


