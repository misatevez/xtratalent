'use client'
import { Button } from "@/components/ui/button"
import usePermisosSeguridad from "@/lib/usePermisosSeguridad"
import { useRouter } from 'next/navigation'

export default function SelectoraSeguridad() {
  const router = useRouter()
  const permisos = usePermisosSeguridad()

    return (
        <main className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">Seguridad y acceso</h1>
        <div className="flex items-center justify-center space-x-4">
          <Button disabled={!permisos.crearPerfilUsuario} onClick={() => router.push('/dashboard/seguridad/crearperfil')} className="bg-white text-purple-500 hover:bg-gray-200">Crear perfil de usuario</Button>
          <Button onClick={() => router.push('/dashboard/seguridad/buscarperfil')} className="bg-white text-purple-500 hover:bg-gray-200">Buscar perfiles de usuario</Button>
          <Button onClick={() => router.push('/dashboard/seguridad/reset')} className="bg-white text-purple-500 hover:bg-gray-200">Modificación contraseña</Button>
           <Button onClick={() => router.push('/dashboard/seguridad/estadousuario')} className="bg-white text-purple-500 hover:bg-gray-200">Usuario ON/OFF</Button> 
        </div>
      </main>
    );
}

