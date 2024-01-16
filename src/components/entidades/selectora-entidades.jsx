
'use client'
import Link from "next/link"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import usePermisosOrganizacion from "@/lib/usePermisosOrganizacion"


export function SelectoraEntidades() {
  const router = useRouter()
  const permisos = usePermisosOrganizacion();

  return (
    (
        <main
          className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg text-white">
          <h1 className="text-4xl font-bold mb-6 text-center">Administrar Organización</h1>
          <div className="grid grid-cols-3 justify-center ">
          <Button  disabled={!permisos.tipo_gc_subtipo} onClick={() => router.push('/dashboard/entidades/tipogrupocorporativo')} className="bg-white text-purple-500 hover:bg-gray-200 m-3">Tipo Grupo Corporativo</Button>
            <Button  disabled={!permisos.tipo_gc_subtipo} onClick={() => router.push('/dashboard/entidades/gruposcorporativos')} className="bg-white text-purple-500 hover:bg-gray-200 m-3">Grupos Corporativos</Button>
            <Button  disabled={!permisos.tipo_gc_subtipo} onClick={() => router.push('/dashboard/entidades/subtipoentidad')} className="bg-white text-purple-500 hover:bg-gray-200 m-3">Subtipo Entidad</Button>
            <Button   disabled={!permisos.entidadEmpresa} onClick={() => router.push('/dashboard/entidades/entidadempresa')} className="bg-white text-purple-500 hover:bg-gray-200 m-3">Entidades Empresa</Button>
            <Button   disabled={!permisos.subentidades} onClick={() => router.push('/dashboard/entidades/entidadempresa/subentidades')}className="bg-white text-purple-500 hover:bg-gray-200 m-3">Subentidades</Button>
            <Button  disabled={!permisos.areasDirecciones} onClick={() => router.push('/dashboard/entidades/entidadempresa/subentidades/area-direcciones')}className="bg-white text-purple-500 hover:bg-gray-200 m-3">Áreas - Direcciones</Button>
          </div>
        </main>
    )
  );
}
