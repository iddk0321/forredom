import { Repository } from '@/types/github'
import { useParams, useRouter } from 'next/navigation'
import { Star } from '@/components/icons'
import { formatCompactNumber } from '@/utils/formatCompactNumber'
import { formatToISODate } from '@/utils/formatToISODate'
import { useTranslation } from '@/i18n/client'
import { useUserRepositoriesQuery } from '@/app/[lng]/[username]/_query/useUserRepositoriesQuery'
import { useViewControlStore } from '@/app/[lng]/[username]/_store/useViewControlStore'
import { useEffect } from 'react'
import { NoDataError } from '@/api/errors'
import InfiniteScroll from 'react-infinite-scroll-component'

export function UserRepositories({ username }: { username: string }) {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useTranslation(lng, 'filter')
  const { data, hasNextPage, fetchNextPage } =
    useUserRepositoriesQuery(username)

  const selectedSort = useViewControlStore((s) => s.selectedSort)
  const selectedLanguage = useViewControlStore((s) => s.selectedLanguage)
  const setLanguageItems = useViewControlStore((s) => s.setLanguageItems)

  useEffect(() => {
    setLanguageItems([
      { key: 'all', value: 'all', label: `${t('allLanguage')}` },
      ...Array.from(
        new Set(
          data?.pages
            .flat()
            .map((repo) => repo.language)
            .filter((lang): lang is string => typeof lang === 'string'),
        ),
      ).map((lang) => ({ key: lang, value: lang, label: lang })),
    ])
  }, [data])

  const displayedRepos =
    data?.pages
      .flat()
      .filter(
        (repo) =>
          repo.language === selectedLanguage || selectedLanguage === 'all',
      )
      .sort((a, b) => {
        if (selectedSort === 'lastUpdate') {
          return (
            new Date(b.updated_at ?? 0).getTime() -
            new Date(a.updated_at ?? 0).getTime()
          )
        }
        if (selectedSort === 'stars') {
          return (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0)
        }
        return 0
      }) ?? []

  if (displayedRepos.length === 0) {
    throw new NoDataError('No Repositories')
  }

  return (
    <InfiniteScroll
      dataLength={displayedRepos.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={null}
    >
      <ul className="border rounded-bl-lg rounded-br-lg">
        {displayedRepos.map((repo) => (
          <UserRepositoryItem key={repo.id} data={repo} />
        ))}
      </ul>
    </InfiniteScroll>
  )
}

function UserRepositoryItem({ data }: { data: Repository }) {
  const params = useParams<{ lng: string; username: string }>()
  const router = useRouter()

  const handleClick = (repo: string) => {
    const { lng, username } = params
    router.push(`/${lng}/${username}/${repo}`)
  }

  return (
    <li
      key={data.id}
      className="flex justify-between items-center border-b p-2 last:border-b-0"
    >
      <div className="flex gap-2 min-w-0 items-center truncate">
        <span
          className="font-semibold hover:underline cursor-pointer "
          onClick={() => handleClick(data.name)}
        >
          {data.name}
        </span>
        <span className="text-sm text-gray-500 truncate flex-1 mr-6">
          {data.description}
        </span>
      </div>
      <div className="flex gap-4 shrink-0">
        <span className="flex items-center gap-1 text-sm text-gray-500 w-16 justify-start">
          <Star />
          {formatCompactNumber(data.stargazers_count)}
        </span>
        <span className="text-sm text-gray-500">
          {formatToISODate(data.updated_at || '')}
        </span>
      </div>
    </li>
  )
}
