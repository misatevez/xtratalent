import { usePermissions } from "@/lib/PermissionsContext";

const usePermisosSeguridad = () => {
    const { permissions } = usePermissions();
    const moduloPersonal = permissions.find(permiso => permiso.id_modulo === 5);

    return {
        seguridad: moduloPersonal?.permisos?.seguridad,
        crearPerfilUsuario: moduloPersonal?.permisos?.crear_perfil_usuario,
        borrarPerfilUsuario: moduloPersonal?.permisos?.borrar_perfil_usuario,
        asignarPerfilUsuario: moduloPersonal?.permisos?.asignar_perfil_usuario,
        modificarPerfilUsuario: moduloPersonal?.permisos?.modificar_perfil_usuario
    };
    
    
};

export default usePermisosSeguridad;
