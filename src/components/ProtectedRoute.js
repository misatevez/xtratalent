'use client'
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation'; // Asegúrate de que la importación es correcta.

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true); // Nuevo estado para indicar si está comprobando el usuario

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error checking user:', error);
        setChecking(false);
      } else if (session && session.user) {
        console.log('User found: ', session.user);
        setUser(session.user); // Si hay una sesión y un usuario, establece el usuario
      } else {
        router.push('/login'); // Si no hay usuario, redirige a login
      }

      setChecking(false); // Finaliza la comprobación
    };

    checkUser();
  }, []);

  if (checking) {
    // Mientras está comprobando, puedes retornar null o un componente de carga
    return null; // o <LoadingComponent />
  }

  // Una vez completada la comprobación, renderiza los hijos si el usuario está presente
  return user ? <>{children}</> : null; // En caso de que el usuario no esté presente, no se renderiza nada o podrías redirigir o mostrar un mensaje.
};

export default ProtectedRoute;
