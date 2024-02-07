'use client'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { useEffect, useState } from 'react';
import supabase from "@/lib/supabaseClient";
import usePermisosMetricas from "@/lib/usePermisosMetricas";


export function Metricas() {
  const permisos = usePermisosMetricas();
  const [userCount, setUserCount] = useState(0);
  const [gruposCount, setGruposCount] = useState(0);
  const [tipogruposCount, setTipoGruposCount] = useState(0);
  const [tipoEntidadCount, SettipoEntidadCount] = useState(0);
  const [entidadEmpresaCount, SetentidadEmpresaCount] = useState(0);
  const [subEntidadesCount, SetsubEntidadesCount] = useState(0);
  const [direccionesCount, setDireccionesCount] = useState(0);
  const [departamentosCount, setDepartamentosCount] = useState(0);

  useEffect(() => {
    async function fetchUserCount() {
      const { count } = await supabase.from('usuarios').select('*', { count: 'exact' });
      setUserCount(count);
    }

    fetchUserCount();
  }, []);

  useEffect(() => {
    async function setTipoGrupsCount() {
      const { count } = await supabase.from('grupotipo').select('*', { count: 'exact' });
      setTipoGruposCount(count);
    }

    setTipoGrupsCount();
  }, []);


  useEffect(() => {
    async function fetchGrupos() {
      const { count } = await supabase.from('grupo_corporativo').select('*', { count: 'exact' });
      setGruposCount(count);
    }

    fetchGrupos();
  }, []);

  useEffect(() => {
    async function setTipoEntidad() {
      const { count } = await supabase.from('subtipo_entidad').select('*', { count: 'exact' });
      SettipoEntidadCount(count);
    }

    setTipoEntidad();
  }, []);

  useEffect(() => {
    async function getEntidadEmpresa() {
      const { count } = await supabase.from('entidad_empresa').select('*', { count: 'exact' });
      SetentidadEmpresaCount(count);
    }

    getEntidadEmpresa();
  }, []);

  useEffect(() => {
    async function getSubEntidades() {
      const { count } = await supabase.from('sub_entidad').select('*', { count: 'exact' });
      SetsubEntidadesCount(count);
    }

    getSubEntidades();
  }, []);



  useEffect(() => {
    async function fetchDireccionesCount() {
      const { count } = await supabase.from('direcciones').select('*', { count: 'exact' });
      setDireccionesCount(count);
    }

    fetchDireccionesCount();
  }, []);

  useEffect(() => {
    async function fetchDptoCount() {
      const { count } = await supabase.from('departamentos').select('*', { count: 'exact' });
      setDepartamentosCount(count);
    }

    fetchDptoCount();
  }, []);

  return (
    (
<>    
    {permisos.metricas &&
    <div
      key="1"
      className="flex flex-wrap gap-4 p-6 m-auto justify-center">

      <Card
        className="w-1/4 p-4 min-w-[250px] max-w-[300px] bg-white shadow rounded">
        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Usuarios registrados</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CardContent className="p-4 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400 text-3xl font-bold">{userCount}</p>
          </CardContent>
        </CardContent>
      </Card>

      <Card
        className="w-1/4 p-4 min-w-[250px] max-w-[300px] bg-white shadow rounded">
        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tipos grupos corporativos</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CardContent className="p-4 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400 text-3xl font-bold">{tipogruposCount}</p>
          </CardContent>
        </CardContent>
      </Card>

      <Card
        className="w-1/4 p-4 min-w-[250px] max-w-[300px] bg-white shadow rounded">
        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Grupos corporativos</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CardContent className="p-4 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400 text-3xl font-bold">{gruposCount}</p>
          </CardContent>
        </CardContent>
      </Card>

      <Card
        className="w-1/4 p-4 min-w-[250px] max-w-[300px] bg-white shadow rounded">
        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Subtipo Entidades</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CardContent className="p-4 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400 text-3xl font-bold">{tipoEntidadCount}</p>
          </CardContent>
        </CardContent>
      </Card>

      <Card
        className="w-1/4 p-4 min-w-[250px] max-w-[300px] bg-white shadow rounded">
        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Entidades empresa</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CardContent className="p-4 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400 text-3xl font-bold">{entidadEmpresaCount}</p>
          </CardContent>
        </CardContent>
      </Card>

      <Card
        className="w-1/4 p-4 min-w-[250px] max-w-[300px] bg-white shadow rounded">
        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Subentidades</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CardContent className="p-4 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400 text-3xl font-bold">{subEntidadesCount}</p>
          </CardContent>
        </CardContent>
      </Card>


      <Card
        className="w-1/4 p-4 min-w-[250px] max-w-[300px] bg-white shadow rounded">
        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Direcciones</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CardContent className="p-4 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400 text-3xl font-bold">{direccionesCount}</p>
          </CardContent>
        </CardContent>
      </Card>
      <Card
        className="w-1/4 p-4 min-w-[250px] max-w-[300px] bg-white shadow rounded">
        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Departamentos</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CardContent className="p-4 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400 text-3xl font-bold">{departamentosCount}</p>
          </CardContent>
        </CardContent>
      </Card>
    </div>
    }
    {
      !permisos.metricas &&
      <div className="flex flex-col items-center justify-center h-full mt-4">
        <p className="text-3xl font-semibold dark:text-gray-200">Bienvenidos</p>
      </div>
    }
    </>
    )
  );
}
