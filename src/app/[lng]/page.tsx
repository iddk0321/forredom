'use client'

import { useTranslation } from '@/i18n/client'
import { UsernameSearchForm } from './_components/UsernameSearchForm'
import { useParams, useRouter } from 'next/navigation'

export default function MainPage() {
  const { t } = useTranslation()
  const { lng } = useParams<{ lng: string }>()
  const router = useRouter()

  const handleSubmit = (username: string) => {
    router.push(`/${lng}/${username}`)
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col h-full w-2xl items-center justify-center flex-1 max-w-3xl mx-4">
        <h1 className="font-bold text-5xl mb-6">{t('title')}</h1>
        <UsernameSearchForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
