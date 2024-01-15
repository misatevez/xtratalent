
'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export function SelectoraResolver() {
const router = useRouter();


  return (
    (
        <main
          className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg text-white">
          <h1 className="text-4xl font-bold mb-6 text-center">Mis evaluaciones</h1>
          <div className="flex items-center justify-center space-x-4">
            <Button  onClick={() => router.push('/dashboard/resolver/evaluaciones-disponibles')} className="bg-white text-purple-500 hover:bg-gray-200">Evaluaciones disponibles</Button>
            <Button onClick={() => router.push('/dashboard/resolver/evaluaciones-resueltas')} className="bg-white text-purple-500 hover:bg-gray-200">Evaluaciones resueltas</Button>
          </div>
        </main>
    )
  );
}
