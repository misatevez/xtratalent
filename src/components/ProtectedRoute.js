'use client'
// ProtectedRoute.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PermissionsProvider } from './PermissionsContext';
import supabase from '@/lib/supabaseClient';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error checking user:', error);
        setChecking(false);
      } else if (session && session.user) {
        // Obtener el email del usuario autenticado
        const userEmail = session.user.email;

        // Buscar en la tabla de usuarios usando el email
        const { data: userData, error: userError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('correo_electronico', userEmail)
          .single(); // Esperamos obtener un solo resultado, ya que el email debería ser único

        if (userError) {
          console.error('Error fetching user data:', userError);
          setChecking(false);
          return;
        }

        // Asignar los datos del usuario al estado
        setUser(userData);
      } else {
        router.push('/login');
      }

      setChecking(false);
    };

    checkUser();
  }, []);

  if (checking) {
    return null;
  }

  return user ? (
    <PermissionsProvider user={user}>
      {children}
    </PermissionsProvider>
  ) : null;
};

export default ProtectedRoute;
