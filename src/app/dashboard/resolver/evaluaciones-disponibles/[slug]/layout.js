'use client'
import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";


export default function Layout({children, params}) {

    const id_evaluacion = params.slug;
    const [tiempo, setTiempo] = useState(null);
    useEffect(() => {
        const fetchTiempo = async () => {
            try {
                const { data: session } = await supabase.auth.getSession();
                const userEmail = session.session.user.email;
                const { data: userData } = await supabase
                    .from("usuarios")
                    .select("usuario_id") // Solo seleccionamos el campo necesario
                    .eq("correo_electronico", userEmail)
                    .single();

                const usuario = userData.usuario_id;

                const { data: evaluationsData } = await supabase
                    .from("usuarios_evaluaciones")
                    .select('inicio_evaluacion')
                    .match({ id_evaluacion: id_evaluacion, usuarios_id: usuario }).single();
                setTiempo(evaluationsData.inicio_evaluacion);
            } catch (err) {
                console.error("Error:", err);
                setError(err.message);
            } 

        }

        fetchTiempo();
       
    }
    , []);



    return (
        <div>
        <div className="flex justify-between items-center p-4">
      <h1 className="text-lg font-semibold">Tiempo restante</h1>
      <div className="flex items-center gap-2">
        <span className="text-sm">{tiempo}</span>
      </div>
    </div>
            {children}
        </div>
    );
}

