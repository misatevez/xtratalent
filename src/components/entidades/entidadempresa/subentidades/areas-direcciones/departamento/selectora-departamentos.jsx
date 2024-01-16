
'use client'
import Link from "next/link"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import usePermisosOrganizacion from "@/lib/usePermisosOrganizacion"

export function SelectoraDepartamentos() {
  const router = useRouter()
  const permisos = usePermisosOrganizacion()

  return (
    (
        <main
          className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg text-white">
          <h1 className="text-4xl font-bold mb-6 text-center ">Administrar Departamentos</h1>
          <div className="flex items-center space-x-4 justify-center">
            <Button disabled={!permisos.editarDepartamentos} onClick={() => router.push('/dashboard/entidades/entidadempresa/subentidades/area-direcciones/departamentos/creardepartamento')} className="bg-white text-purple-500 hover:bg-gray-200">Crear Departamentos</Button>
            <Button disabled={!permisos.departamentos} onClick={() => router.push('/dashboard/entidades/entidadempresa/subentidades/area-direcciones/departamentos/buscardepartamento')}className="bg-white text-purple-500 hover:bg-gray-200">Buscar Departamentos</Button>
            <Button disabled={!permisos.puestos} onClick={() => router.push('/dashboard/entidades/puestos/')}className="bg-white text-purple-500 hover:bg-gray-200">Puestos</Button>
          </div>
        </main>
    )
  );
}