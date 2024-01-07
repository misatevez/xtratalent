import EditarEvaluacion from "@/components/evaluaciones/evaluacion/editar-evaluacion";

export default function page({params}) {
    const slug = params.slug;
    return (
        <EditarEvaluacion id_evaluacion={slug} />
    );
}

