import AsignarEvaluacion from "@/components/evaluaciones/evaluacion/asignar-evaluacion";

export default function page({params}) {
    const slug = params.slug;
    return (
        <AsignarEvaluacion id_evaluacion={slug} />
    );
}

