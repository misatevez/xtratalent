import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"

export default function ListaRenglones() {
    return (
      <>
       <label className="block text-sm font-medium mb-1" htmlFor="group-type">
              Renglones disponibles:
            </label>
          
        <Select>
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="public">011 - Presupuestado</SelectItem>
        </SelectContent>
      </Select>
      </>
    );
}

