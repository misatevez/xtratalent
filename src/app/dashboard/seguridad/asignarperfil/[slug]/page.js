import AsignarPerfil from "@/components/seguridad/asignar-perfil";

export default function page({params}) {
    const id_perfil = params.slug;
    return (
        <AsignarPerfil id_perfil={id_perfil}/>
    );
}

