import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"

export default function ListaEntidadesEmpresa() {
    return (
      <>
       <label className="block text-sm font-medium mb-1" htmlFor="group-type">
              Entidad Empresa:
            </label>
          
        <Select>
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="public">Fondo de Desarrollo Social</SelectItem>
        </SelectContent>
      </Select>
      </>
    );
}

