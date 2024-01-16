"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "../ui/checkbox";
import Volver from "../ui/volver";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { Notificacion } from "../notification";

export function PerfilesUsuario({ perfilId }) {

  const [notification, setNotification] = useState({
    titulo: "",
    mensaje: "",
    visible: false,
  });

  const [permisosSeguridad, setPermisosSeguridad] = useState({
    seguridad: false,
    crear_perfil_usuario: false,
    borrar_perfil_usuario: false,
    asignar_perfil_usuario: false,
    modificar_perfil_usuario: false,
  });
  const [
    permisosEstructuraOrganizacional,
    setPermisosEstructuraOrganizacional,
  ] = useState({
    plazas: false,
    puestos: false,
    subentidades: false,
    departamentos: false,
    editar_plazas: false,
    editar_puestos: false,
    entidad_empresa: false,
    tipo_gc_subtipo: false,
    areas_direcciones: false,
    editar_subentidades: false,
    editar_departamentos: false,
    editar_entidad_empresa: false,
    editar_tipo_gc_subtipo: false,
    editar_areas_direcciones: false,
  });
  const [permisosPersonal, setPermisosPersonal] = useState({
    alta_personal: false,
    eliminar_usuario: false,
    modificar_usuario: false,
    busqueda_rapido: false,
    asignar_contraseñas: false,
  });
  const [permisosEvaluaciones, setPermisosEvaluaciones] = useState({
    temas: false,
    familias: false,
    crear_tema: false,
    borrar_tema: false,
    editar_tema: false,
    subfamilias: false,
    evaluaciones: false,
    crear_familias: false,
    borrar_familias: false,
    editar_familias: false,
    crear_subfamilia: false,
    borrar_subfamilia: false,
    editar_subfamilia: false,
    crear_evaluaciones: false,
    borrar_evaluaciones: false,
    editar_evaluaciones: false,
    asignar_evaluaciones: false,
  });
  const [permisosMetricas, setPermisosMetricas] = useState({
    metricas: false,
  });

  useEffect(() => {
    const obtenerPermisosdePerfil = async () => {
      const { data, error } = await supabase
        .from("perfil_permisos")
        .select("*")
        .eq("id_perfil", perfilId);

      if (error) console.log(error);
      else {
        data.forEach((permiso) => {
          switch (permiso.id_modulo) {
            case 1:
              setPermisosPersonal(permiso.permisos);
              break;
            case 2:
              setPermisosEstructuraOrganizacional(permiso.permisos);
              break;
            case 3:
              setPermisosEvaluaciones(permiso.permisos);
              break;
            case 4:
              setPermisosMetricas(permiso.permisos);
              break;
            case 5:
              setPermisosSeguridad(permiso.permisos);
              break;
          }
        });
      }
    };
    obtenerPermisosdePerfil();
  }, [perfilId]);

  const handleCheckboxChange = (e, setFunction) => {
    const { id, checked } = e.target;
    console.log(`Cambiando ${id} a ${checked}`);
    setFunction((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Actualizar permisos de seguridad
      await supabase
        .from('perfil_permisos')
        .update({ permisos: permisosSeguridad })
        .eq('id_perfil', perfilId)
        .eq('id_modulo', 5); // Asegúrate de que el id_modulo sea correcto
  
      // Actualizar permisos de estructura organizacional
      await supabase
        .from('perfil_permisos')
        .update({ permisos: permisosEstructuraOrganizacional })
        .eq('id_perfil', perfilId)
        .eq('id_modulo', 2); // Asegúrate de que el id_modulo sea correcto
  
      // Actualizar permisos de personal
      await supabase
        .from('perfil_permisos')
        .update({ permisos: permisosPersonal })
        .eq('id_perfil', perfilId)
        .eq('id_modulo', 1); // Asegúrate de que el id_modulo sea correcto
  
      // Actualizar permisos de evaluaciones
      await supabase
        .from('perfil_permisos')
        .update({ permisos: permisosEvaluaciones })
        .eq('id_perfil', perfilId)
        .eq('id_modulo', 3); // Asegúrate de que el id_modulo sea correcto
  
      // Actualizar permisos de métricas
      await supabase
        .from('perfil_permisos')
        .update({ permisos: permisosMetricas })
        .eq('id_perfil', perfilId)
        .eq('id_modulo', 4); // Asegúrate de que el id_modulo sea correcto
  
      setNotification({
        titulo: "Permisos actualizados",
        mensaje: "Los permisos se han actualizado correctamente",
        visible: true,
      });
    } catch (error) {
      console.error('Error al actualizar permisos:', error);
      setNotification({
        titulo: "Error al actualizar permisos",
        mensaje: "No se han podido actualizar los permisos",
        visible: true,
      });
    }
  };
  
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };
  
  

  return (
    <>
    <div className="border rounded-lg mx-auto w-full max-w-5xl p-5  mt-10">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold m-2 p-2">Perfil de usuario</h2>
      </div>
      <div className="relative w-full overflow-auto m-2">
        <h3 className="text-lg font-semibold m-2">Modulos de sistema</h3>
        <Table>
          <TableHeader className="m-2 p-2">
            <TableRow>
              <TableHead className="w-[200px] m-2 p-2">
                Seguridad y acceso
              </TableHead>
              <TableHead className="w-[100px] m-2 p-2">Acceso</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="m-2 p-2">
            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Acceso a seguridad</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="seguridad"
                  checked={permisosSeguridad["seguridad"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosSeguridad)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Crear perfil de usuario</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="crear_perfil_usuario"
                  checked={permisosSeguridad["crear_perfil_usuario"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosSeguridad)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Borrar perfil de usuario</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="borrar_perfil_usuario"
                  checked={permisosSeguridad["borrar_perfil_usuario"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosSeguridad)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Asignar perfil de usuario</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="asignar_perfil_usuario"
                  checked={permisosSeguridad["asignar_perfil_usuario"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosSeguridad)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Modificación de perfil de usuario</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="modificar_perfil_usuario"
                  checked={permisosSeguridad["modificar_perfil_usuario"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosSeguridad)
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader className="m-2 p-2">
            <TableRow>
              <TableHead className="w-[200px] m-2 p-2">
                Estructura Organizacional
              </TableHead>
              <TableHead className="w-[100px] m-2 p-2">Acceso</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="m-2 p-2">
            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>
                  Acceso a Tipos de Grupo Corporativo - Grupos Corporativos -
                  Subtipos
                </p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="tipo_gc_subtipo"
                  checked={permisosEstructuraOrganizacional["tipo_gc_subtipo"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEstructuraOrganizacional)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>
                  Editar Tipos de Grupo Corporativo - Grupos Corporativos -
                  Subtipos
                </p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="editar_tipo_gc_subtipo"
                  checked={
                    permisosEstructuraOrganizacional["editar_tipo_gc_subtipo"]
                  }
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEstructuraOrganizacional)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Acceso a Entidades empresas</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="entidad_empresa"
                  checked={permisosEstructuraOrganizacional["entidad_empresa"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEstructuraOrganizacional)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Editar Entidades empresas</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="editar_entidad_empresa"
                  checked={
                    permisosEstructuraOrganizacional["editar_entidad_empresa"]
                  }
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEstructuraOrganizacional)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Acceso Subentidades</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="subentidades"
                  checked={permisosEstructuraOrganizacional["subentidades"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEstructuraOrganizacional)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Editar Subentidades</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="editar_subentidades"
                  checked={
                    permisosEstructuraOrganizacional["editar_subentidades"]
                  }
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEstructuraOrganizacional)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Acceso a Áreas - Direcciones</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="areas_direcciones"
                  checked={
                    permisosEstructuraOrganizacional["areas_direcciones"]
                  }
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEstructuraOrganizacional)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Editar Áreas - Direcciones</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="editar_areas_direcciones"
                  checked={
                    permisosEstructuraOrganizacional["editar_areas_direcciones"]
                  }
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEstructuraOrganizacional)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Acceso a Departamentos</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="departamentos"
                  checked={permisosEstructuraOrganizacional["departamentos"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEstructuraOrganizacional)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Editar Departamentos</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="editar_departamentos"
                  checked={
                    permisosEstructuraOrganizacional["editar_departamentos"]
                  }
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEstructuraOrganizacional)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Acceso a Puestos</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="puestos"
                  checked={permisosEstructuraOrganizacional["puestos"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEstructuraOrganizacional)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Editar Puestos</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="editar_puestos"
                  checked={permisosEstructuraOrganizacional["editar_puestos"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEstructuraOrganizacional)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Acceso a Vacantes</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="plazas"
                  checked={permisosEstructuraOrganizacional["plazas"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEstructuraOrganizacional)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Editar Vacantes</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="editar_plazas"
                  checked={permisosEstructuraOrganizacional["editar_plazas"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEstructuraOrganizacional)
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader className="m-2 p-2">
            <TableRow>
              <TableHead className="w-[200px] m-2 p-2">Personal</TableHead>
              <TableHead className="w-[100px] m-2 p-2">Acceso</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="m-2 p-2">
            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Alta usuario</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="alta_personal"
                  checked={permisosPersonal["alta_personal"]}
                  onChange={(e) => handleCheckboxChange(e, setPermisosPersonal)}
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Borrar usuario</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="eliminar_usuario"
                  checked={permisosPersonal["eliminar_usuario"]}
                  onChange={(e) => handleCheckboxChange(e, setPermisosPersonal)}
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Modificación usuario</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="modificar_usuario"
                  checked={permisosPersonal["modificar_usuario"]}
                  onChange={(e) => handleCheckboxChange(e, setPermisosPersonal)}
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Busqueda rapida</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="busqueda_rapido"
                  checked={permisosPersonal["busqueda_rapido"]}
                  onChange={(e) => handleCheckboxChange(e, setPermisosPersonal)}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader className="m-2 p-2">
            <TableRow>
              <TableHead className="w-[200px] m-2 p-2">Evaluaciones</TableHead>
              <TableHead className="w-[100px] m-2 p-2">Acceso</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="m-2 p-2">
            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Acceso a evaluaciones</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="evaluaciones"
                  checked={permisosEvaluaciones["evaluaciones"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Crear evaluaciones</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="crear_evaluaciones"
                  checked={permisosEvaluaciones["crear_evaluaciones"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Edicion de evaluaciones</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="editar_evaluaciones"
                  checked={permisosEvaluaciones["editar_evaluaciones"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Borrar evaluaciones</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="borrar_evaluaciones"
                  checked={permisosEvaluaciones["borrar_evaluaciones"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Asignar evaluaciones</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="asignar_evaluaciones"
                  checked={permisosEvaluaciones["asignar_evaluaciones"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader className="m-2 p-2">
            <TableRow>
              <TableHead className="w-[200px] m-2 p-2">Familias</TableHead>
              <TableHead className="w-[100px] m-2 p-2">Acceso</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="m-2 p-2">
            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Acceso a familias</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="familias"
                  checked={permisosEvaluaciones["familias"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Crear familias</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="crear_familias"
                  checked={permisosEvaluaciones["crear_familias"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Editar familias</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="editar_familias"
                  checked={permisosEvaluaciones["editar_familias"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Borrar familias</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="borrar_familias"
                  checked={permisosEvaluaciones["borrar_familias"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader className="m-2 p-2">
            <TableRow>
              <TableHead className="w-[200px] m-2 p-2">Subfamilias</TableHead>
              <TableHead className="w-[100px] m-2 p-2">Acceso</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="m-2 p-2">
            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Acceso a subfamilias</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="subfamilias"
                  checked={permisosEvaluaciones["subfamilias"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Crear subfamilias</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="crear_subfamilia"
                  checked={permisosEvaluaciones["crear_subfamilia"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Editar subfamilias</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="editar_subfamilia"
                  checked={permisosEvaluaciones["editar_subfamilia"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Borrar subfamilias</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="borrar_subfamilia"
                  checked={permisosEvaluaciones["borrar_subfamilia"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table>
          <TableHeader className="m-2 p-2">
            <TableRow>
              <TableHead className="w-[200px] m-2 p-2">Temas</TableHead>
              <TableHead className="w-[100px] m-2 p-2">Acceso</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="m-2 p-2">
            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Acceso a temas</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="temas"
                  checked={permisosEvaluaciones["temas"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Crear temas</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="crear_tema"
                  checked={permisosEvaluaciones["crear_tema"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Editar temas</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="editar_tema"
                  checked={permisosEvaluaciones["editar_tema"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Borrar temas</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="borrar_tema"
                  checked={permisosEvaluaciones["borrar_tema"]}
                  onChange={(e) =>
                    handleCheckboxChange(e, setPermisosEvaluaciones)
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader className="m-2 p-2">
            <TableRow>
              <TableHead className="w-[200px] m-2 p-2">Metricas</TableHead>
              <TableHead className="w-[100px] m-2 p-2">Acceso</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="m-2 p-2">
            <TableRow className="m-2 p-2">
              <TableCell className="m-2 p-2">
                <p>Acceso a metricas</p>
              </TableCell>
              <TableCell className="m-2 p-2">
                <Checkbox
                  id="metricas"
                  checked={permisosMetricas["metricas"]}
                  onChange={(e) => handleCheckboxChange(e, setPermisosMetricas)}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between m-2 p-2">
        <button
        onClick={handleSubmit}
        className="bg-black text-white rounded-lg px-4 py-2 mt-4">
          Guardar
        </button>
        <Volver />
      </div>
    </div>

{notification.visible && (
  <Notificacion
    titulo={notification.titulo}
    mensaje={notification.mensaje}
    visible={notification.visible}
    onClose={handleCloseNotification}
  />
)}
</>
  );
}
