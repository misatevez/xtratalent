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
        areasDirecciones: moduloPersonal?.permisos?.areas_direcciones,
        editarSubentidades: moduloPersonal?.permisos?.editar_subentidades,
        editarDepartamentos: moduloPersonal?.permisos?.editar_departamentos,
        editarEntidadEmpresa: moduloPersonal?.permisos?.editar_entidad_empresa,
        editarAreasDirecciones: moduloPersonal?.permisos?.editar_areas_direcciones,
        editar_tipo_gc_subtipo: moduloPersonal?.permisos?.editar_tipo_gc_subtipo,
        tipo_gc_subtipo: moduloPersonal?.permisos?.tipo_gc_subtipo,
    };
    
};

export default usePermisosOrganizacion;
