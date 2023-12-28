import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function FormTipoGC({ formState, handleInputChange, handleSubmit, titulo }) {
    return (
        <form  onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md mt-4">
        <h2 className="text-lg font-bold text-[#2c5282] mb-4">{titulo}</h2>
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
        <div className="flex justify-end mt-4">
          <Button ype="submit">Guardar</Button>
        </div>
      </form>
    );
}


