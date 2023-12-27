'use client'
import Link from "next/link"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from 'react';
import supabase from "@/lib/supabaseClient"

export function RegistroInterno() {

  // Estado inicial para el formulario
  const [formState, setFormState] = useState({
    password: '',
    entidad: '',
    tipo_usuario: '',
    correo_electronico: '',
    codigo_plaza_vacante: null,
    profesion_ocupacion: '',
    codigo_perfil_puesto: null,
    anos_experiencia: null,
    direccion_calle_avenida: '',
    direccion_colonia: '',
    direccion_zona: null,
    direccion_departamento: '',
    direccion_municipio: '',
    primer_nombre: '',
    segundo_nombre: '',
    apellido_materno: '',
    apellido_paterno: '',
    fecha_nacimiento: '',
    numero_dpi: '',
    numero_afiliacion_igss: null,
    numero_nit: null,
    lugar_nacimiento: '',
    pais_origen: '',
    estado_civil: '',
    genero_sexo: '',
    numero_pasaporte: '',
    telefono_casa: '',
    telefono_particular: null,
    telefono_movil_cel: '',
  });

   // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formState)

    // Insertar en Supabase
    const { data, error } = await supabase.from('usuarios').insert([formState]);

    if (error) {
      // Manejar errores aquí
      console.error(error);
    } else {
      // Proceso exitoso
      console.log(data);
    }
  };

  return (
    (
        <form onSubmit={handleSubmit}  className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">ALTA DE PERSONAL</h1>
          <h2 className="text-3xl font-semibold mb-4 text-center text-blue-300">DATOS PERSONALES</h2>
          <div className="flex items-center gap-6 mb-4">
            <div className="w-40 h-40 bg-gray-300 rounded">
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
            </div>
            <div className="flex flex-col gap-4 w-full">
              <label className="flex flex-col gap-2">
                <span className="text-lg font-semibold">ENTIDAD EMPRESA</span>
                <select name="entidad" value={formState.entidad} onChange={handleInputChange} className="border rounded p-2">
                <option value="">Seleccione una entidad</option>
                <option value="Ejemplo, S.A.">Ejemplo, S.A.</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-lg font-semibold">CANDIDATO USUARIO</span>
                <select name="tipo_usuario" value={formState.tipo_usuario} onChange={handleInputChange} className="border rounded p-2">
                  <option value="externo">Externo  Evaluado</option>
                  <option value="interno">Interno  Usuario</option>
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
                <option value="Guatemala">Guatemala</option>
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
                <option value="Guatemala">Guatemala</option>
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
                <option value="Soltero">Soltero</option>
                <option value="Casado">Casado</option>
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-lg font-semibold">Género</span>
              <select
              name="genero_sexo" value={formState.genero_sexo} onChange={handleInputChange}
              className="border rounded p-2">
                <option value="Masculino">Masculino</option>
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
        </form>)
  );
}


function LockIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>)
  );
}


function ServerIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>)
  );
}


function FileQuestionIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <path
        d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2" />
      <path d="M12 17h.01" />
    </svg>)
  );
}


function FileIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>)
  );
}


function CopyrightIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9.354a4 4 0 1 0 0 5.292" />
    </svg>)
  );
}


function SettingsIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>)
  );
}
