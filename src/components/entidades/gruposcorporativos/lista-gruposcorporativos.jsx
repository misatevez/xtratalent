import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"

export default function ListaGruposcorporativos() {
    return (
      <>
      <label className="block text-sm font-medium mb-1" htmlFor="group-type">
              Grupo Tipo Corporativo:
            </label>
      
        <Select>
        <SelectTrigger id="group-type">
          <SelectValue placeholder="Seleccione uno" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="public">Sector Público</SelectItem>
          <SelectItem value="private">Sector Privado</SelectItem>
          <SelectItem value="ngo">Fideicomisos y Otras Entidades</SelectItem>
          <SelectItem value="international">Organizaciones Internacionales</SelectItem>
          <SelectItem value="other">Otro Tipo</SelectItem>
        </SelectContent>
      </Select>
      </>
    );
}

