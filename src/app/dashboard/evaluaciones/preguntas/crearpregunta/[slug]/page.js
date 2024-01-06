import AsignarPregunta from "@/components/evaluaciones/preguntas/asignar-preguntas";


export default function page( { params } ) {

    const { slug } = params; // Asume que tu ruta tiene un parámetro llamado 'slug'
    return (
        <div>
           <AsignarPregunta id_tema={slug} />
        </div>
    );
}

