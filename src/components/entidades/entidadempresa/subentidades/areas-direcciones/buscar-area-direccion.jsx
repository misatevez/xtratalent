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
import ListaEntidadesEmpresas from "../../lista-entidad-empresa";
import ListaSubEntidad from "../lista-subentidad";

export default function   BuscarDireccion() {
  const router = useRouter();
  const permisos = usePermisosOrganizacion  ();
  const [grupos, setGrupos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrupoId, setSelectedGrupoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

    // Estado inicial para el formulario
    const [formState, setFormState] = useState({
      nombre: '',
      descripcion: '',
      id_sub_entidad: '',
      id_entidad_empresa: ''
    });

  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });


  useEffect(() => {

    if (!formState.id_sub_entidad) return;


    const fetchGrupos = async () => {
      const { data: grupos, error } = await supabase
        .from('direcciones')
        .select('*')
        .eq('id_sub_entidad', formState.id_sub_entidad);

      if (error) {
        console.error("Error fetching grupos: ", error);
      } else {
        setGrupos(grupos);
      }
      setLoading(false);
    };
    fetchGrupos();
  }, [formState.id_sub_entidad, toggle]);
  
  




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
    const { error } = await supabase.from('direcciones').delete().eq('id_direcciones', selectedGrupoId);
    if (error) {
      console.error("Error deleting group: ", error);
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Error al eliminar: Tiene informacion pendiente por eliminar"
      });
    } else {
      setGrupos(prevGrupos => prevGrupos.filter(grupo => grupo.id_direcciones !== selectedGrupoId));
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




  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
        <div className="p-4 mx-auto w-full max-w-4xl mt-4">
                <div className="rounded-lg shadow-lg">
                  <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
        <h1 className="text-xl font-bold mb-4">BUSCAR ÁREAS – DIRECCIONES</h1>
        <div className="flex flex-row gap-1">
          <div className="flex-auto">
        <ListaEntidadesEmpresas selectedTipoId={formState.id_entidad_empresa} onGrupoTipoChange={handleGrupoTipoChange2} />
        </div>
        <div className="flex-auto">
        <ListaSubEntidad disabled={formState.id_entidad_empresa ? false : true } selectedTipoId={formState.id_sub_entidad} onGrupoTipoChange={handleGrupoTipoChange} filter={formState.id_entidad_empresa} />
        </div>
        </div>
        <div className="flex justify-center mt-4">
          <Input  placeholder="Buscar" type="text" onChange={handleSearchChange} />
        </div>
        
        <div className="overflow-x-auto mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nombre de Dirección</TableHead>
                <TableHead className="w-[200px]">Descripcion de Dirección</TableHead>
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
                  checked={selectedGrupoId === grupo.id_direcciones}
                  onChange={() => handleCheckboxChange(grupo.id_direcciones)}
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
          disabled={!selectedGrupoId || !permisos.editarAreasDirecciones }
          onClick={() => router.push(`/dashboard/entidades/entidadempresa/subentidades/area-direcciones/${selectedGrupoId}`)}
        >
          Modificar
        </Button>
        
        <Button
  className={` text-white ${!selectedGrupoId ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={!selectedGrupoId || !permisos.editarAreasDirecciones}
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
