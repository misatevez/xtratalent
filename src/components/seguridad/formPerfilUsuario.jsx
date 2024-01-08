import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ListaEntidadesEmpresas from "../entidades/entidadempresa/lista-entidad-empresa";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";


export default function FormPerfilUsuario( {formState, handleSelectChange}) {


  const tipos = [
    { valor: "Internal", nombre: "Internal" },
    { valor: "External", nombre: "External" },
  ];

    return (
        <main className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Perfiles de usuario</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <ListaEntidadesEmpresas />
          </div>
          <label className="flex flex-col gap-2">
            <span  className="block text-sm font-medium mb-1">Tipo de usuario:</span>
            <Select
              onValueChange={(value) => handleSelectChange(value, "tipo_usuario")}
              value={formState.tipo_usuario}
            >
              <SelectTrigger id="group-type">
                <SelectValue placeholder="Seleccione uno" />
              </SelectTrigger>

              <SelectContent position="popper">
                {tipos.map((nivel, index) => (
                  <SelectItem key={index} value={nivel.valor}>
                    {nivel.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
