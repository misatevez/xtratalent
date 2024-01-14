import { Inter } from 'next/font/google'
import './globals.css'
import { PermissionsProvider } from '@/components/PermissionsContext'




const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Xtra Talent',
  description: 'Xtra Talent is a platform for discovering and showcasing talent.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
      <body className={inter.className}>

        {children}
        </body>
    </html>
  )
}
