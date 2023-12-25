import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"

export default function ListaEntidades() {
    return (
      <>
       <label className="block text-sm font-medium mb-1" htmlFor="group-type">
              Tipo Entidades
            </label>
          
        <Select>
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="public">Administracion Central</SelectItem>
        </SelectContent>
      </Select>
      </>
    );
}

