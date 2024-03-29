'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';

export const PermissionsContext = createContext();

export const usePermissions = () => useContext(PermissionsContext); // Correcto


export const PermissionsProvider = ({ children, user }) => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [tipo_usuario, setTipoUsuario] = useState(null);
  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const tipo_usuario = user?.tipo_usuario;
        setTipoUsuario(tipo_usuario);
        const userId = user?.usuario_id;
        setUsuario(userId);

        if (!userId) {
          console.log('No hay usuario');
          return;
        }

        const { data: perfilData, error: perfilError } = await supabase
          .from('perfiles_usuario')
          .select('*')
          .eq('id_usuario', userId);

        if (perfilError) {
          throw new Error(`Error al cargar perfiles de usuario: ${perfilError.message}`);
        }

        if (perfilData.length > 0) {
          console.log(perfilData);
          const idPerfil = perfilData[0].id_perfil;
          const { data, error } = await supabase
            .from('perfil_permisos')
            .select('*')
            .eq('id_perfil', idPerfil);

          if (error) {
            throw new Error(`Error al cargar permisos: ${error.message}`);
          }

          const newPermissions = data.map((perm) => ({
            id_modulo: perm.id_modulo,
            id_permisos: perm.id_permisos,
            id_perfil: perm.id_perfil,
            permisos: perm.permisos
          }));
          setPermissions(newPermissions);
          console.log('Permisos cargados');
        }
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPermissions();
  }, [user]);

  return (
    <PermissionsContext.Provider value={{ permissions, usuario, tipo_usuario }}>
      {children}
    </PermissionsContext.Provider>
  );
};
