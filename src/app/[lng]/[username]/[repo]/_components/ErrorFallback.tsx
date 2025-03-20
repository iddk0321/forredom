'use client'

import { useTranslation } from '@/i18n/client'
import { ForbiddenError, NotFoundError } from '@/api/errors'
import MessageTemplate from '@/components/common/MessageTemplate'
import { useParams } from 'next/navigation'

export function ErrorFallback({ error }: { error: Error }) {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useTranslation(lng, 'messages')

  if (error instanceof NotFoundError) {
    return <MessageTemplate title={t('dataNotFoundError')} />
  }
  if (error instanceof ForbiddenError) {
    return <MessageTemplate title={t('forbiddenError')} description={t('tryLater')} />
  }

  return <MessageTemplate title={t('unknownError')} description={t('tryLater')} />
}
