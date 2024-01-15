import { usePermissions } from "@/lib/PermissionsContext";

const usePermisosPersonal = () => {
    const { permissions } = usePermissions();
    const moduloPersonal = permissions.find(permiso => permiso.id_modulo === 1);

    return {
        altaPersonal: moduloPersonal?.permisos?.alta_personal,
        busquedaRapido: moduloPersonal?.permisos?.busqueda_rapido,
        eliminarUsuario: moduloPersonal?.permisos?.eliminar_usuario,
        modificarUsuario: moduloPersonal?.permisos?.modificar_usuario,
        asignarContrasenas: moduloPersonal?.permisos?.asignar_contraseñas,
    };
};

export default usePermisosPersonal;
