'use client'
import Link from "next/link"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from 'react';
import supabase from "@/lib/supabaseClient"
import FormRegistro from "./formRegistro"
import { Notificacion } from "../notification"
import usePermisosPersonal from "@/lib/usePermisosPersonal"
import  { verificarPermiso } from "../../lib/verificarPermisos"

export function RegistroInterno() {

  const permisos = usePermisosPersonal();

  const permisoDenegado = verificarPermiso(permisos.altaPersonal);

 


  // Estado inicial para el formulario
  const [formState, setFormState] = useState({
    password: '',
    id_entidad_empresa: '',
    tipo_usuario: '',
    correo_electronico: '',
    codigo_plaza_vacante: '',
    profesion_ocupacion: '',
    codigo_perfil_puesto: '',
    anos_experiencia: '',
    direccion_calle_avenida: '',
    direccion_colonia: '',
    direccion_zona: '',
    direccion_departamento: '',
    direccion_municipio: '',
    primer_nombre: '',
    segundo_nombre: '',
    apellido_materno: '',
    apellido_paterno: '',
    fecha_nacimiento: '',
    numero_dpi: '',
    numero_afiliacion_igss: '',
    numero_nit: '',
    lugar_nacimiento: '',
    pais_origen: '',
    estado_civil: '',
    genero_sexo: '',
    numero_pasaporte: '',
    telefono_casa: '',
    telefono_particular: '',
    telefono_movil_cel: '',
  });

  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });

   // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formState)

    // Insertar en Supabase
    const { data, error } = await supabase.from('usuarios').insert([formState]);


    supabase.auth.signUp({
      email: formState.correo_electronico,
      password: formState.password,
      options: {
        data: {
          first_name: 'John',
        },
      },
    });

    if (error) {
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Vuelva a intentar mas tarde: " + error.message // Ajusta según necesites
      });
    } else {
      setNotification({
        visible: true,
        titulo: "Éxito",
        mensaje: "Se ha creado su usuario" // Ajusta según necesites
      });
    }
  };

  const handleSelectChange = (value, fieldName) => {
    setFormState(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  if (permisoDenegado) {
    return permisoDenegado;
}

  return (
    (<>
      <FormRegistro 
      titulo={"Alta de usuarios"}
      formState={formState} 
      handleInputChange={handleInputChange} 
      handleSubmit={handleSubmit}
      handleSelectChange={handleSelectChange}
      />  

{notification.visible && (
        <Notificacion
          titulo={notification.titulo}
          mensaje={notification.mensaje}
          visible={notification.visible}
          onClose={handleCloseNotification}
        />
      )}

</>
      )
  );
}

