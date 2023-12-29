import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ListaTemas from "../temas/lista-de-temas";

export default function FormPregunta({
  formState,
  handleInputChange,
  handleSubmit,
  titulo,
  handleSelectChange,
}) {
  const handleGrupoTipoChange = (id_tema) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange({ target: { name: "id_tema", value: id_tema } });
  };

  return (
    <form  onSubmit={handleSubmit} key="1" className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl">
      <div>
        <h1 className="text-center text-xl font-bold">Preguntas por tema</h1>
      </div>
      <div>
      <span className="font-bold mb-4">Tema-Contenido:</span>
      <ListaTemas
        selectedTipoId={formState.id_tema}
        onGrupoTipoChange={handleGrupoTipoChange}
      />
      </div>
      <br />
      <span className="font-bold">
        Características y Detalle de la Pregunta:
      </span>
      <div>
        <div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <span className="font-bold">Tipo:</span>
              <span className="ml-2">
                <Select
                  onValueChange={(value) => handleSelectChange(value, "tipo_pregunta")}
                  value={formState.tipo_pregunta}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="text">Texto</SelectItem>
                      <SelectItem value="number">Numerico</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </span>
            </div>

            <div className="flex items-center">
              <div className="flex items-center">
                <span className="font-bold">Seleccione:</span>
                <span className="ml-2">
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange(value, "pregunta_concepto")
                    }
                    value={formState.pregunta_concepto}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="fija">Fija</SelectItem>
                        <SelectItem value="aleatoria">Aleatoria</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </span>
              </div>
            </div>

          </div>

          <div className="flex justify-start mb-4 ">
              <input
                type="checkbox"
                name="revisable"
                checked={!!formState.revisable} // Usa !! para convertir a booleano en caso de que sea undefined o null
                onChange={handleInputChange}
                className="mr-2"
                id="revisable"
              />
              <label className="font-semibold" htmlFor="revisable">
                Revisable
              </label>
            </div>


          <div className="mb-4">
            <label className="font-bold" htmlFor="question">
              Pregunta:
            </label>
            <textarea
              name="pregunta"
              value={formState.pregunta}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 border-2"
              id="question"
              placeholder="Cuanto es 2 X 2"
              rows="2"
            />
          </div>
        </div>


       
        <div className="flex justify-between">
          <Button
            type="submit"
            className="bg-blue-500 text-white"
            variant="default"
          >
            Guardar
          </Button>
        </div>
      </div>
    </form>
  );
}
