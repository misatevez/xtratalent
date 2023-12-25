import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"

export default function ListaPuestos() {
    return (
      <>
       <label className="block text-sm font-medium mb-1" htmlFor="group-type">
              Puesto:
            </label>
          
        <Select>
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="public">Jefe Contabilidad</SelectItem>
        </SelectContent>
      </Select>
      </>
    );
}

