import { dir } from 'i18next'
import './global.css'
import { PropsWithChildren } from 'react'
import { languages } from '@/i18n/settings'

type Props = PropsWithChildren & {
  params: Promise<{ lng: string }>
}

export default async function RootLayout({ children, params }: Props) {
  const { lng } = await params

  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>{children}</body>
    </html>
  )
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}
