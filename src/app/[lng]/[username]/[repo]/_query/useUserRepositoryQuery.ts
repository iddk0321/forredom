import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchRepo } from '@/api/github'

export const useUserRepositoryQuery = ({ username, repo }: { username: string; repo: string }) => {
  return useSuspenseQuery({
    queryKey: ['repo', username, repo],
    queryFn: () => fetchRepo(username, repo),
  })
}
