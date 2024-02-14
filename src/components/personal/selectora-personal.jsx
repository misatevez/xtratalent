
'use client'
import { Button } from "@/components/ui/button"
import usePermisosPersonal from "@/lib/usePermisosPersonal";
import { useRouter } from "next/navigation";

export function SelectoraPersonal() {
const router = useRouter();
const permisos = usePermisosPersonal();

  return (
    (
        <main
          className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg text-white">
          <h1 className="text-4xl font-bold mb-6 text-center">Administrar Personal</h1>
          <div className="flex items-center justify-center space-x-4">
            <Button  disabled={!permisos.altaPersonal} onClick={() => router.push('/dashboard/personal/altapersonal')} className="bg-white text-purple-500 hover:bg-gray-200">Alta personal</Button>
            <Button  disabled={!permisos.busquedaRapido} onClick={() => router.push('/dashboard/personal/buscarpersonal')} className="bg-white text-purple-500 hover:bg-gray-200">Busqueda rapida</Button>
          </div>
        </main>
    )
  );
}
