import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ListaDirecciones from '../entidadempresa/subentidades/areas-direcciones/lista-direcciones';
import ListaDepartamentos from '../entidadempresa/subentidades/areas-direcciones/departamento/lista-departamento';
import ListaSubEntidad from '../entidadempresa/subentidades/lista-subentidad';
import ListaEntidadesEmpresas from '../entidadempresa/lista-entidad-empresa';







export default function FormPuesto({ formState, handleInputChange, handleSubmit, titulo, handleInputChange2, handleInputChange3, handleInputChange4 }) {

  const handleGrupoTipoChange = (id_direcciones) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange({ target: { name: 'id_direcciones', value: id_direcciones } });
  };

  const handleGrupoTipoChange2 = (id_departamentos) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange2({ target: { name: 'id_departamentos', value: id_departamentos } });
  };

  const handleGrupoTipoChange3 =  (id_entidad_empresa) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange3({ target: { name: 'id_entidad_empresa', value: id_entidad_empresa } });
  };

  const handleGrupoTipoChange4 = (id_sub_entidad) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange4({ target: { name: 'id_sub_entidad', value: id_sub_entidad } });
  };


    return (
        <form  onSubmit={handleSubmit}>
        <div className="bg-white p-4 rounded-md shadow-md mt-4">
        <h2 className="text-lg font-bold text-[#2c5282] mb-4">{titulo}</h2>
        <div className="grid grid-cols-2 gap-4">

        <div>
          <ListaEntidadesEmpresas
           selectedTipoId={formState.id_entidad_empresa} 
          onGrupoTipoChange={handleGrupoTipoChange3} />
          </div>
        
          <div>
          <ListaSubEntidad
           selectedTipoId={formState.id_sub_entidad} 
          onGrupoTipoChange={handleGrupoTipoChange4} />
          </div>


          <div>
          <ListaDirecciones
           selectedTipoId={formState.id_direcciones} 
          onGrupoTipoChange={handleGrupoTipoChange} />
          </div>
        
          <div>
          <ListaDepartamentos
           selectedTipoId={formState.id_departamentos} 
          onGrupoTipoChange={handleGrupoTipoChange2} />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1" htmlFor="group-name">
            Nombre Puesto:
          </label>
          <Input name="nombre" value={formState.nombre} onChange={handleInputChange} id="group-name" placeholder="Especial" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1" htmlFor="group-description">
            Descripción Puesto:
          </label>
          <textarea
          name="descripcion" value={formState.descripcion} onChange={handleInputChange}
            className="resize-none border rounded-md w-full p-2"
            id="group-description"
            placeholder="El departamento..."
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


