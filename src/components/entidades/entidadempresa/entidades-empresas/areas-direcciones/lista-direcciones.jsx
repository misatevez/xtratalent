import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"

export default function ListaDirecciones() {
    return (
      <>
       <label className="block text-sm font-medium mb-1" htmlFor="group-type">
              Área-Dirección:
            </label>
          
        <Select>
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="public">Dirección Ejecutiva</SelectItem>
        </SelectContent>
      </Select>
      </>
    );
}

