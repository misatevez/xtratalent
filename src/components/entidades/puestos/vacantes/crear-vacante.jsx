import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ListaDirecciones from '../../entidadempresa/subentidades/areas-direcciones/lista-direcciones';
import ListaDepartamentos from '../../entidadempresa/subentidades/areas-direcciones/departamento/lista-departamento';
import ListaSubEntidad from '../../entidadempresa/subentidades/lista-subentidad';
import ListaEntidadesEmpresas from '../../entidadempresa/lista-entidad-empresa';
import Volver from '@/components/ui/volver';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ListaRenglones from '../renglones-presupuestarios/lista-renglones';
import ListaPuesto from '../lista-puestos';
import { format } from 'date-fns';
import { Notificacion } from '@/components/notification';
import supabase from '@/lib/supabaseClient';

export default function CrearVacante() {

  const today = format(new Date(), 'yyyy-MM-dd');

  // Estado inicial para el formulario
  const [formState, setFormState] = useState({
    nombre: '',
    descripcion: '',
    id_direcciones: '',
    id_departamentos: '',
    id_entidad_empresa: '',
    id_sub_entidad: '',
    id_puestos: '',
    id_renglon_presupuestario: '',
    plazas: 0,
    estatus: '',
    vigencia_inicio: today,
    vigencia_final: today,
  });
  
  const [notification, setNotification] = useState({
    visible: false,
    titulo: "",
    mensaje: ""
  });


  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };
  
  
  const [selectedEntidad, setSelectedEntidad] = useState(null);
  const [selectedSubEntidad, setSelectedSubEntidad] = useState(null);
  const [selectedDireccion, setSelectedDireccion] = useState(null);

  // Función genérica para manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Funciones para manejar cambios en campos específicos
  const handleEntidadEmpresaChange = (id_entidad_empresa) => {
    handleInputChange({ target: { name: 'id_entidad_empresa', value: id_entidad_empresa } });
    setSelectedEntidad(id_entidad_empresa);
    setSelectedSubEntidad(null);
    setSelectedDireccion(null);
  };

  const handleSubEntidadChange = (id_sub_entidad) => {
    handleInputChange({ target: { name: 'id_sub_entidad', value: id_sub_entidad } });
    setSelectedSubEntidad(id_sub_entidad);
    setSelectedDireccion(null);
  };

  const handleDireccionChange = (id_direcciones) => {
    handleInputChange({ target: { name: 'id_direcciones', value: id_direcciones } });
    setSelectedDireccion(id_direcciones);
  };

  const handleDepartamentoChange = (id_departamentos) => {
    handleInputChange({ target: { name: 'id_departamentos', value: id_departamentos } });
  };

  const handlePuestoChange = (id_puestos) => {
    handleInputChange({ target: { name: 'id_puestos', value: id_puestos } });
  };

  const handleRenglonesChange = (id_renglon_presupuestario) => {
    handleInputChange({ target: { name: 'id_renglon_presupuestario', value: id_renglon_presupuestario } });
  };

  const handleStatusChange = (estatus) => {
    handleInputChange({ target: { name: 'estatus', value: estatus } });
  };

  const handleVigenciaDelChange = (vigencia_del) => {
    handleInputChange({ target: { name: 'vigencia_del', value: vigencia_del } });
  };

  const handleVigenciaAlChange = (vigencia_al) => {
    handleInputChange({ target: { name: 'vigencia_al', value: vigencia_al } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(formState);

    // Insertar en Supabase
    const { data, error } = await supabase.from('vacantes').insert([formState]);

    if (error) {
      setNotification({
        visible: true,
        titulo: "Error",
        mensaje: "Vuelva a intentar mas tarde: " + error.message // Ajusta según necesites
      });
    } else {
      setNotification({
        visible: true,
        titulo: "Éxito",
        mensaje: "Se ha creado su vacante" // Ajusta según necesites
      });
    }
  };

  const status = [
    { valor: "Activo - Vigente" },
    { valor: "Vencida" },
    { valor: "Cubierta" },
    { valor: "Cancelada" }
  ];

  return (
    <>
    <div className="p-4 mx-auto w-full max-w-2xl mt-4">
      <div className="rounded-lg shadow-lg">
        <div className="bg-white p-6 rounded-lg shadow-inner m-auto">
          <form onSubmit={handleSubmit}>
            <div>
              <h2 className="text-lg font-bold  mb-4">Crear Vacante</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ListaEntidadesEmpresas
                    selectedTipoId={formState.id_entidad_empresa}
                    onGrupoTipoChange={handleEntidadEmpresaChange}
                  />
                </div>
                <div>
                  <ListaSubEntidad
                    filter={selectedEntidad}
                    selectedTipoId={formState.id_sub_entidad}
                    onGrupoTipoChange={handleSubEntidadChange}
                  />
                </div>
                <div>
                  <ListaDirecciones
                    filter={selectedSubEntidad}
                    selectedTipoId={formState.id_direcciones}
                    onGrupoTipoChange={handleDireccionChange}
                  />
                </div>
                <div>
                  <ListaDepartamentos
                    filter={formState.id_direcciones}
                    selectedTipoId={formState.id_departamentos}
                    onGrupoTipoChange={handleDepartamentoChange}
                  />
                </div>
                <div>
                  <ListaPuesto
                    selectedTipoId={formState.id_puestos}
                    handleGrupoTipoChange={handlePuestoChange}
                  />
                </div>
                <div>
                  <ListaRenglones
                    selectedTipoId={formState.id_renglon_presupuestario}
                    handleGrupoTipoChange={handleRenglonesChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="group-name">
                    Plazas:
                  </label>
                  <Input type="number" name="plazas" value={formState.plazas} onChange={handleInputChange} id="group-name" placeholder="0" />
                </div>
                <div>
                  <>
                    <label className="block text-sm font-medium mb-1" htmlFor="group-type">
                      Estatus:
                    </label>
                    <Select onValueChange={handleStatusChange} value={formState.estatus}>
                      <SelectTrigger id="group-type">
                        <SelectValue placeholder="Seleccione uno" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {status.map((tipo, index) => (
                          <SelectItem key={index} value={tipo.valor.toString()}>{tipo.valor}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="group-type">
                    Vigente del:
                  </label>
                  <Input type="date" name="vigencia_inicio" value={formState.vigencia_inicio} onChange={handleInputChange} id="group-name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="group-type">
                    Hasta:
                  </label>
                  <Input type="date" name="vigencia_final" value={formState.vigencia_final} onChange={handleInputChange} id="group-name" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1" htmlFor="group-name">
                  Nombre:
                </label>
                <Input name="nombre" value={formState.nombre} onChange={handleInputChange} id="group-name" placeholder="Auxiliar tesorería" />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1" htmlFor="group-description">
                  Descripción:
                </label>
                <textarea
                  name="descripcion" value={formState.descripcion} onChange={handleInputChange}
                  className="resize-none border rounded-md w-full p-2"
                  id="group-description"
                  placeholder="La vacante..."
                  rows="4"
                />
              </div>
              <div className="flex justify-around mt-4">
                <Button>Guardar</Button>
                <Volver />
              </div>
            </div>
          </form>
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
