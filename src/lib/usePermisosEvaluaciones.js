import { usePermissions } from "@/lib/PermissionsContext";

const usePermisosEvaluaciones = () => {
    const { permissions } = usePermissions();
    const moduloPersonal = permissions.find(permiso => permiso.id_modulo === 3);

    return {
        temas: moduloPersonal?.permisos?.temas,
    familias: moduloPersonal?.permisos?.familias,
    crearTema: moduloPersonal?.permisos?.crear_tema,
    borrarTema: moduloPersonal?.permisos?.borrar_tema,
    editarTema: moduloPersonal?.permisos?.editar_tema,
    subfamilias: moduloPersonal?.permisos?.subfamilias,
    evaluaciones: moduloPersonal?.permisos?.evaluaciones,
    crearFamilias: moduloPersonal?.permisos?.crear_familias,
    borrarFamilias: moduloPersonal?.permisos?.borrar_familias,
    editarFamilias: moduloPersonal?.permisos?.editar_familias,
    crearSubfamilia: moduloPersonal?.permisos?.crear_subfamilia,
    borrarSubfamilia: moduloPersonal?.permisos?.borrar_subfamilia,
    editarSubfamilia: moduloPersonal?.permisos?.editar_subfamilia,
    crearEvaluaciones: moduloPersonal?.permisos?.crear_evaluaciones,
    borrarEvaluaciones: moduloPersonal?.permisos?.borrar_evaluaciones,
    editarEvaluaciones: moduloPersonal?.permisos?.editar_evaluaciones,
    asignarEvaluaciones: moduloPersonal?.permisos?.asignar_evaluaciones
    };
    
};

export default usePermisosEvaluaciones;
