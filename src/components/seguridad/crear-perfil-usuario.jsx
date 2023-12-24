
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CrearPerfilUsuario() {
    return (
        <main className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">Perfiles de usuario</h1>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Entidades:</span>
            <select className="border rounded p-2">
              <option>INGUAT</option>
              <option>Secretariat of Social Works (SOSEP)</option>
              <option>Secretariat of Strategic Affairs</option>
              <option>INTECAP</option>
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Tipo de usuario:</span>
            <select className="border rounded p-2">
              <option>Internal</option>
              <option>External</option>
            </select>
          </label>
        </div>
        <div className="grid grid-cols gap-4">
          <label className="flex flex-col gap-2 w-full">
            <span className="text-lg font-semibold">Nombre de perfil de usuarios:</span>
            <Input
              className="border rounded p-2 w-full"
              placeholder="Regional Regulator - Sedes"
              style={{
                width: "100%",
              }}
              type="text"
            />
          </label>
        </div>
        <div className="grid grid-cols gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Descripcion de funciones de perfil</span>
            <textarea className="border rounded p-2 w-full" cols="50" name="textarea" rows="10" />
          </label>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Button className="mt-4">Guardar</Button>
          <Button className="mt-4">Actualizar</Button>
        </div>
      </main>
    );
}


