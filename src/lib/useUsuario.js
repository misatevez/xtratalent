import { usePermissions } from "@/lib/PermissionsContext";

const useUsuario = () => {
    const { usuario } = usePermissions();

    return {
        id_usuario: usuario,
    };
    
    
};

export default useUsuario;
