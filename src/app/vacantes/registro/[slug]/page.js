"use client";
import { Notificacion } from "@/components/notification";
import { RegistroPublico } from "@/components/publico/registro-publico";
import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const id = params.slug;
const router = useRouter();
  const [direccion, setDireccion] = useState("");
  const [formState, setFormState] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo_electronico: "",
    password: "",
    fecha_nacimiento: "",
    numero_dpi: "",
    pais_origen: "",
  });
  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("direcciones_web")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.log(error);
      else setDireccion(data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormState = {
      ...formState,
      tipo_usuario: direccion.tipo_usuario,
    };

    // Insertar en Supabase
    const { data, error } = await supabase
      .from("usuarios")
      .upsert(updatedFormState)
      .select("*");

    supabase.auth.signUp({
      email: formState.correo_electronico,
      password: formState.password,
    });

    console.log(data);
    const usuario_id = data[0].usuario_id;

    if (error) {
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Vuelva a intentar mas tarde: " + error.message, // Ajusta según necesites
      });
    } else {
      if (usuario_id) {
        const { data, error } = await supabase
          .from("postulaciones")
          .insert([
            {
              id_vacante: direccion.id_vacante,
              usuario_id: usuario_id,
              id_direccion_web: id,
            },
          ]);

        if (error) {
          console.log(error);
        } else {
          if (direccion.evaluaciones_asignadas.length > 0) {
            for (const evaluacion of direccion.evaluaciones_asignadas) {
              const { id, nombre } = evaluacion;
              const { data, error } = await supabase
                .from("usuarios_evaluaciones")
                .insert([{ usuarios_id: usuario_id, id_evaluacion: id }]);
              if (error) {
                console.log(error);
              } else {
                console.log(`Éxito al insertar la evaluación ${nombre}`);
              }
            }
          }
        }

        setNotification({
          visible: true,
          titulo: "Éxito",
          mensaje: "Se ha creado su usuario", // Ajusta según necesites
        });
        
      }
    

      router.push(`/`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  return (
    <>
      <div>
        <RegistroPublico
          handleSubmit={handleSubmit}
          formState={formState}
          handleInputChange={handleInputChange}
        />
      </div>
      {notification.visible && (
        <Notificacion
          titulo={notification.titulo}
          mensaje={notification.mensaje}
          visible={notification.visible}
          onClose={handleCloseNotification}
        />
      )}
    </>
  );
}
