import { dir } from 'i18next'
import './global.css'
import { PropsWithChildren } from 'react'
import { languages } from '@/i18n/settings'
import { ThemeProvider } from '@/components/ThemeProvider'

type Props = PropsWithChildren & {
  params: Promise<{ lng: string }>
}

export default async function RootLayout({ children, params }: Props) {
  const { lng } = await params

  return (
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}
