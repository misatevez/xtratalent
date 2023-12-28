
'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export function SelectoraSubTipoEntidad() {
  const router = useRouter()

  return (
    (
        <main
          className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg text-white">
          <h1 className="text-4xl font-bold mb-6 text-center">Administrar SubTipo Entidades</h1>
          <div className="flex items-center justify-center space-x-4">
          <Button onClick={() => router.push('/dashboard/entidades/subtipoentidad/crear')} className="bg-white text-purple-500 hover:bg-gray-200">Crear Subtipo de Entidad</Button>
            <Button onClick={() => router.push('/dashboard/entidades/subtipoentidad/buscar')} className="bg-white text-purple-500 hover:bg-gray-200">Buscar Subtipo de Entidad</Button>
            
          </div>
        </main>
    )
  );
}


