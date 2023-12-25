'use client'
import { Input } from "@/components/ui/input";
import ListaCategorias from "./lista-categorias";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
export default function CrearCategoria() {
  const router = useRouter()
    return (
      <div className="p-4 mx-auto w-full max-w-2xl mt-4">
        <div className="rounded-lg shadow-lg">
            <div className="bg-white p-6 rounded-lg shadow-inner m-auto text-center">
              <h1 className="text-3xl font-bold text-center mt-4  text-gray-800">Crear familia de evaluación</h1>
              <div className="grid grid-cols-1 gap-4">
          <div>
<ListaCategorias  />
</div></div>
<div className="mt-4 p-6">
          <label className="block text-sm font-medium mb-2 text-start" htmlFor="group-name">
            Nombre Familia de Evaluacion:
          </label>
          <Input id="group-name" placeholder="Secretarial" />
        </div>
        <div className="flex justify-around mt-4">
          <Button onClick={() => router.push('/dashboard/evaluaciones/categorias/crearcategoria/reportes')}>Reportes</Button>
          <Button>Guardar</Button>
        </div>
            </div>
          </div>
          </div>
    );
}

