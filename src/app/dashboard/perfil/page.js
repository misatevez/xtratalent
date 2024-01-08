'use client'
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function page() {
    const [user, setUser] = useState(null);
    const [informacion, setInformacion] = useState(null);

    useEffect(() => {
        const session = supabase.auth.getUser()
            .then((user) => setUser(user.data.user))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (!user) return;
        const getData = async () => {
            const { data, error } = await supabase
                .from('usuarios')
                .select('*')
                .eq('correo_electronico', user.email)
                .single();
            if (error) {
                console.error(error);
                return;
            }
            setInformacion(data);
        };
        getData();
    }, [user]);

    // Función para capitalizar la primera letra de cada palabra en un string
    const capitalize = (str) => {
        return str.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    // Campos que no queremos mostrar
    const excludedFields = [
        "password", "fecha_creado", "fecha_subido", "user_id", "usuario_id", "id_entidad_empresa"
    ];

    return (
        <div className="p-4 mx-auto w-full max-w-2xl mt-4">
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Información del Perfil</h3>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    {
                        informacion && Object.entries(informacion).map(([key, value]) => {
                            if (value && !excludedFields.includes(key)) {
                                return (
                                    <div key={key} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{capitalize(key)}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{value}</dd>
                                    </div>
                                );
                            }
                            return null;
                        })
                    }
                </dl>
            </div>
        </div>
    );
}
