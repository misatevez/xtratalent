"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatearFecha } from "@/lib/fechaService";
import Loading from "@/components/loading";
import { Notificacion } from "@/components/notification";

export default function Page() {
  // Nombre del componente con mayúscula
  const [user, setUser] = useState(null);
  const [informacion, setInformacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: "",
  });
  const router = useRouter();

  useEffect(() => {
    supabase.auth
      .getUser()
      .then((user) => setUser(user.data.user))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!user) return;
    const getData = async () => {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("correo_electronico", user.email)
        .single();
      if (error) {
        console.error(error);
        return;
      }
      console.log(data);
      setInformacion(data);
    };
    getData();
    setLoading(false);
  }, [user]);



  if (loading) {
    return <Loading />;
  }

  return (
    <>
    <div className="p-6 m-auto">
     
      <div className="bg-white rounded shadow-md p-4 flex flex-col items-center">

      <h1 className="text-2xl font-bold  text-left mb-4  text-gray-800">
        Perfil de Usuario
      </h1>

        <div className="flex flex-row items-start">
          <div className="flex flex-col items-center mr-8  ">
            <Image
              width={200}
              height={200}
              src="https://xzfcosekgkctmoepyywr.supabase.co/storage/v1/object/public/assets/man-and-woman-user-icon.png?t=2024-02-13T19%3A54%3A04.648Z"
              alt="Icon representing two user avatars"
              className="mb-4"
            />
            <div className="flex flex-col gap-2">
              <Button
              onClick={() => {
                router.push(`/dashboard/perfil/modificar/${informacion.user_id}`);
              }
              }
              >Modificar datos</Button>
              <Button
                onClick={() => {
                  router.push(`/resetear/${informacion.user_id}`);
                }}
              >
                Modificar contraseña
              </Button>
            </div>
          </div>
          <div className="border-l-2 border-gray-300 pl-8">
            {informacion && (
              <>
                <div className="flex items-center mb-2">
                  <i className="fas fa-user mr-2 text-gray-600"></i>
                  <span className="font-semibold">Nombre Completo:</span>
                  <span className="ml-2">
                    {`${informacion.primer_nombre || ""} ${
                      informacion.segundo_nombre || ""
                    } ${informacion.apellido_paterno || ""} ${
                      informacion.apellido_materno || ""
                    }`.trim()}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  <i className="fas fa-map-marker-alt mr-2 text-gray-600"></i>
                  <span className="font-semibold">Dirección Completa:</span>
                  <span className="ml-2">
                    {`${informacion.direccion_calle_avenida || ""}, Colonia: ${
                      informacion.direccion_colonia || ""
                    }, Zona: ${informacion.direccion_zona || ""}, ${
                      informacion.direccion_municipio || ""
                    }, ${informacion.direccion_departamento || ""}, País: ${
                      informacion.pais_origen || ""
                    }`.trim()}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  <i className="fas fa-envelope mr-2 text-gray-600"></i>
                  <span className="font-semibold">Correo Electrónico:</span>
                  <span className="ml-2">
                    {informacion.correo_electronico || ""}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  <i className="fas fa-id-card mr-2 text-gray-600"></i>
                  <span className="font-semibold">Número de DPI:</span>
                  <span className="ml-2">{informacion.numero_dpi || ""}</span>
                </div>

                <div className="flex items-center mb-2">
                  <i className="fas fa-calendar-alt mr-2 text-gray-600"></i>
                  <span className="font-semibold">Fecha de Nacimiento:</span>
                  <span className="ml-2">
                    {informacion.fecha_nacimiento || ""}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  <i className="fas fa-phone-alt mr-2 text-gray-600"></i>
                  <span className="font-semibold">Teléfono Móvil:</span>
                  <span className="ml-2">
                    {informacion.telefono_movil_cel || ""}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  <i className="fas fa-briefcase mr-2 text-gray-600"></i>
                  <span className="font-semibold">Profesión/Ocupación:</span>
                  <span className="ml-2">
                    {informacion?.profesion_ocupacion}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <i className="fas fa-hourglass-start mr-2 text-gray-600"></i>
                  <span className="font-semibold">Años de Experiencia:</span>
                  <span className="ml-2">{informacion?.anos_experiencia | ""}</span>
                </div>
                {/* ... otros campos ... */}
                <div className="flex items-center mb-2">
                  <i className="fas fa-map-signs mr-2 text-gray-600"></i>
                  <span className="font-semibold">Lugar de Nacimiento:</span>
                  <span className="ml-2">{informacion?.lugar_nacimiento}</span>
                </div>
                <div className="flex items-center mb-2">
                  <i className="fas fa-ring mr-2 text-gray-600"></i>
                  <span className="font-semibold">Estado Civil:</span>
                  <span className="ml-2">{informacion?.estado_civil}</span>
                </div>

                <div className="flex items-center mb-2">
                  <i className="fas fa-venus-mars mr-2 text-gray-600"></i>
                  <span className="font-semibold">Género/Sexo:</span>
                  <span className="ml-2">{informacion?.genero_sexo}</span>
                </div>
                <div className="flex items-center mb-2">
                  <i className="fas fa-passport mr-2 text-gray-600"></i>
                  <span className="font-semibold">Número de Pasaporte:</span>
                  <span className="ml-2">{informacion?.numero_pasaporte}</span>
                </div>
                <div className="flex items-center mb-2">
                  <i className="fas fa-phone mr-2 text-gray-600"></i>
                  <span className="font-semibold">Teléfono de Casa:</span>
                  <span className="ml-2">{informacion?.telefono_casa}</span>
                </div>
                {/* ... otros campos ... */}
                <div className="flex items-center mb-2">
                  <i className="fas fa-calendar-check mr-2 text-gray-600"></i>
                  <span className="font-semibold">Fecha Creado:</span>
                  <span className="ml-2">{ formatearFecha( informacion?.fecha_creado )}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
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
