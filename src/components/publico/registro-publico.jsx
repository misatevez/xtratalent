'use client'
import { useState } from 'react';
import supabase from '@/lib/supabaseClient';
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RegistroPublico() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dpiCui, setDpiCui] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formState)

    // Insertar en Supabase
    const { data, error } = await supabase.from('usuarios').insert([formState]);


    supabase.auth.signUp({
      email: formState.correo_electronico,
      password: formState.password,
    });

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
        mensaje: "Se ha creado su usuario" // Ajusta según necesites
      });
    }
  };

  return (
    <form className="p-8 space-y-8 mt-8 mb-8 mx-auto max-w-7xl" onSubmit={handleSubmit}>
      <div className="h-fit overflow-hidden">
        <Card className="mx-auto max-w-lg space-y-6">
          <CardHeader>
            <h1 className="text-3xl font-bold">Registro</h1>
            <p className="text-gray-500 dark:text-gray-400">Por favor complete el formulario para crear una cuenta</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-1">
              <div className="space-y-2">
                <Label htmlFor="first-name">Primer nombre:</Label>
                <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Juan" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middle-name">Segundo nombre:</Label>
                <Input id="middle-name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} placeholder="Javier" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Apellido paterno:</Label>
                <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Diaz" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name2">Apellido materno:</Label>
                <Input id="last-name2" value={lastName2} onChange={(e) => setLastName2(e.target.value)} placeholder="Gomez" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-of-birth">Fecha de nacimiento:</Label>
              <Input id="date-of-birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dpi-cui">DPI/CUI:</Label>
              <Input id="dpi-cui" value={dpiCui} onChange={(e) => setDpiCui(e.target.value)} placeholder="1234567891011" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">País de origen:</Label>
              <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Guatemala" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email:</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.com" required type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password:</Label>
              <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} required type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password:</Label>
              <Input id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required type="password" />
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
