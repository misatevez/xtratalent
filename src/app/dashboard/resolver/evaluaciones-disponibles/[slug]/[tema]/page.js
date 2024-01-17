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
    const [respuestasUsuario, setRespuestasUsuario] = useState([]);

    useEffect(() => {
        const obtenerPreguntasYRespuestas = async () => {
            try {
                // Obtener las preguntas respondidas por el usuario
                const { data: respuestasUsuarioData, error: respuestasUsuarioError } = await supabase
                    .from('usuario_evaluacion_respuesta')
                    .select('id_pregunta')
                    .eq('usuario_id', 25); // Reemplaza 25 con el ID real del usuario

                if (respuestasUsuarioError) throw respuestasUsuarioError;

                const preguntasRespondidas = respuestasUsuarioData.map(respuesta => respuesta.id_pregunta);

                // Obtener todas las preguntas del tema
                const { data: preguntasData, error: preguntasError } = await supabase
                    .from('preguntas')
                    .select('*')
                    .eq('id_tema', id_tema);

                if (preguntasError) throw preguntasError;

                // Filtrar las preguntas revisables y no revisables
                const preguntasRevisables = preguntasData.filter(pregunta => pregunta.revisable === true);
                const preguntasNoRevisables = preguntasData.filter(pregunta => pregunta.revisable === false);

                // Combinar las preguntas primero "revisables" y luego "no revisables"
                const preguntasCombinadas = [...preguntasRevisables, ...preguntasNoRevisables];

                // Filtrar las preguntas que el usuario ya ha respondido
                const preguntasNoRespondidas = preguntasCombinadas.filter(pregunta => {
                    return !preguntasRespondidas.includes(pregunta.id_pregunta);
                });

                setPreguntas(preguntasNoRespondidas);

            } catch (error) {
                console.error('Error:', error);
            }
        };

        obtenerPreguntasYRespuestas();
    }, [id_tema]);

    useEffect(() => {
        const obtenerRespuestasParaPreguntaActual = async () => {
            if (preguntas.length > 0 && preguntaActualIndex < preguntas.length) {
                console.log('Obteniendo respuestas para la pregunta actual...');
                try {
                    const preguntaActualId = preguntas[preguntaActualIndex].id_pregunta;
                    console.log('Pregunta actual ID:', preguntaActualId);

                    // Verificar si el usuario ya ha respondido esta pregunta en la tabla de respuestas
                    const { data: respuestasData, error } = await supabase
                        .from('usuario_evaluacion_respuesta')
                        .select('*')
                        .eq('id_pregunta', preguntaActualId)
                        .eq('usuario_id', 25); // Reemplaza 25 con el ID real del usuario

                    if (error) throw error;

                    if (respuestasData.length > 0) {
                        // La pregunta ya ha sido respondida por el usuario
                        setRespuestasUsuario([...respuestasUsuario, ...respuestasData]);
                        handleSiguientePregunta(); // Avanza a la siguiente pregunta
                    } else {
                        // La pregunta aún no ha sido respondida por el usuario, obtener respuestas normales
                        const { data: respuestasData, error } = await supabase
                            .from('respuestas')
                            .select('*')
                            .eq('id_pregunta', preguntaActualId);

                        if (error) throw error;
                        console.log('Respuestas:', respuestasData)
                        setRespuestas(respuestasData);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        obtenerRespuestasParaPreguntaActual();
    }, [preguntaActualIndex, preguntas, respuestasUsuario]);

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
            // Verificar si el usuario ya ha respondido esta pregunta
            const preguntaActualId = preguntas[preguntaActualIndex].id_pregunta;
            const usuarioId = 25; // Reemplaza 25 con el ID real del usuario
            const { data: respuestasExistentes, error: consultaError } = await supabase
                .from('usuario_evaluacion_respuesta')
                .select('*')
                .eq('id_pregunta', preguntaActualId)
                .eq('usuario_id', usuarioId);

            if (consultaError) throw consultaError;

            if (respuestasExistentes.length === 0) {
                // El usuario aún no ha respondido esta pregunta, puedes guardar la respuesta
                const { error: guardarError } = await supabase
                    .from('usuario_evaluacion_respuesta')
                    .insert([
                        { 
                            usuario_id: usuarioId,
                            id_evaluacion: 22,
                            id_pregunta: preguntaActualId,
                            id_respuesta: respuestaSeleccionada
                        }
                    ]);

                if (guardarError) throw guardarError;

                handleSiguientePregunta();
            } else {
                // El usuario ya ha respondido esta pregunta, puedes mostrar un mensaje o tomar la acción adecuada
                console.log('El usuario ya ha respondido esta pregunta');
                // Aquí puedes mostrar un mensaje al usuario o realizar la acción que desees.
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-4 mx-auto w-full max-w-6xl mt-4">
            <div className="rounded-lg shadow-lg">
                <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
                    <h1 className="text-2xl font-medium mb-2">Preguntas:</h1>
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
                                ))}
                            </ul>
                            <Button className="mt-4" onClick={guardarRespuestaUsuario} disabled={!respuestaSeleccionada}>
                                Guardar Respuesta
                            </Button>
                            {nohaymaspreguntas ? (
                                <>
                                    <Volver />
                                    <p className="text-lg font-light mt-4">{mensajeRespuesta}</p>
                                </>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
