
'use client'
import Link from "next/link"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export function SelectoraSubEntidades() {
  const router = useRouter()

  return (
    (
        <main
          className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg text-white">
          <h1 className="text-4xl font-bold mb-6 text-center">Administrar Entidades Empresa</h1>
          <div className="flex items-center space-x-4 justify-center">
            <Button onClick={() => router.push('/dashboard/entidades/entidadempresa/crearentidadempresa')} className="bg-white text-purple-500 hover:bg-gray-200">Crear Entidad Empresa</Button>
            <Button  onClick={() => router.push('/dashboard/entidades/entidadempresa/buscarentidadempresa')}className="bg-white text-purple-500 hover:bg-gray-200">Buscar Entidad Empresa</Button>
          </div>
        </main>
    )
  );
}
