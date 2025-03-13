import { useTranslation } from '@/i18n'
import { languages } from '@/i18n/settings'
import Link from 'next/link'

type Props = {
  params: Promise<{ lng: string }>
}

export default async function Home({ params }: Props) {
  const { lng } = await params
  const { t } = await useTranslation(lng, 'home')

  return (
    <>
      <h1 className="bg-red-500 text-3xl">{t('title')}</h1>
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <Link key={index} href={`/${l}`}>
              {t('link', { link: l })}
            </Link>
          )
        })}
    </>
  )
}
