import EditarTema from "@/components/evaluaciones/temas/editar-tema";

export default function page({params}) {
    const slug = params.slug;
    return (
        <EditarTema id_tema={slug} />
    );
}

