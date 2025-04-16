import './globals.css'
import './text-sizes.css'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { AppContextProvider } from '@/context/AppContext'
import { TerminalWindow } from '@/components/common/TerminalWindow'
import Banner from '@/components/common/Banner'
import dynamic from 'next/dynamic'

// Import the AnimatedBackground component with dynamic loading to avoid SSR issues
const AnimatedBackground = dynamic(
  () => import('@/components/common/AnimatedBackground'),
  { ssr: false }
)

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
})

export const metadata: Metadata = {
  title: 'Terminal Portfolio',
  description: 'A terminal-style portfolio website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${jetbrainsMono.variable} min-h-screen bg-[#0d0c16]`}>
        <AnimatedBackground />
        <main className="relative z-10">
          <AppContextProvider>
            <Banner />
            <TerminalWindow>
              {children}
            </TerminalWindow>
          </AppContextProvider>
        </main>
      </body>
    </html>
  )
}