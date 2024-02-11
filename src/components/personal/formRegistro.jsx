import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ListaEntidadesEmpresas from '../entidades/entidadempresa/lista-entidad-empresa';
import Volver from '../ui/volver';
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";


function FormRegistro({ formState, handleInputChange, handleSubmit, titulo, handleSelectChange }) {

  const tipo_usuario = [
    { valor: "Interno", nombre: "Interno" },
    { valor: "Externo", nombre: "Externo" },
  ];

  const paises = [
    { valor: "Guatemala", nombre: "Guatemala" },
  ];

  const estado_civil = [
    { valor: "Soltero", nombre: "Soltero" },
    { valor: "Casado", nombre: "Casado" }
  ];

  const genero = [
    { valor: "Masculino", nombre: "Masculino" },
    { valor: "Femenino", nombre: "Femenino" }
  ];


  const handleGrupoTipoChange = (id_entidad_empresa) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange({ target: { name: 'id_entidad_empresa', value: id_entidad_empresa } });
  };



  return (
    <div className="p-4 mx-auto w-full max-w-2xl mt-4">
    <div className="rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
    <form onSubmit={handleSubmit} >
    <h1 className="text-2xl font-bold mb-4 ">{titulo}</h1>
    <div className="flex items-center gap-6 mb-2">
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
      <div className="flex flex-col gap-3 w-full">
  <ListaEntidadesEmpresas onGrupoTipoChange={handleGrupoTipoChange} selectedTipoId={formState.id_entidad_empresa} />


            <label className="font-semibold" htmlFor="tipo_usuario">
            <span className="block text-sm font-medium mb-1">Tipo de usuario</span>
            </label>
            <Select
              onValueChange={(value) => handleSelectChange(value, "tipo_usuario")}
              value={formState.tipo_usuario}
            >
              <SelectTrigger id="group-type">
                <SelectValue placeholder="Seleccione uno" />
              </SelectTrigger>

              <SelectContent position="popper">
                {tipo_usuario.map((nivel, index) => (
                  <SelectItem key={index} value={nivel.valor}>
                    {nivel.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>



        <label className="flex flex-col gap-2">
          <span className="block text-sm font-medium mb-1">Correo Electrónico:</span>
          <Input
           name="correo_electronico" value={formState.correo_electronico} onChange={handleInputChange}
            className="border rounded p-2"
            placeholder="juan@ejemplo.com"
            type="email" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="block text-sm font-medium mb-1">Password</span>
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
        <span className="block text-sm font-medium mb-1">Dirección Completa</span>
        <Input 
        name="direccion_calle_avenida" value={formState.direccion_calle_avenida} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="block text-sm font-medium mb-1">Colonia</span>
        <Input 
        name="direccion_colonia" value={formState.direccion_colonia} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="block text-sm font-medium mb-1">Zona</span>
        <Input
        name="direccion_zona" value={formState.direccion_zona} onChange={handleInputChange} 
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="block text-sm font-medium mb-1">Departamento</span>
        <Input
        name="direccion_departamento" value={formState.direccion_departamento} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="block text-sm font-medium mb-1">Municipio</span>
        <Input 
        name="direccion_municipio" value={formState.direccion_municipio} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>

      <label className=" flex flex-col gap-2" htmlFor="clase">
            <span className="block text-sm font-medium mb-1">Pais de origen</span>
            
            <Select
              onValueChange={(value) => handleSelectChange(value, "pais_origen")}
              value={formState.pais_origen}
            >
              <SelectTrigger id="group-type">
                <SelectValue placeholder="Seleccione uno" />
              </SelectTrigger>

              <SelectContent position="popper">
                {paises.map((nivel, index) => (
                  <SelectItem key={index} value={nivel.valor}>
                    {nivel.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </label>

    </div>
    <div className="grid grid-cols-2 gap-6 mt-4">
      <label className="flex flex-col gap-2">
        <span className="block text-sm font-medium mb-1">Primer Nombre</span>
        <Input
        name="primer_nombre" value={formState.primer_nombre} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="block text-sm font-medium mb-1">Segundo Nombre</span>
        <Input 
        name="segundo_nombre" value={formState.segundo_nombre} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="block text-sm font-medium mb-1">Apellido Paterno</span>
        <Input 
        name="apellido_paterno" value={formState.apellido_paterno} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="block text-sm font-medium mb-1">Apellido Materno</span>
        <Input
        name="apellido_materno" value={formState.apellido_materno} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
    </div>
    <div className="flex gap-6 mt-4">
      <label className="flex flex-col gap-2 w-full">
        <span className="block text-sm font-medium mb-1">Fecha Nacimiento</span>
        <div className="flex gap-4 w-full">
          <Input
          
          name="fecha_nacimiento" value={formState.fecha_nacimiento} onChange={handleInputChange}
          className="border rounded p-2" type="date" />
        
        </div>
      </label>
    </div>
    <div className="grid grid-cols-2 gap-6 mt-4">
      <label className="flex flex-col gap-2">
        <span className="block text-sm font-medium mb-1">DPI CUI</span>
        <Input 
        name="numero_dpi" value={formState.numero_dpi} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      

      <label className=" flex flex-col gap-2" htmlFor="lugar_nacimiento">
            <span className="block text-sm font-medium mb-1">Lugar de nacimiento</span>
            
            <Select
              onValueChange={(value) => handleSelectChange(value, "lugar_nacimiento")}
              value={formState.lugar_nacimiento}
            >
              <SelectTrigger id="group-type">
                <SelectValue placeholder="Seleccione uno" />
              </SelectTrigger>

              <SelectContent position="popper">
                {paises.map((nivel, index) => (
                  <SelectItem key={index} value={nivel.valor}>
                    {nivel.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </label>

      <label className="flex flex-col gap-2">
        <span className="block text-sm font-medium mb-1">Profesión Ocupación</span>
        <Input
        name="profesion_ocupacion" value={formState.profesion_ocupacion} onChange={handleInputChange}
          className="border rounded p-2"
          type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="block text-sm font-medium mb-1">Pasaporte Número</span>
        <Input 
        name="numero_pasaporte" value={formState.numero_pasaporte} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="block text-sm font-medium mb-1">Teléfono Casa</span>
        <Input 
        name="telefono_casa" value={formState.telefono_casa} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
     
      <label className=" flex flex-col gap-2" htmlFor="estado_civil">
            <span className="block text-sm font-medium mb-1">Estado civil</span>
            
            <Select
              onValueChange={(value) => handleSelectChange(value, "estado_civil")}
              value={formState.estado_civil}
            >
              <SelectTrigger id="group-type">
                <SelectValue placeholder="Seleccione uno" />
              </SelectTrigger>

              <SelectContent position="popper">
                {estado_civil.map((nivel, index) => (
                  <SelectItem key={index} value={nivel.valor}>
                    {nivel.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </label>

      
            <label className=" flex flex-col gap-2" htmlFor="genero">
            <span className="block text-sm font-medium mb-1">Genero</span>
            
            <Select
              onValueChange={(value) => handleSelectChange(value, "genero")}
              value={formState.genero_sexo}
            >
              <SelectTrigger id="group-type">
                <SelectValue placeholder="Seleccione uno" />
              </SelectTrigger>

              <SelectContent position="popper">
                {genero.map((nivel, index) => (
                  <SelectItem key={index} value={nivel.valor}>
                    {nivel.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </label>

      <label className="flex flex-col gap-2">
        <span className="block text-sm font-medium mb-1">Teléfono Móvil-Celular</span>
        <Input 
        name="telefono_movil_cel" value={formState.telefono_movil_cel} onChange={handleInputChange}
        className="border rounded p-2" type="text" />
      </label>
    </div>
    <div className='flex justify-around mt-4'>
    <Button type="submit">Guardar</Button>
    <Volver />
    </div>
  </form>
  </div>
  </div>
  </div>
  );
}

export default FormRegistro;
