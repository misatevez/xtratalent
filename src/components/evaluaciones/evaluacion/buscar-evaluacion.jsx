"use client";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import usePermisosEvaluaciones from "@/lib/usePermisosEvaluaciones";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import ListaCategorias from "../categorias/lista-categorias";
import ListaSubCategorias from "../categorias/subcategorias/lista-subcategorias";

export default function BuscarEvaluacion() {
  const router = useRouter();
  const permisos = usePermisosEvaluaciones();
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Puedes ajustar esto según tus necesidades
  const [totalEvaluaciones, setTotalEvaluaciones] = useState(0);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formState, setFormState] = useState({
    nivel: "",
    clase: "",
    id_categoria: "",
    id_subcategoria: "",
  });
  useEffect(() => {
    const buscarEvaluaciones = async () => {
      const startIndex = (currentPage - 1) * pageSize;

      const { data, error, count } = await supabase
        .from("evaluaciones")
        .select(
          `
          *,
          categorias: id_categoria (
            id_categoria,
            nombre
          ),
          sub_categorias: id_subcategoria (
            id_subcategorias,
            nombre
          )
        `,
          { count: "exact" }
        )
        .range(startIndex, startIndex + pageSize - 1);

      if (error) {
        alert(error.message);
      } else {
        console.log(data);
        setEvaluaciones(data);
        setTotalEvaluaciones(count);
      }
    };
    buscarEvaluaciones();
  }, [currentPage, triggerEffect]);

  const handleDelete = async (id_evaluacion) => {
    const { error } = await supabase
      .from("evaluaciones")
      .delete()
      .eq("id_evaluacion", id_evaluacion);

    if (error) {
      alert(error.message);
    } else {
      setTriggerEffect((prev) => !prev);
      setCurrentPage(currentPage);
    }
  };

  const totalPages = Math.ceil(totalEvaluaciones / pageSize);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredEvaluaciones = evaluaciones.filter((evaluacion) => {
    console.log('Este es el formState:', formState)
    console.log('Esta es la evaluacion iterada:' ,evaluacion);
    // Comprobar si el nombre de la evaluación incluye el término de búsqueda
    const nombreIncludesSearchTerm = evaluacion.nombre
      ? evaluacion.nombre.toLowerCase().includes(searchTerm)
      : false;
  
    // Comprobar si la descripción de la evaluación incluye el término de búsqueda
    const descripcionIncludesSearchTerm = evaluacion.descripcion
      ? evaluacion.descripcion.toLowerCase().includes(searchTerm)
      : false;
  
    // Comprobar si el nivel coincide con el nivel seleccionado en el formulario
    const nivelMatches = formState.nivel
      ? evaluacion.nivel.toLowerCase() === formState.nivel.toLowerCase()
      : true;
  
    // Comprobar si la clase coincide con la clase seleccionada en el formulario
    const claseMatches = formState.clase
      ? evaluacion.clase.toLowerCase() === formState.clase.toLowerCase()
      : true;
  
    // Comprobar si el id de la categoría coincide con el id de la categoría seleccionada en el formulario
    const categoriaMatches = formState.id_categoria
      ? evaluacion.id_categoria == formState.id_categoria
      : true;
  
    // Comprobar si el id de la subcategoría coincide con el id de la subcategoría seleccionada en el formulario
    const subcategoriaMatches = formState.id_subcategoria
      ? evaluacion.id_subcategoria == formState.id_subcategoria
      : true;
  
    // Devolver true si todos los criterios de filtrado coinciden
    return (
      nombreIncludesSearchTerm &&
      descripcionIncludesSearchTerm &&
      nivelMatches &&
      claseMatches &&
      categoriaMatches &&
      subcategoriaMatches
    );
  });
  

  const handleSelectChange = (value, fieldName) => {
    setFormState(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
    console.log(formState);
  };

  const niveles = [
    { valor: "Basico", nombre: "1. Básico" },
    { valor: "Medio", nombre: "2. Medio" },
    { valor: "Intermedio", nombre: "3. Intermedio" },
    { valor: "Avanzado", nombre: "4. Avanzado" },
    { valor: "Experto", nombre: "5. Experto" },
    { valor: "Instructor", nombre: "6. Instructor" },
  ];

  const objetivo = [
    { valor: "Actitud", nombre: "Actitud" },
    { valor: "Aptitud", nombre: "Aptitud" },
    { valor: "Conocimiento", nombre: "Conocimiento" },
    { valor: "Competencia", nombre: "Competencia" },
    { valor: "Especifica-Desempeño", nombre: "Especifica-Desempeño" },
    { valor: "Habilidad", nombre: "Habilidad" },
    { valor: "Tecnico", nombre: "Tecnico" },
    { valor: "Psicometrico", nombre: "Psicometrico" },
  ];

  const handleGrupoTipoChange = (id_categoria) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange({
      target: { name: "id_categoria", value: id_categoria },
    });
  };

  const handleGrupoTipoChange2 = (id_subcategoria) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange({
      target: { name: "id_subcategoria", value: id_subcategoria },
    });
  };


     // Manejar cambios en los inputs
     const handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
    
      setFormState(prevState => ({
        ...prevState,
        [name]: value
      }));

      console.log(formState);
    };


  return (
    <div className="bg-white p-4 rounded-md shadow-md m-auto text-left ">
      <h1 className="text-xl font-bold text-left   mb-4">
        Catálogo de Evaluaciones
      </h1>
      <div className="grid grid-cols-2 gap-2">
        <ListaCategorias selectedTipoId={formState.id_categoria} onGrupoTipoChange={handleGrupoTipoChange} />
        <ListaSubCategorias selectedCategoryId={formState.id_categoria} onGrupoTipoChange={handleGrupoTipoChange2} selectedTipoId={formState.id_subcategoria} />

        <div>
          <label className="font-semibold" htmlFor="nivel">
            Nivel de Profundidad
          </label>

          <Select
            onValueChange={(value) => handleSelectChange(value, "nivel")}
            value={formState.nivel}
          >
            <SelectTrigger id="group-type">
              <SelectValue placeholder="Seleccione uno" />
            </SelectTrigger>

            <SelectContent position="popper">
              {niveles.map((nivel, index) => (
                <SelectItem key={index} value={nivel.valor}>
                  {nivel.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="font-semibold" htmlFor="clase">
            Clase-Tipo Objetivo Asociado
          </label>
          <Select
            onValueChange={(value) => handleSelectChange(value, "clase")}
            value={formState.clase}
          >
            <SelectTrigger id="group-type">
              <SelectValue placeholder="Seleccione uno" />
            </SelectTrigger>

            <SelectContent position="popper">
              {objetivo.map((nivel, index) => (
                <SelectItem key={index} value={nivel.valor}>
                  {nivel.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex w-full max-w-full items-center space-x-2 mb-10 mt-4">
        <Input placeholder="Search" type="text" onChange={handleSearchChange} />
      </div>
      <div className="overflow-x-auto mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nombre</TableHead>
              <TableHead className="w-[200px]">Familia</TableHead>
              <TableHead className="w-[200px]">Sub-familia</TableHead>
              <TableHead className="w-[150px]">Estado</TableHead>
              <TableHead className="w-[150px]">Clase</TableHead>
              <TableHead className="w-[150px]">Nivel</TableHead>
              <TableHead className="w-[150px]">Duracion</TableHead>
              <TableHead className="w-[300px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvaluaciones.map((evaluacion, index) => (
              <TableRow key={index}>
                <TableCell>{evaluacion.nombre}</TableCell>
                <TableCell>{evaluacion.categorias?.nombre}</TableCell>
                <TableCell>{evaluacion.sub_categorias?.nombre}</TableCell>
                <TableCell>
                  {evaluacion.activa ? "ACTIVA" : "DESACTIVADA"}
                </TableCell>

                <TableCell>{evaluacion.clase}</TableCell>
                <TableCell>{evaluacion.nivel}</TableCell>
                <TableCell>{evaluacion.duracion} Mins</TableCell>
                <TableCell>
                  <Button
                    disabled={!permisos.asignarEvaluaciones}
                    onClick={() =>
                      router.push(
                        `/dashboard/evaluaciones/evaluacion/asignar/${evaluacion.id_evaluacion}`
                      )
                    }
                    variant="ghost"
                  >
                    Asignar
                  </Button>
                  <Button
                    disabled={!permisos.editarEvaluaciones}
                    onClick={() =>
                      router.push(
                        `/dashboard/evaluaciones/evaluacion/${evaluacion.id_evaluacion}`
                      )
                    }
                    variant="ghost"
                  >
                    Editar
                  </Button>
                  <Button
                    disabled={!permisos.borrarEvaluaciones}
                    onClick={() => handleDelete(evaluacion.id_evaluacion)}
                    variant="ghost"
                  >
                    Borrar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="pagination-controls flex justify-around mt-6">
        <Button
          variant="outline"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
