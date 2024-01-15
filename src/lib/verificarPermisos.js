import Volver from "./ui/volver";

// en un archivo de utilidades, por ejemplo, permisosUtil.js
export const verificarPermiso = (tienePermiso) => {
    if (!tienePermiso) {
        return (
            <div className="grid grid-cols-1 max-w-lg m-auto alert alert-danger">
                <strong>No tienes permiso para acceder a esta página.</strong>
                <Volver />
            </div>
        );
    }

    return null;
};
