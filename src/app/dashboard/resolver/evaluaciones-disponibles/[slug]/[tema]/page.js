'use client'
import { Button } from "@/components/ui/button";
import Volver from "@/components/ui/volver";
import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const id_tema = params.tema;
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState([]);
    const [preguntaActualIndex, setPreguntaActualIndex] = useState(0);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
    const [mensajeRespuesta, setMensajeRespuesta] = useState(null);
    const [nohaymaspreguntas, setNohaymaspreguntas] = useState(false);

    useEffect(() => {
        const obtenerPreguntas = async () => {
            try {
                const { data: preguntasData, error } = await supabase
                    .from('preguntas')
                    .select('*')
                    .eq('id_tema', id_tema);

                if (error) throw error;

                setPreguntas(preguntasData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        obtenerPreguntas();
    }, [id_tema]);

    useEffect(() => {
        const obtenerRespuestasParaPreguntaActual = async () => {
            if (preguntas.length > 0 && preguntaActualIndex < preguntas.length) {
                console.log('Obteniendo respuestas para la pregunta actual...');
                try {
                    const preguntaActualId = preguntas[preguntaActualIndex].id_pregunta;
                    console.log('Pregunta actual ID:', preguntaActualId);
                    const { data: respuestasData, error } = await supabase
                        .from('respuestas')
                        .select('*')
                        .eq('id_pregunta', preguntaActualId);

                    if (error) throw error;
                    console.log('Respuestas:', respuestasData)
                    setRespuestas(respuestasData);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        obtenerRespuestasParaPreguntaActual();
    }, [preguntaActualIndex, preguntas]);

    const handleSiguientePregunta = () => {
        if (preguntaActualIndex < preguntas.length - 1) {
            setPreguntaActualIndex(preguntaActualIndex + 1);
            setRespuestaSeleccionada(null); // Reiniciar la respuesta seleccionada para la siguiente pregunta
        } else {
            setNohaymaspreguntas(true);
            setMensajeRespuesta('No hay más preguntas');

        }
    };

    const guardarRespuestaUsuario = async () => {
        try {
            const { error } = await supabase
                .from('usuario_evaluacion_respuesta')
                .insert([
                    { 
                        usuario_id: 25,
                        id_evaluacion: 22,
                        id_pregunta: preguntas[preguntaActualIndex].id_pregunta,
                        id_respuesta: respuestaSeleccionada
                    }
                ]);

            if (error) throw error;

            handleSiguientePregunta();
        } catch (error) {
            console.error('Error guardando respuesta:', error);
        }
    };

    return (
        <div className="p-4 mx-auto w-full max-w-6xl mt-4">
        <div className="rounded-lg shadow-lg">
          <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
            <h1 className="text-2xl font-medium mb-2">
              Preguntas:
            </h1>
            {preguntas.length > 0 && (
                <div>
                    <p className=" text-lg font-medium mb-2">{preguntas[preguntaActualIndex].pregunta}</p>
                    <p className=" text-lg font-medium mb-2">Respuestas:</p>
                    <ul>
                        {respuestas.map((respuesta, index) => (
                            <li key={index}>
                                <input
                                className="focus:ring-black h-4 w-4 text-black border-gay-300"
                                    type="radio"
                                    name="respuesta"
                                    id={respuesta.id_respuesta}
                                    checked={respuestaSeleccionada === respuesta.id_respuesta}
                                    onChange={() => setRespuestaSeleccionada(respuesta.id_respuesta)}
                                />
                                <label htmlFor={respuesta.id_respuesta}> {respuesta.descripcion}</label>
                                <button onClick={() => setRespuestaSeleccionada(respuesta.id_respuesta)}>
                                    {respuesta.texto_respuesta}
                                </button>
                               
                            </li>

                        )
                        )}
                        



                    </ul>
                    <Button className="mt-4" onClick={guardarRespuestaUsuario} disabled={!respuestaSeleccionada}>
                        Guardar Respuesta
                    </Button>
                    {
    nohaymaspreguntas ? (
        <>
           
            <Volver />
            <p className="text-lg font-light mt-4" >{mensajeRespuesta}</p>
        </>
    ) : null
}
                </div>
            )}




</div>
</div>
        </div>
    );
}
