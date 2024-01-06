import AsignarRespuestas from "@/components/evaluaciones/evaluacion/respuestas/asignar-respuesta";

export default function page( {params} ) {
    const {slug} = params;
    return (
        <AsignarRespuestas id_pregunta={slug} />
    );
}
