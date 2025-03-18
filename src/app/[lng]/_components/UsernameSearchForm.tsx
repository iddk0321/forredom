'use client'

import { FormEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n/client'

type SearchFormProps = {
  defaultValue?: string
  onSubmit: (username: string) => void
}

export function UsernameSearchForm({
  defaultValue,
  onSubmit,
}: SearchFormProps) {
  const { t } = useTranslation('searchForm')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    onSubmit(username)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2 mb-2">
        <Input
          name={'username'}
          defaultValue={defaultValue}
          placeholder={t('placeholder')}
        />
        <Button type="submit">{t('search')}</Button>
      </div>
    </form>
  )
}
