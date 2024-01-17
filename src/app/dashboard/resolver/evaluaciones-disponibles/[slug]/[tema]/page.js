'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Volver from "@/components/ui/volver";
import supabase from "@/lib/supabaseClient";
import { Label } from "@/components/ui/label";
import useUsuario from "@/lib/useUsuario";

export default function Page({ params }) {
    const id_tema = params.tema;
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState([]);
    const [preguntaActualIndex, setPreguntaActualIndex] = useState(0);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
    const [mensajeRespuesta, setMensajeRespuesta] = useState(null);
    const [nohaymaspreguntas, setNohaymaspreguntas] = useState(false);
    const [respuestasUsuario, setRespuestasUsuario] = useState([]);
    const {id_usuario} = useUsuario();
    const id_evaluacion = params.slug;

    useEffect(() => {
        const obtenerPreguntasYRespuestas = async () => {
            try {
                const { data: respuestasUsuarioData, error: respuestasUsuarioError } = await supabase
                    .from('usuario_evaluacion_respuesta')
                    .select('id_pregunta')
                    .eq('usuario_id', id_usuario);

                if (respuestasUsuarioError) throw respuestasUsuarioError;

                const preguntasRespondidas = respuestasUsuarioData.map(respuesta => respuesta.id_pregunta);

                const { data: preguntasData, error: preguntasError } = await supabase
                    .from('preguntas')
                    .select('*')
                    .eq('id_tema', id_tema);

                if (preguntasError) throw preguntasError;

                const preguntasRevisables = preguntasData.filter(pregunta => pregunta.revisable === true);
                const preguntasNoRevisables = preguntasData.filter(pregunta => pregunta.revisable === false);
                const preguntasCombinadas = [...preguntasRevisables, ...preguntasNoRevisables];
                setPreguntas(preguntasCombinadas);

            } catch (error) {
                console.error('Error:', error);
            }
        };

        obtenerPreguntasYRespuestas();
    }, [id_tema]);

    useEffect(() => {
        const obtenerRespuestasParaPreguntaActual = async () => {
            if (preguntas.length > 0 && preguntaActualIndex < preguntas.length) {
                try {
                    const preguntaActualId = preguntas[preguntaActualIndex].id_pregunta;

                    const { data: respuestasData, error } = await supabase
                        .from('respuestas')
                        .select('*')
                        .eq('id_pregunta', preguntaActualId);

                    if (error) throw error;
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
            setRespuestaSeleccionada(null);
        } else {
            setNohaymaspreguntas(true);
            setMensajeRespuesta('No hay más preguntas');
        }
    };

    const guardarOActualizarRespuestaUsuario = async () => {
        try {
            const preguntaActual = preguntas[preguntaActualIndex];
    
            // Verificar si el usuario ya ha respondido esta pregunta
            const { data: respuestasExistentes, error: consultaError } = await supabase
                .from('usuario_evaluacion_respuesta')
                .select('*')
                .eq('id_pregunta', preguntaActual.id_pregunta)
                .eq('usuario_id', id_usuario);
    
            if (consultaError) throw consultaError;
    
            if (respuestasExistentes.length > 0) {
                // Si la pregunta es revisable, actualizar la respuesta
                if (preguntaActual.revisable) {
                    const { error: actualizarError } = await supabase
                        .from('usuario_evaluacion_respuesta')
                        .update({ id_respuesta: respuestaSeleccionada })
                        .eq('id_pregunta', preguntaActual.id_pregunta)
                        .eq('usuario_id', id_usuario);
    
                    if (actualizarError) throw actualizarError;
    
                    console.log('Respuesta actualizada');
                } else {
                    console.log('El usuario ya ha respondido esta pregunta y no es revisable');
                }
            } else {
                // Guardar la nueva respuesta
                const { error: guardarError } = await supabase
                    .from('usuario_evaluacion_respuesta')
                    .insert([
                        {
                            usuario_id: usuario_id,
                            id_evaluacion: id_evaluacion,
                            id_pregunta: preguntaActual.id_pregunta,
                            id_respuesta: respuestaSeleccionada
                        }
                    ]);
    
                if (guardarError) throw guardarError;
    
                console.log('Respuesta guardada');
            }
    
            handleSiguientePregunta();
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
                            <p className="text-lg font-medium mb-2">{preguntas[preguntaActualIndex].pregunta}  </p>
                            <Label> {preguntas[preguntaActualIndex].revisable ? "Revisable" : "No Revisable"}</Label>
                            <p className="text-lg font-medium my-2">Respuestas:</p>
                            <ul>
                                {respuestas.map((respuesta, index) => (
                                    <li key={index}>
                                        <input
                                            className="focus:ring-black h-4 w-4 text-black border-gray-300"
                                            type="radio"
                                            name="respuesta"
                                            id={respuesta.id_respuesta}
                                            checked={respuestaSeleccionada === respuesta.id_respuesta}
                                            onChange={() => setRespuestaSeleccionada(respuesta.id_respuesta)}
                                        />
                                        <label htmlFor={respuesta.id_respuesta}> {respuesta.descripcion}</label>
                                    </li>
                                ))}
                            </ul>
                            <Button className="mt-4" onClick={guardarOActualizarRespuestaUsuario} disabled={!respuestaSeleccionada || !preguntas[preguntaActualIndex].revisable }>
                                Guardar Respuesta
                            </Button>
                            <Button className="mx-4 mt-4" onClick={handleSiguientePregunta} >
                                Siguiente Pregunta
                            </Button>
                            {nohaymaspreguntas ? (
                                <>
                                    <p className="text-lg font-medium my-2">Tema Finalizado</p>
                                    <Volver />
                                
                                </>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
