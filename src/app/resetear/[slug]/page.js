"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

import { useEffect, useState } from "react";
import Volver from "@/components/ui/volver";

export default function Page({ params }) {
  const router = useRouter();
  const [user, setUser] = useState(
    {
        correo_electronico: "",
    }
  );
  const [loading, setLoading] = useState(true);
    const [formState, setFormState] = useState({
        correo_electronico: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState(null);

  const user_id = params.slug;

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("user_id", user_id)
        .single();

      if (error) {
        console.log("error", error);
      } else {
        setUser(data);
      }
    };
    fetchUser();
    setLoading(false);
  }, [user_id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


const handleChangePassword = async => {

    if (formState.password !== formState.confirmPassword) {
        setMessage("Las contraseñas no coinciden");
        return;
    }
    
    if (formState.password.length < 8) {
        setMessage("La contraseña debe tener al menos 8 caracteres");
        return;
    }
    
    const { error } = supabase.auth.updateUser({
        password: formState.password
    });
    
    if (error) {
        setMessage("Error al cambiar la contraseña");
    } else {
        setMessage("Contraseña cambiada correctamente");
    }

}


  if (loading) {
    return <Loading message="Cargando usuario..." />;
  }

  

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="p-4 m-auto w-full max-w-2xl">
      <div className="rounded-lg shadow-lg">
        <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
          <h1 className="text-2xl font-bold text-center">
            Restablecer Contraseña
          </h1>
          <div className="mt-2 p-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label className="font-bold">
                 Usuario:
                </label>
                <Input name="correo_electronico" disabled value={user?.correo_electronico} />
              </div>
              <div className="flex flex-col">
                <label className="font-bold">
                  Introducir Nueva Contraseña:
                </label>
                <Input name="password"  autoComplete="off" type="password" onChange={handleInputChange} value={formState?.password} placeholder="**********" />
              </div>
              <div className="flex flex-col">
                <label className="font-bold">Confirmar Contraseña:</label>
                <Input name="confirmPassword"   autoComplete="off" type="password" onChange={handleInputChange} value={formState?.confirmPassword} placeholder="**********" />
              </div>
            </div>
            <p className="text-xs mt-2">
              * La contraseña debe deberá cumplir con las políticas de
              contraseñas seguras, con no menos de 8 caracteres
            </p>

            <p className="text-xs mt-2 text-green-500 ">
              {message}
            </p>



            <div className="flex justify-around mt-4">
              <Button onClick={handleChangePassword} >Guardar</Button>
              <Volver />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}
