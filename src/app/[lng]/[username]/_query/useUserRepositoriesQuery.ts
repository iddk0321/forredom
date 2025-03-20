import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { fetchRepos } from '@/api/github'

export const PAGE_SIZE = 30

export const useUserRepositoriesQuery = (username: string) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['repos', username],
    queryFn: ({ pageParam = 1 }) => fetchRepos(username, pageParam, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length >= PAGE_SIZE ? allPages.length + 1 : null,
  })
}
