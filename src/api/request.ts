import { ForbiddenError, NotFoundError, UnknownError } from '@/api/errors'

export const apiRequest = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)
  const body = await response.json()

  if (response.status === 404) {
    throw new NotFoundError(body?.message)
  }
  if (response.status === 403) {
    throw new ForbiddenError(body?.message)
  }
  if (!response.ok) {
    throw new UnknownError(body?.message)
  }

  return body as T
}
