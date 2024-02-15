'use client'
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { Notificacion } from "@/components/notification";
import { formatearFecha } from "@/lib/fechaService";
import usePermisosOrganizacion from "@/lib/usePermisosOrganizacion";
import ListaEntidadesEmpresas from "../../../lista-entidad-empresa";
import ListaSubEntidad from "../../lista-subentidad";
import ListaDirecciones from "../lista-direcciones";

export default function BuscarDepartamento() {
  const router = useRouter();
  const permisos = usePermisosOrganizacion();
  const [grupos, setGrupos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrupoId, setSelectedGrupoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });

      // Estado inicial para el formulario
      const [formState, setFormState] = useState({
        nombre: '',
        descripcion: '',
        id_sub_entidad: '',
        id_entidad_empresa: '',
        id_direcciones: ''
      });

  useEffect(() => {

    if (!formState.id_direcciones) return;

    async function fetchData() {
      const { data, error } = await supabase.from('departamentos')
      .select('*')
      .eq('id_direcciones', formState.id_direcciones)

      if (error) {
        console.error(error);
        setNotification({
          visible: true,
          titulo: "Error",
          mensaje: "Error al cargar grupos: " + error.message
        });
      } else {
        setGrupos(data);
        setLoading(false);
      }
    }
    fetchData();
  }, [toggle, formState.id_direcciones]);



  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  const handleCheckboxChange = (userId) => {
    setSelectedGrupoId(selectedGrupoId === userId ? null : userId); // Toggle selection
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDeleteGrupo = async () => {
    if (!selectedGrupoId) return;
    setLoading(true);
    const { error } = await supabase.from('departamentos').delete().eq('id_departamentos', selectedGrupoId);
    if (error) {
      console.error("Error deleting group: ", error);
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Error al eliminar: Tiene informacion pendiente por eliminar"
      });
    } else {
      setGrupos(prevGrupos => prevGrupos.filter(grupo => grupo.id_departamentos !== selectedGrupoId));
      setSelectedGrupoId(null);
      setNotification({
        visible: true,
        titulo: "Éxito",
        mensaje: "Grupo eliminado correctamente"
      });
    }
    setLoading(false);
  };

  const filteredGrupos = grupos.filter(grupo =>
    grupo.nombre.toLowerCase().includes(searchTerm) ||
    grupo.descripcion.toLowerCase().includes(searchTerm) 
    
  );


       // Manejar cambios en los inputs
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormState(prevState => ({
    ...prevState,
    [name]: value
  }));
  setToggle(!toggle);
};


  const handleGrupoTipoChange = (id_sub_entidad) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange({ target: { name: 'id_sub_entidad', value: id_sub_entidad } });
  };

  const handleGrupoTipoChange2 = (id_entidad_empresa) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange({ target: { name: 'id_entidad_empresa', value: id_entidad_empresa } });

  };

  const handleGrupoTipoChange3 = (id_direcciones) => {
    // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
    handleInputChange({ target: { name: 'id_direcciones', value: id_direcciones } });

  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
       <div className="p-4 mx-auto w-full max-w-5xl mt-4">
                <div className="rounded-lg shadow-lg">
                  <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
        <h1 className="text-xl font-bold  mb-4">BUSCAR DEPARTAMENTOS</h1>

        <div className="flex flex-row gap-1">
          <div className="flex-auto">
        <ListaEntidadesEmpresas selectedTipoId={formState.id_entidad_empresa} onGrupoTipoChange={handleGrupoTipoChange2} />
        </div>
        <div className="flex-auto">
        <ListaSubEntidad disabled={formState.id_entidad_empresa ? false : true } selectedTipoId={formState.id_sub_entidad} onGrupoTipoChange={handleGrupoTipoChange} filter={formState.id_entidad_empresa} />
        </div>

        <div className="flex-auto">
        <ListaDirecciones disabled={formState.id_sub_entidad ? false : true } selectedTipoId={formState.id_direcciones} onGrupoTipoChange={handleGrupoTipoChange3} filter={formState.id_sub_entidad} />
        </div>

        </div>

        <div className="flex justify-center mt-4">
          <Input  placeholder="Buscar" type="text" onChange={handleSearchChange} />

        </div>
        <div className="overflow-x-auto mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nombre de Departamento</TableHead>
                <TableHead className="w-[200px]">Descripcion de Departamento</TableHead>
                <TableHead className="w-[150px]">Fecha Registro</TableHead>
                <TableHead className="w-[150px]">Última Modificación</TableHead>
                <TableHead className="w-[100px]">Seleccionar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrupos.map((grupo, index) => (
                <TableRow key={index}>
                  <TableCell>{grupo.nombre}</TableCell>
                  <TableCell>{grupo.descripcion}</TableCell>
                  <TableCell>{ formatearFecha( grupo.fecha_creado )}</TableCell>
                  <TableCell>{ formatearFecha( grupo.fecha_actualizado )}</TableCell>
                  <TableCell><input
                  type="checkbox"
                  checked={selectedGrupoId === grupo.id_departamentos}
                  onChange={() => handleCheckboxChange(grupo.id_departamentos)}
                  className="accent-blue-500 h-5 w-5"
                /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between mt-4">
      <Button
          className={` text-white ${!selectedGrupoId ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!selectedGrupoId || !permisos.editarDepartamentos}
          onClick={() => router.push(`/dashboard/entidades/entidadempresa/subentidades/area-direcciones/departamentos/${selectedGrupoId}`)}
        >
          Modificar
        </Button>
        
        <Button
  className={` text-white ${!selectedGrupoId ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={!selectedGrupoId || !permisos.editarDepartamentos }
  onClick={handleDeleteGrupo}
>
  Eliminar
</Button>

</div>
</div>
      </div>
      </div>
      {notification.visible && (
        <Notificacion
          titulo={notification.titulo}
          mensaje={notification.mensaje}
          visible={notification.visible}
          onClose={handleCloseNotification}
        />
      )}
    </>
  );
}
