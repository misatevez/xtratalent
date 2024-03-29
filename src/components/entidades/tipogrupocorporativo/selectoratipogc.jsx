
'use client'
import Link from "next/link"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import usePermisosOrganizacion from "@/lib/usePermisosOrganizacion"
export function SelectoraTipoGC() {
  const router = useRouter()
  const permisos = usePermisosOrganizacion();

  return (
    (
        <main
          className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg text-white">
          <h1 className="text-4xl font-bold mb-6 text-center">Administrar Tipo Grupo Corporativo</h1>
          <div className="flex items-center justify-center space-x-4">
          <Button  disabled={!permisos.editar_tipo_gc_subtipo}  onClick={() => router.push('/dashboard/entidades/tipogrupocorporativo/crear')} className="bg-white text-purple-500 hover:bg-gray-200">Crear Tipo de Grupo Corporativo</Button>
          <Button  disabled={!permisos.tipo_gc_subtipo} onClick={() => router.push('/dashboard/entidades/tipogrupocorporativo/buscar')} className="bg-white text-purple-500 hover:bg-gray-200">Buscar Tipo de Grupo Corporativo</Button>
            
          </div>
        </main>
    )
  );
}
