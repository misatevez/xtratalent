import { Button } from "@/components/ui/button"

export default function ListaPerfilesUsuario() {
    return (
        <main className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">Perfiles de usuario</h1>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-lg font-semibold">Entidad:</span>
              <select className="border rounded p-2">
                <option>(All)</option>
                <option>Secretariat of Social Works (SOSEP)</option>
                <option>Secretariat of Strategic Affairs</option>
                <option>Institute of Tourism (INGUAT)</option>
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-lg font-semibold">Tipos de usuario:</span>
              <select className="border rounded p-2">
                <option>(All)</option>
                <option>Internal</option>
                <option>External</option>
              </select>
            </label>
          </div>
          <table className="table-auto border-collapse w-full mt-8">
            <thead>
              <tr>
                <th className="px-4 py-2">Tipo de usuario</th>
                <th className="px-4 py-2">Nombre de entidad</th>
                <th className="px-4 py-2">Nombre de perfil</th>
                <th className="px-4 py-2">Tipo de usuario</th>
                <th className="px-4 py-2">Tipo de acceso</th>
                <th className="px-4 py-2">Fecha de registro</th>
              </tr>
            </thead>
            <tbody />
          </table>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <Button variant="outline">Previo</Button>
              <Button variant="outline">Siguiente</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Imprimir reporte</Button>
              <Button variant="outline">Generar PDF</Button>
              <Button variant="outline">Nuevo Perfil</Button>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button className="bg-blue-500 text-white">Guardar</Button>
          </div>
        </main>
    );
}

