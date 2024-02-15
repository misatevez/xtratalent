'use client'
import { useEffect, useState } from "react"
import supabase from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from 'next/navigation'
import { Notificacion } from "@/components/notification"
import usePermisosPersonal from "@/lib/usePermisosPersonal"
import ListaEntidadesEmpresas from "@/components/entidades/entidadempresa/lista-entidad-empresa"
import ListaSubEntidad from "@/components/entidades/entidadempresa/subentidades/lista-subentidad"
import {
    SelectValue,
    SelectTrigger,
    SelectItem,
    SelectContent,
    Select,
  } from "@/components/ui/select";
import ListaVacantes from "@/components/entidades/puestos/vacantes/lista-vacantes"
import ListaPuesto from "@/components/entidades/puestos/lista-puestos"


export default function Page() {
  const router = useRouter()
  const permisos = usePermisosPersonal();
  const [usuarios, setUsuarios] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState(false)
  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });


  const tipo_usuario = [
    { valor: "Interno", nombre: "Interno" },
    { valor: "Externo", nombre: "Externo" },
  ];

   // Estado inicial para el formulario
   const [formState, setFormState] = useState({
    id_sub_entidad: '',
    id_entidad_empresa: '',
    tipo_usuario: '',
    id_vacante: '',
    id_puestos: '',
    fecha_inicio: '',
    fecha_fin: '',
  });

  useEffect(() => {
    if (!search || formState.id_sub_entidad == '') {
      return;
    }
  
    const fetchData = async () => {
      let query = supabase.from('usuarios').select('*');
  
      // Agrega condicionalmente los filtros basados en el estado de formState
      if (formState.id_sub_entidad) {
        query = query.eq('id_sub_entidad', formState.id_sub_entidad);
      }
      if (formState.tipo_usuario) {
        query = query.eq('tipo_usuario', formState.tipo_usuario);
      }
      if (formState.id_vacante) {
        query = query.eq('id_vacante', formState.id_vacante);
      }
      if (formState.id_puestos) {
        query = query.eq('id_puestos', formState.id_puestos);
      }
  
      // Añade condicionalmente el rango de fechas si ambos campos están presentes y no están vacíos
      if (formState.fecha_inicio && formState.fecha_inicio.trim() !== '') {
        query = query.gte('fecha_creado', formState.fecha_inicio);
      }
      if (formState.fecha_fin && formState.fecha_fin.trim() !== '') {
        query = query.lte('fecha_creado', formState.fecha_fin);
      }
  
      const { data, error } = await query;
  
      if (error) {
        console.error("Error al obtener los usuarios", error);
      } else {
        console.log(data);
        setUsuarios(data);
      }
    };
  
    fetchData();
  }, [toggle, formState]);
  
  
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const handleCheckboxChange = (userId) => {
    setSelectedUserId(selectedUserId === userId ? null : userId); // Toggle selection
  }

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;  // Verifica si se ha seleccionado un usuario
  
    setLoading(true);  // Opcional: Manejar el estado de carga
  
    const { error } = await supabase
      .from('usuarios')
      .delete()
      .eq('usuario_id', selectedUserId);
  
    if (error) {
      console.error("Error deleting user: ", error);
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Vuelva a intentar mas tarde: " + error.message // Ajusta según necesites
      });
    } else {
      // Opcional: Actualizar el estado para reflejar que el usuario ha sido eliminado
      setUsuarios(prevUsuarios => prevUsuarios.filter(user => user.usuario_id !== selectedUserId));
      setSelectedUserId(null);  // Resetear el usuario seleccionado
      setNotification({
        visible: true,
        titulo: "Éxito",
        mensaje: "Se ha eliminado el usuario" // Ajusta según necesites
      });
    }
  
    setLoading(false);  // Opcional: Restablecer el estado de carga
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }


  function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año}`;
  }

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.primer_nombre?.toLowerCase().includes(searchTerm) ||
    usuario.apellido_paterno?.toLowerCase().includes(searchTerm) ||
    usuario.correo_electronico?.toLowerCase().includes(searchTerm)
    // Añadir mas campos si quieremos que se pueda buscar por mas campos
  );

       // Manejar cambios en los inputs
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
    setToggle(!toggle);
setSearch(true);
    console.log(formState)
  };
  
  
    const handleGrupoTipoChange = (id_sub_entidad) => {
      // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
      handleInputChange({ target: { name: 'id_sub_entidad', value: id_sub_entidad } });
    };

    const handleGrupoTipoChange4 = (id_vacante) => {
        // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
        handleInputChange({ target: { name: 'id_vacante', value: id_vacante } });
      };
  
    const handleGrupoTipoChange2 = (id_entidad_empresa) => {
      // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
      handleInputChange({ target: { name: 'id_entidad_empresa', value: id_entidad_empresa } });
  
    };

    const handleGrupoTipoChange3 = (id_puestos) => {
        // Actualiza el estado del formulario para incluir el nuevo id de tipo de grupo seleccionado
        handleInputChange({ target: { name: 'id_puestos', value: id_puestos } });
    
      };

    const handleSelectChange = (value, fieldName) => {
        setFormState(prevState => ({
          ...prevState,
          [fieldName]: value,
        }));
      };
  

  return (
    <>
    <div className="p-4 mx-auto w-full max-w-6xl mt-4">
    <div className="rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
        <h1 className="text-2xl font-bold mb-2">Busqueda avanzada</h1>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex-auto">
        <ListaEntidadesEmpresas selectedTipoId={formState.id_entidad_empresa} onGrupoTipoChange={handleGrupoTipoChange2} />
        </div>
        <div className="flex-auto">
        <ListaSubEntidad disabled={formState.id_entidad_empresa ? false : true } selectedTipoId={formState.id_sub_entidad} onGrupoTipoChange={handleGrupoTipoChange} filter={formState.id_entidad_empresa} />
        </div>
        
        <div className="flex-auto">
        <label className="font-semibold" htmlFor="tipo_usuario">
            <span className="block text-sm font-medium mb-1">Tipo de usuario</span>
            </label>
        <Select
              onValueChange={(value) => handleSelectChange(value, "tipo_usuario")}
              value={formState.tipo_usuario}
            >
              <SelectTrigger id="group-type">
                <SelectValue placeholder="Seleccione uno" />
              </SelectTrigger>

              <SelectContent position="popper">
                {tipo_usuario.map((nivel, index) => (
                  <SelectItem key={index} value={nivel.valor}>
                    {nivel.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>

            <div className="flex-auto">
<ListaVacantes handleGrupoTipoChange={handleGrupoTipoChange4} selectedTipoId={formState.id_vacante} />
            </div>
<div className="flex-auto" >
<ListaPuesto handleGrupoTipoChange={handleGrupoTipoChange3} selectedTipoId={formState.id_puestos} />
</div>

<div className="flex flex-row">
<div className="flex-auto">
<label className="font-semibold" htmlFor="tipo_usuario">
            <span className="block text-sm font-medium mb-1">Inicial:</span>
            </label>
    <Input type="date" name="fecha_inicio" value={formState.fecha_inicio} onChange={handleInputChange} />
    </div>
    <div className="flex-auto">
    <label className="font-semibold" htmlFor="tipo_usuario">
            <span className="block text-sm font-medium mb-1">Final:</span>
            </label>
    <Input type="date" name="fecha_fin" value={formState.fecha_fin} onChange={handleInputChange} />
</div>
</div>
        </div>

      <div className="flex w-full max-w-full items-center space-x-2 mb-10 mt-4">
        <Input placeholder="Buscar" type="text" onChange={handleSearchChange} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Nombre y apellido</TableHead>
            <TableHead className="w-[200px]">Nombre Perfil</TableHead>
            <TableHead className="w-[250px]">Email</TableHead>
            <TableHead className="w-[150px]">Fecha Registro</TableHead>
            <TableHead className="w-[100px]">Seleccionar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsuarios.map((usuario, index) => (
            <TableRow key={index}>
              <TableCell>
  {usuario.primer_nombre || usuario.apellido_paterno ? `${usuario.primer_nombre || ""} ${usuario.apellido_paterno || ""}`.trim() : "Sin asignar"}
</TableCell>
              <TableCell>{usuario.tipo_usuario}</TableCell>
              <TableCell>{usuario.correo_electronico}</TableCell>
              <TableCell>{formatearFecha(usuario.fecha_creado)}</TableCell>
              <TableCell><input
                  type="checkbox"
                  checked={selectedUserId === usuario.usuario_id}
                  onChange={() => handleCheckboxChange(usuario.usuario_id)}
                  className="accent-black h-5 w-5"
                /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4">
      <Button
          className={`bg-black text-white ${!selectedUserId ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!selectedUserId || !permisos.modificarUsuario}
          onClick={() => router.push(`/dashboard/personal/${selectedUserId}`)}
        >
          Modificar 
        </Button>
        
        <Button
  className={`bg-red-500 text-white ${!selectedUserId ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={!selectedUserId || !permisos.eliminarUsuario}
  onClick={handleDeleteUser}
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
