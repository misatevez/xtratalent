/**
 * v0 by Vercel.
 * @see https://v0.dev/t/k8dyNyHXaze
 */

'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'


export default function Login() {
  const router = useRouter()
  return (
    <>
      <div className="min-h-screen bg-white flex">
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="max-w-md w-full">
            <div>
              {/* <img
                alt="Logo"
                className="mx-auto h-12 w-auto"
                height="48"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "48/48",
                  objectFit: "cover",
                }}
                width="48"
              /> */}
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">¡Bienvenidos!</h2>
            </div>
            <div className="mt-3">
              <div>
                <div>
                  <p className="text-sm text-center font-medium text-gray-700">Ingresa a tu cuenta</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="space-y-6">
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <label className="sr-only" htmlFor="email-address">
                        Email
                      </label>
                      <input
                        autoComplete="email"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        id="email-address"
                        name="email"
                        placeholder="Email"
                        required
                        type="email"
                      />
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="password">
                        Contraseña
                      </label>
                      <input
                        autoComplete="current-password"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        required
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                      />
                      <label className="ml-2 block text-sm text-gray-900" htmlFor="remember-me">
                        Recordarme
                      </label>
                    </div>
                    <div className="text-sm">
                      <a className="font-medium text-indigo-600 hover:text-indigo-500" href="#">
                        ¿Recuperar contraseña?
                      </a>
                    </div>
                  </div>
                  <div>
                    <Button onClick={() => router.push('/dashboard')} className="w-full" variant="default">
                      Iniciar sesión
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">¿Necesitas ayuda?</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <Button className="w-full" variant="outline">
                    <SmartphoneIcon className="text-green-500" />
                    WhatsApp
                  </Button>
                </div>
                <div>
                  <Button className="w-full" variant="outline">
                    <MailIcon className="text-blue-500" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
          height="490"
          src="/placeholder.svg"
          style={{
            aspectRatio: "861/490",
            objectFit: "cover",
          }}
          width="861"
        />
      </div>
    </>
  )
}

function MailIcon(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function SmartphoneIcon(props) {
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
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  )
}
