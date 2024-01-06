import AsignarTema from "@/components/evaluaciones/temas/asignar-tema";

export default function page( { params } ) {

    const { slug } = params; // Asume que tu ruta tiene un parámetro llamado 'slug'
    return (
        <div>
           <AsignarTema id_evaluacion={slug} />
        </div>
    );
}

