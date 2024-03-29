/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Tp6TAp6ytYx
 */
'use client'
import Link from "next/link"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { usePathname, useRouter } from 'next/navigation'
import Image from "next/image"
import supabase from "@/lib/supabaseClient"
import useUsuario from "@/lib/useUsuario"


export function Dashboard( {children} ) {
  const router = useRouter()
  const permisos = useUsuario();

  const pathname = usePathname()


  // supabase logout

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error logging out:', error.message)
    else router.push('/')
  }

  console.log(permisos.tipo_usuario);

  return (
    (<div key="1" className="flex flex-col w-full min-h-screen">
      <aside
        className="w-64 h-full bg-white dark:bg-gray-700 border-r fixed top-0 left-0 overflow-auto">
        <div className="flex items-center justify-center h-16 mt-3">
         <Image
         className="w-40"
          width={300}
          height={300}
          alt="Picture of the author"
         src={"https://i.ibb.co/FHFCs6b/2-LOGO-XTRAT-2023-V13.png"}
         />
        </div>
        <nav className="flex flex-col p-4">
        {permisos.tipo_usuario !== 'Externo' && (<Link
      
            className={`flex items-center gap-2 py-2 text-lg font-semibold text-gray-700 dark:text-gray-200 link ${pathname === '/dashboard/seguridad' ? 'active' : ''}`}
            href="/dashboard/seguridad">
            <LockIcon className="w-6 h-6" />
            Seguridad y acceso
          </Link>)}

          {permisos.tipo_usuario !== 'Externo' && ( <Link
            className={`flex items-center gap-2 py-2 text-lg font-semibold text-gray-700 dark:text-gray-200 link ${pathname === '/dashboard/entidades' ? 'active' : ''}`}
            href="/dashboard/entidades">
            <ServerIcon className="w-6 h-6" />
            Estructura Organizacional (Entidades)
          </Link>)}

          {permisos.tipo_usuario !== 'Externo' && ( <Link
           className={`flex items-center gap-2 py-2 text-lg font-semibold text-gray-700 dark:text-gray-200 link ${pathname === '/dashboard/personal' ? 'active' : ''}`}
            href="/dashboard/personal">
            <UserIcon className="w-6 h-6" />
            Administración de Personal
          </Link>)}
         
          {permisos.tipo_usuario !== 'Externo' && ( <Link
            className={`flex items-center gap-2 py-2 text-lg font-semibold text-gray-700 dark:text-gray-200 link ${pathname === '/dashboard/evaluaciones' ? 'active' : ''}`}
            href="/dashboard/evaluaciones">
            <FileQuestionIcon className="w-6 h-6" />
            Administración Evaluaciones
          </Link>  )}

         < Link
            className={`flex items-center gap-2 py-2 text-lg font-semibold text-gray-700 dark:text-gray-200 link ${pathname === '/dashboard/resolver' ? 'active' : ''}`}
            href="/dashboard/resolver">
            <FileIcon className="w-6 h-6" />
            Mis evaluaciones
          </Link>

          {permisos.tipo_usuario == 'Externo' && (
          <Link
            className={`flex items-center gap-2 py-2 text-lg font-semibold text-gray-700 dark:text-gray-200 link ${pathname === '/dashboard' ? 'active' : ''}`}
            href="/dashboard/perfil">
            <UserIcon className="w-6 h-6" />
           Mis datos
          </Link>)}

          {permisos.tipo_usuario !== 'Externo' && (
          <Link
            className={`flex items-center gap-2 py-2 text-lg font-semibold text-gray-700 dark:text-gray-200 link ${pathname === '/dashboard' ? 'active' : ''}`}
            href="/dashboard/metricas">
            <SettingsIcon className="w-6 h-6" />
            Métricas (Dashboard)
          </Link>)}

          {permisos.tipo_usuario !== 'Externo' && ( <Link
           className={`flex items-center gap-2 py-2 text-lg font-semibold text-gray-700 dark:text-gray-200 link ${pathname === '/dashboard/personal' ? 'active' : ''}`}
            href="/dashboard/personal">
            <UserIcon className="w-6 h-6" />
            Tipos y Contenido
          </Link>)}

          {permisos.tipo_usuario !== 'Externo' && ( <Link
           className={`flex items-center gap-2 py-2 text-lg font-semibold text-gray-700 dark:text-gray-200 link ${pathname === '/dashboard/personal' ? 'active' : ''}`}
            href="/dashboard/personal">
            <UserIcon className="w-6 h-6" />
            Licencia y Soporte
          </Link>)}

        </nav>
      </aside>
      <div className="flex flex-col w-full min-h-screen pl-64">
        <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
          <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="flex-1 ml-auto sm:flex-initial">
              <div className="relative" />
            </form>
            <Button className="rounded-full" size="icon" variant="ghost">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                  <UserIcon className="rounded-full h-8 w-8 border" />
                  <span className="sr-only">Toggle user menu</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => router.push('/dashboard/perfil')}  >Perfil</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLogout() }  >Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Button>
          </div>
        </header>
{children}
      </div>
    </div>)
  );
}


function LockIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>)
  );
}


function ServerIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>)
  );
}

function Profile(props) {
  return (
    (  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="profile"><g data-name="Layer 2"><circle cx="16" cy="6.96" r="6"></circle><path d="M30.86,26.84a15.07,15.07,0,0,0-4.11-7.47A12.47,12.47,0,0,0,25.13,18,15,15,0,0,0,16,15,15.24,15.24,0,0,0,5.24,19.37a15.07,15.07,0,0,0-4.11,7.47,3.42,3.42,0,0,0,.69,2.88A3.52,3.52,0,0,0,4.58,31H27.42a3.52,3.52,0,0,0,2.75-1.32A3.42,3.42,0,0,0,30.86,26.84Z"></path></g></svg>
    )
  );
}


function FileQuestionIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <path
        d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2" />
      <path d="M12 17h.01" />
    </svg>)
  );
}


function FileIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>)
  );
}


function CopyrightIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9.354a4 4 0 1 0 0 5.292" />
    </svg>)
  );
}


function SettingsIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>)
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}