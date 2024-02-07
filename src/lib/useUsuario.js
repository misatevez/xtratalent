import { usePermissions } from "@/lib/PermissionsContext";

const useUsuario = () => {
    const { usuario, tipo_usuario } = usePermissions();

    return {
        id_usuario: usuario,
        tipo_usuario: tipo_usuario,
    };
    
    
};

export default useUsuario;
