import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ListaEntidadesEmpresas from '../entidades/entidadempresa/lista-entidad-empresa';

function FormRegistro({ formState, handleInputChange, handleSubmit, titulo }) {

  const handleGrupoTipoChange = (id_entidad_empresa) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange({ target: { name: 'id_entidad_empresa', value: id_entidad_empresa } });
  };

  return (
    <form onSubmit={handleSubmit}  className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl">
    <h1 className="text-4xl font-bold mb-2 text-center text-blue-400">{titulo}</h1>
    <h2 className="text-3xl font-semibold mb-2 text-center text-blue-300">DATOS PERSONALES</h2>
    <div className="flex items-center gap-6 mb-4">
        {/* <div className="w-40 h-40 bg-gray-300 rounded">
          <img
            alt="User Photo"
            className="w-full h-full object-cover rounded"
            height="160"
            src="https://generated.vusercontent.net/placeholder.svg"
            style={{
              aspectRatio: "320/160",
              objectFit: "cover",
            }}
            width="320" />
        </div> */}
      <div className="flex flex-col gap-4 w-full">
  <ListaEntidadesEmpresas onGrupoTipoChange={handleGrupoTipoChange} selectedTipoId={formState.id_entidad_empresa} />
        <label className="flex flex-col gap-2">
          <span className="text-lg font-semibold">CANDIDATO USUARIO</span>
          <select name="tipo_usuario" value={formState.tipo_usuario} onChange={handleInputChange} className="border rounded p-2">
          <option selected value="">Seleccione uno</option>
            <option value="Externo">Externo  Evaluado</option>
            <option  value="Interno">Interno  Usuario</option>
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-lg font-semibold">Correo Electrónico (e-Mail)</span>
          <Input
           name="correo_electronico" value={formState.correo_electronico} onChange={handleInputChange}
            className="border rounded p-2"
            placeholder="juan@ejemplo.com"
            type="email" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-lg font-semibold">Password</span>
          <Input
          name="password" value={formState.password}
           onChange={handleInputChange}
            className="border rounded p-2"
            placeholder="password"
            type="password" />
        </label>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Dirección Completa</span>
        <Input 
        name="direccion_calle_avenida" value={formState.direccion_calle_avenida} onChange={handleInputChange}
        className="border rounded p-2" placeholder="Calle - Avenida" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Colonia</span>
        <Input 
        name="direccion_colonia" value={formState.direccion_colonia} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Zona</span>
        <Input
        name="direccion_zona" value={formState.direccion_zona} onChange={handleInputChange} 
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Departamento</span>
        <Input
        name="direccion_departamento" value={formState.direccion_departamento} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Municipio</span>
        <Input 
        name="direccion_municipio" value={formState.direccion_municipio} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">País de Origen</span>
        <select name="pais_origen" value={formState.pais_origen} onChange={handleInputChange} className="border rounded p-2">
          <option  selected value="Guatemala">Guatemala</option>
        </select>
      </label>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Primer Nombre</span>
        <Input
        name="primer_nombre" value={formState.primer_nombre} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Segundo Nombre</span>
        <Input 
        name="segundo_nombre" value={formState.segundo_nombre} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Apellido Paterno</span>
        <Input 
        name="apellido_paterno" value={formState.apellido_paterno} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Apellido Materno</span>
        <Input
        name="apellido_materno" value={formState.apellido_materno} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
    </div>
    <div className="flex gap-6">
      <label className="flex flex-col gap-2 w-full">
        <span className="text-lg font-semibold">Fecha Nacimiento</span>
        <div className="flex gap-4 w-full">
          <Input
          
          name="fecha_nacimiento" value={formState.fecha_nacimiento} onChange={handleInputChange}
          className="border rounded p-2" type="date" />
        
        </div>
      </label>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">DPI CUI</span>
        <Input 
        name="numero_dpi" value={formState.numero_dpi} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Lugar de Nacimiento</span>
        <select
        name="lugar_nacimiento" value={formState.lugar_nacimiento} onChange={handleInputChange}
        className="border rounded p-2">
          <option selected value="Guatemala">Guatemala</option>
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Profesión Ocupación</span>
        <Input
        name="profesion_ocupacion" value={formState.profesion_ocupacion} onChange={handleInputChange}
          className="border rounded p-2"
          placeholder="Plaza Solicitante:"
          type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Pasaporte Número</span>
        <Input 
        name="numero_pasaporte" value={formState.numero_pasaporte} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Teléfono Casa</span>
        <Input 
        name="telefono_casa" value={formState.telefono_casa} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Estado Civil</span>
        <select 
        name="estado_civil" value={formState.estado_civil} onChange={handleInputChange}
        className="border rounded p-2">
          <option selected value="Soltero">Soltero</option>
          <option value="Casado">Casado</option>
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Género</span>
        <select
        name="genero_sexo" value={formState.genero_sexo} onChange={handleInputChange}
        className="border rounded p-2">
          <option selected value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Teléfono Móvil-Celular</span>
        <Input 
        name="telefono_movil_cel" value={formState.telefono_movil_cel} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
    </div>
    <Button type="submit" className="mt-4">Guardar</Button>
  </form>
  );
}

export default FormRegistro;
