import { usePermissions } from "@/lib/PermissionsContext";

const usePermisosMetricas = () => {
    const { permissions } = usePermissions();
    const moduloPersonal = permissions.find(permiso => permiso.id_modulo === 4);

    return {
        metricas: moduloPersonal?.permisos?.metricas
    };
    
};

export default usePermisosMetricas;
