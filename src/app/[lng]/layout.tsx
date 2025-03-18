'use client'

import './global.css'
import { ReactNode } from 'react'
import { Header, QueryClientProvider, ThemeProvider } from '@/components/common'
import { I18nextProvider } from 'react-i18next'
import i18next from '@/i18n/client'
import { useParams } from 'next/navigation'
import { dir } from 'i18next'

export default function RootLayout({ children }: { children: ReactNode }) {
  const { lng } = useParams<{ lng: string }>()

  return (
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider>
            <I18nextProvider i18n={i18next}>
              <Header />
              <div className="min-h-[calc(100vh-64px)] m-auto flex max-w-[1280px]">
                {children}
              </div>
            </I18nextProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
