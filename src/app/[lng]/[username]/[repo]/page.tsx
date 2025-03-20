'use client'

import { Suspense } from 'react'
import { Skeleton } from '@/components/ui'
import { ErrorBoundary } from 'react-error-boundary'
import { RepositoryDetail } from '@/app/[lng]/[username]/[repo]/_components/RepositoryDetail'
import { ErrorFallback } from '@/app/[lng]/[username]/[repo]/_components/ErrorFallback'
import { useParams } from 'next/navigation'

export default function RepositoryPage() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  return (
    <div className="flex w-full items-center justify-center">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Skeleton className="w-[330px] h-[160px]" />}>
          <RepositoryDetail username={username} repo={repo} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
