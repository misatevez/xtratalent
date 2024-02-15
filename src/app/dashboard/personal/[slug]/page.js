'use client'
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient"; // Asegúrate de que esta ruta sea correcta para tu cliente Supabase
import { useRouter } from "next/navigation";
import FormRegistro from "@/components/personal/formRegistro";
import { Notificacion } from "@/components/notification";
import usePermisosPersonal from "@/lib/usePermisosPersonal";
import { verificarPermiso } from "@/lib/verificarPermisos";

export default function Page({ params }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { slug } = params; // Asume que tu ruta tiene un parámetro llamado 'slug'
  const permisos = usePermisosPersonal();

  const permisoDenegado = verificarPermiso(permisos.modificarUsuario);

  

  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (slug) {
        setLoading(true);
        const { data, error } = await supabase
          .from('usuarios')
          .select('*')
          .eq('usuario_id', slug)
          .single();

        if (error) {
          console.error("Error fetching user details: ", error);
        } else {
          console.log("User details fetched successfully: ", data);
          setUserDetails(data);
        }
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from('usuarios')
      .update(userDetails)
      .eq('usuario_id', slug);

      if (error) {
        setNotification({
          visible: true,
          titulo: "Error",
          mensaje: "Vuelva a intentar mas tarde: " + error.message // Ajusta según necesites
        });
      } else {
        setNotification({
          visible: true,
          titulo: "Éxito",
          mensaje: "Los datos del usuario han sido actualizados" // Ajusta según necesites
        });
      }
      setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return <div>No user details found or there was an error fetching them.</div>;
  }
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };
  
  if (permisoDenegado) {
    return permisoDenegado;
}

const handleSelectChange = (value, fieldName) => {
  setUserDetails(prevState => ({
    ...prevState,
    [fieldName]: value,
  }));
};


  return (
    <>
    <FormRegistro
      titulo={"Editar usuario"}
      formState={userDetails}
      handleSelectChange={handleSelectChange}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
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