'use client'
import { useState } from 'react';
import supabase from '@/lib/supabaseClient';
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RegistroPublico( { formState, handleSubmit, handleInputChange } ) {


  return (
    <form className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl" onSubmit={handleSubmit}>
      <div className="h-fit overflow-hidden">
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <h1 className="text-2xl font-bold">Registro</h1>
            <p className="text-gray-500 dark:text-gray-400">Por favor complete el formulario para crear una cuenta</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-1">
              <div className="space-y-2">
                <Label htmlFor="first-name">Primer nombre:</Label>
                <Input name="primer_nombre" value={ formState.primer_nombre } onChange={handleInputChange} placeholder="Juan"  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middle-name">Segundo nombre:</Label>
                <Input name="segundo_nombre" value={formState.segundo_nombre} onChange={handleInputChange}  placeholder="Javier"  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Apellido paterno:</Label>
                <Input name="apellido_paterno" value={formState.apellido_paterno} onChange={handleInputChange} placeholder="Diaz"  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name2">Apellido materno:</Label>
                <Input name="apellido_materno" value={formState.apellido_materno} onChange={handleInputChange} placeholder="Gomez"  />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-of-birth">Fecha de nacimiento:</Label>
              <Input name="fecha_nacimiento" value={formState.fecha_nacimiento} onChange={handleInputChange}  type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dpi-cui">DPI/CUI:</Label>
              <Input name="numero_dpi" value={formState.numero_dpi} onChange={handleInputChange} placeholder="1234567891011"  />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">País de origen:</Label>
              <Input name="pais_origen" value={formState.pais_origen} onChange={handleInputChange} placeholder="Guatemala"  />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email:</Label>
              <Input name="correo_electronico" value={formState.correo_electronico} onChange={handleInputChange} placeholder="example@mail.com" required type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password:</Label>
              <Input name="password" value={formState.password} onChange={handleInputChange} required type="password" />
            </div>
            <Button className="w-full" type="submit">
              Registrarse
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
