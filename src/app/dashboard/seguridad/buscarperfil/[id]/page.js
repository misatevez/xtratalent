import { PerfilesUsuario } from "@/components/seguridad/perfiles-usuario";

export default function page({params}) {
    const id  = params.id;
    return (
        <PerfilesUsuario perfilId={id} />
    );
}

