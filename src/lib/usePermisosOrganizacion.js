import { usePermissions } from "@/lib/PermissionsContext";

const usePermisosOrganizacion = () => {
    const { permissions } = usePermissions();
    const moduloPersonal = permissions.find(permiso => permiso.id_modulo === 2);

    return {
        plazas: moduloPersonal?.permisos?.plazas,
        puestos: moduloPersonal?.permisos?.puestos,
        subentidades: moduloPersonal?.permisos?.subentidades,
        departamentos: moduloPersonal?.permisos?.departamentos,
        editarPlazas: moduloPersonal?.permisos?.editar_plazas,
        editarPuestos: moduloPersonal?.permisos?.editar_puestos,
        entidadEmpresa: moduloPersonal?.permisos?.entidad_empresa,
        subtipoEntidad: moduloPersonal?.permisos?.subtipo_entidad,
        areasDirecciones: moduloPersonal?.permisos?.areas_direcciones,
        grupoCorporativo: moduloPersonal?.permisos?.grupo_corporativo,
        editarSubentidades: moduloPersonal?.permisos?.editar_subentidades,
        editarDepartamentos: moduloPersonal?.permisos?.editar_departamentos,
        editarEntidadEmpresa: moduloPersonal?.permisos?.editar_entidad_empresa,
        editarSubtipoEntidad: moduloPersonal?.permisos?.editar_subtipo_entidad,
        tipoGrupoCorporativo: moduloPersonal?.permisos?.tipo_grupo_corporativo,
        editarAreasDirecciones: moduloPersonal?.permisos?.editar_areas_direcciones,
        editarGrupoCorporativo: moduloPersonal?.permisos?.editar_grupo_corporativo,
        editarTipoGrupoCorporativo: moduloPersonal?.permisos?.editar_tipo_grupo_corporativo,
    };
    
};

export default usePermisosOrganizacion;
