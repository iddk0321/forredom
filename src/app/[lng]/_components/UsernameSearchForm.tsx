'use client'

import { FormEvent, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n/client'
import { useParams } from 'next/navigation'

type SearchFormProps = {
  defaultValue?: string
  onSubmit: (username: string) => void
}

export function UsernameSearchForm({
  defaultValue,
  onSubmit,
}: SearchFormProps) {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useTranslation(lng, 'searchForm')
  const [username, setUsername] = useState(defaultValue || '')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(username)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" role="form">
      <div className="flex gap-2 mb-2">
        <Input
          name={'username'}
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t('placeholder')}
        />
        <Button type="submit">{t('search')}</Button>
      </div>
    </form>
  )
}
