'use client'
import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";
import { Notificacion } from "@/components/notification";
import Volver from "@/components/ui/volver";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function page({params}) {
    const id_renglon_presupuestario = params.slug;
    const [formState, setFormState] = useState({
        numero: '',
        tipo: '',
        nombre: '',
        descripcion: ''
      });
    
      const [notification, setNotification] = useState({
        visible: false,
        titulo: "",
        mensaje: ""
      });

    useEffect(() => {
        const fetchRenglonPresupuestario = async () => { 

            const { data, error } = await supabase
                .from('renglon_presupuestario')
                .select()
                .eq('id_renglon_presupuestario', id_renglon_presupuestario)
                .single();

        if(error){
            console.log(error);
        }
        else {
            setFormState(data);
        }
    }
        fetchRenglonPresupuestario();

    }, [id_renglon_presupuestario]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
          .from('renglon_presupuestario')
          .update(formState)
          .match({id_renglon_presupuestario: id_renglon_presupuestario});
    
       
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
          mensaje: "Se ha actualizado su renglon presupuestarios" // Ajusta según necesites
        });
      }
      }

          // Manejar cambios en los inputs
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

    return (
        <>
      <div className=" p-4 mx-auto w-full max-w-2xl mt-4">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md mt-4">
        <h2 className="text-lg font-bold mb-4">Modificar Renglón</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
          <label className="block text-sm font-medium mb-1" htmlFor="group-name">
              Renglón Número:
            </label>
            <Input id="group-name" name="numero" value={formState.numero} onChange={handleInputChange} placeholder="021" />
          </div>
          <div>
          <label className="block text-sm font-medium mb-1" htmlFor="group-name">
              Tipo:
            </label>
            <Input id="group-name" name="tipo" value={formState.tipo} onChange={handleInputChange} placeholder="Temporal" />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1" htmlFor="group-name">
            Nombre Renglón Contrato:
          </label>
          <Input id="group-name" name="nombre" value={formState.nombre} onChange={handleInputChange} placeholder="Por servicios técnicos" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1" htmlFor="group-description">
            Descripción Renglón:
          </label>
          <textarea
            value={formState.descripcion}
            onChange={handleInputChange}
            name="descripcion"
            className="resize-none border rounded-md w-full p-2"
            id="group-description"
            placeholder="El renglón 021, se constituye un contrato de trabajo con el estado en ..."
            rows="4"
          />
        </div>
        <div className="flex justify-around mt-4">
          <Button>Guardar</Button>
          <Volver/>
        </div>
      </form>
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

