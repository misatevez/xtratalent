/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/9N13uv8MzP2
 */
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

export function Notificacion({titulo, mensaje, visible, onClose }) {
  if (!visible) return null;

  return (
    <aside key="1" className="fixed right-0 top-0 m-4 max-w-sm">
      <Card className="bg-white shadow-lg overflow-hidden">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Notificacion</CardTitle>
            <BellIcon className="w-4 h-4 cursor-pointer" onClick={onClose} />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <Avatar className="w-10 h-10" src="/placeholder.svg?height=40&width=40" />
              <div>
                <p className="font-bold">{titulo}</p>
                <p className="text-sm text-gray-500">{mensaje}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-start">
            <LogOutIcon className="w-4 h-4 cursor-pointer" onClick={onClose} />
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}


function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>)
  );
}


function LogOutIcon(props) {
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>)
  );
}
