'use client'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { useEffect, useState } from 'react';
import supabase from "@/lib/supabaseClient";


export function Metricas() {

  const [userCount, setUserCount] = useState(0);
  const [entidadesCount, setEntidadesrCount] = useState(0);
  const [departamentosCount, setDepartamentosCount] = useState(0);

  useEffect(() => {
    async function fetchUserCount() {
      const { count } = await supabase.from('usuarios').select('*', { count: 'exact' });
      setUserCount(count);
    }

    fetchUserCount();
  }, []);

  useEffect(() => {
    async function fetchEntidadesCount() {
      const { count } = await supabase.from('direcciones').select('*', { count: 'exact' });
      setEntidadesrCount(count);
    }

    fetchEntidadesCount();
  }, []);

  useEffect(() => {
    async function fetchDptoCount() {
      const { count } = await supabase.from('departamentos').select('*', { count: 'exact' });
      setDepartamentosCount(count);
    }

    fetchDptoCount();
  }, []);

  return (
    (<div
      key="1"
      className="flex flex-col md:flex-row gap-4 p-6 m-auto justify-center">
      <Card
        className="flex-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
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
        className="flex-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Direcciones</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CardContent className="p-4 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400 text-3xl font-bold">{entidadesCount}</p>
          </CardContent>
        </CardContent>
      </Card>
      <Card
        className="flex-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Departamentos</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CardContent className="p-4 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400 text-3xl font-bold">{departamentosCount}</p>
          </CardContent>
        </CardContent>
      </Card>
    </div>)
  );
}
