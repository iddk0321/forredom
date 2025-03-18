import { useParams } from 'next/navigation'
import { useTranslation } from '@/i18n/client'
import { useUserRepositoryQuery } from '@/app/[lng]/[username]/[repo]/_query/useUserRepositoryQuery'
import { Fork, Issue, Star } from '@/components/icons'
import { formatCompactNumber } from '@/utils/formatCompactNumber'
import Link from 'next/link'
import { Button } from '@/components/ui'

export function RepositoryDetail({
  username,
  repo,
}: {
  username: string
  repo: string
}) {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useTranslation(lng, 'messages')
  const { data } = useUserRepositoryQuery({ username, repo })

  return (
    <div className="flex flex-col border rounded-lg p-4 gap-2 min-w-[330px]">
      <span className="font-bold text-3xl ">{data.name}</span>
      <span className="text-gray-500 max-w-7xl max-w-[400px]">
        {data.description}
      </span>
      <div className="flex justify-between text-gray-500 mb-4">
        <div className="flex gap-3">
          <span>{data.language}</span>
          <div className="flex items-center gap-1">
            <Star />
            {formatCompactNumber(data.stargazers_count)}
          </div>
          <div className="flex items-center gap-1">
            <Fork />
            {formatCompactNumber(data.forks_count)}
          </div>
          <div className="flex items-center gap-1">
            <Issue />
            {formatCompactNumber(data.open_issues_count)}
          </div>
        </div>
      </div>
      <Link
        href={data.clone_url ?? ''}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="w-full">{t('goToGithub')}</Button>
      </Link>
    </div>
  )
}
