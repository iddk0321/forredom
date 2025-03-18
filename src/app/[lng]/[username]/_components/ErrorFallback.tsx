'use client'

import { useTranslation } from '@/i18n/client'
import { ForbiddenError, NoDataError, NotFoundError } from '@/api/errors'
import MessageTemplate from '@/components/common/MessageTemplate'

export function ErrorFallback({ error }: { error: Error }) {
  const { t } = useTranslation('messages')

  if (error instanceof NoDataError) {
    return <MessageTemplate title={t('dataNotFoundError')} />
  }
  if (error instanceof NotFoundError) {
    return <MessageTemplate title={t('userNotFoundError')} />
  }
  if (error instanceof ForbiddenError) {
    return (
      <MessageTemplate
        title={t('forbiddenError')}
        description={t('tryLater')}
      />
    )
  }

  return (
    <MessageTemplate title={t('unknownError')} description={t('tryLater')} />
  )
}
