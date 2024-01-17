'use client'
import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";


export default function Layout({children, params}) {

    const id_evaluacion = params.slug;
    const [tiempo, setTiempo] = useState({
        inicio_evaluacion: 0,
        evaluaciones: {
            duracion: 0
        }
    });

    const [tiempoRestante, setTiempoRestante] = useState('');

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
    .select(`
        inicio_evaluacion,
        evaluaciones:id_evaluacion (
            duracion
        )
    `)
    .match({ id_evaluacion: id_evaluacion, usuarios_id: usuario })
    .single();
                setTiempo(evaluationsData);
                console.log(evaluationsData);
            } catch (err) {
                console.error("Error:", err);
                setError(err.message);
            } 

        }

        fetchTiempo();
       
    }
    , []);

    useEffect(() => {
        const calcularTiempoRestante = () => {
            if (!tiempo.inicio_evaluacion || !tiempo.evaluaciones.duracion) {
                return;
            }
    
            const ahora = new Date();
            const inicioEvaluacion = new Date(tiempo.inicio_evaluacion);
            const finEvaluacion = new Date(inicioEvaluacion);
            finEvaluacion.setMinutes(finEvaluacion.getMinutes() + tiempo.evaluaciones.duracion);
    
            const diferencia = finEvaluacion - ahora;
    
            if (diferencia > 0) {
                const totalMinutos = Math.floor(diferencia / 1000 / 60);
                const minutos = totalMinutos % 60;
                const segundos = Math.floor((diferencia / 1000) % 60);
                setTiempoRestante(`${totalMinutos} min ${segundos} seg`);
            } else {
                clearInterval(intervalo);
                setTiempoRestante('Tiempo agotado');
            }
        };
    
        let intervalo;
        if (tiempo.inicio_evaluacion && tiempo.evaluaciones.duracion) {
            intervalo = setInterval(calcularTiempoRestante, 1000);
        }
    
        return () => {
            if (intervalo) {
                clearInterval(intervalo);
            }
        };
    }, [tiempo.inicio_evaluacion, tiempo.evaluaciones.duracion]);
    
    

    return (
        <div>
        <div className="flex justify-between items-center p-4">
      <h1 className="text-lg font-semibold">Tiempo restante</h1>
      <div className="flex items-center gap-2">
        <span className="text-sm">{tiempoRestante}</span>
      </div>
    </div>
            {children}
        </div>
    );
}

