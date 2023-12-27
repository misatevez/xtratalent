'use client'
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient"; // Asegúrate de que esta ruta sea correcta para tu cliente Supabase
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verifica si 'usuario_id' está presente antes de intentar la carga
    if (params.slug) {
      // Función para obtener los detalles del usuario
      async function fetchUserDetails() {
        const { data, error } = await supabase
          .from('usuarios') // Asume que tu tabla se llama 'usuarios'
          .select('*')
          .eq('usuario_id', params.slug) // Asume que 'id' es la columna del ID del usuario en Supabase
          .single(); // Obtiene un solo resultado

        if (error) {
          console.error("Error fetching user details: ", error);
          // Manejar error, posiblemente actualizar el estado para mostrar un mensaje de error
        } else {
          setUserDetails(data);
        }
        setLoading(false);
      }

      fetchUserDetails();
    }
  }, [params.slug]); // Vuelve a ejecutar este efecto si 'usuario_id' cambia

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return <div>No user details found or there was an error fetching them.</div>;
  }

  // Renderiza los detalles del usuario
  return (
    <div>
      <h1>Detalles del Usuario</h1>
      <p>ID: {userDetails.usuario_id}</p>
      <p>Nombre: {userDetails.primer_nombre} {userDetails.apellido_paterno}</p>
      {/* Agrega más detalles que quieras mostrar */}
    </div>
  );
}
