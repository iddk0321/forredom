import './global.css'
import { dir } from 'i18next'
import { ReactNode } from 'react'
import {
  Header,
  I18nProvider,
  QueryClientProvider,
  ThemeProvider,
} from '@/components/common'

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ lng: 'ko' | 'en' }>
}) {
  const { lng } = await params

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
            <I18nProvider lng={lng}>
              <Header />
              <div className="min-h-[calc(100vh-64px)] m-auto flex max-w-[1280px]">
                {children}
              </div>
            </I18nProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
