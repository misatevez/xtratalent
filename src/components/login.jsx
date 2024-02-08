'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import supabase from "@/lib/supabaseClient";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", content: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.getSession();
    const rememberMePreference = localStorage.getItem("rememberMe") === "true";

    if (session && rememberMePreference) {
      router.push("/dashboard");
    }
  }, []);

  async function signInWithEmail() {
    if (!email || !password) {
      setMessage({ type: "error", content: "Por favor, ingresa tu correo y contraseña." });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setMessage({ type: "error", content: error.message });
    } else if (data.user) {
      localStorage.setItem("rememberMe", rememberMe.toString());
      setMessage({ type: "success", content: "Inicio de sesión exitoso!" });
      router.push("/dashboard");
    }
  }

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const forgotPassword = async () => {
    if (!email) {
      setMessage({ type: "error", content: "Por favor, ingresa tu correo para restablecer la contraseña." });
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `http://localhost:3000/resetear-contrasena`
    });

    if (error) {
      setMessage({ type: "error", content: error.message });
    } else {
      setMessage({ type: "success", content: "Revisa tu correo para restablecer tu contraseña." });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 justify-center items-center">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <Input id="email" type="email" placeholder="Introduce tu email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <Input id="password" type="password" placeholder="Introduce tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <label className="flex items-center">
              <Input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
              <span className="ml-2 text-sm text-gray-600">Recordarme</span>
            </label>
            <Link href="#" onClick={forgotPassword} className="text-sm text-blue-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          {message.content && (
            <div className={`mt-4 text-sm ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
              {message.content}
            </div>
          )}
          <div className="mt-6">
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={signInWithEmail}>
              Iniciar sesión
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
