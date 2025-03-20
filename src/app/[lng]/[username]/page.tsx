'use client'

import { Suspense } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { UsernameSearchForm } from '@/app/[lng]/_components/UsernameSearchForm'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/app/[lng]/[username]/_components/ErrorFallback'
import { RepositoriesSkeleton } from '@/app/[lng]/[username]/_components/RepositoriesSkeleton'
import { UserRepositories } from '@/app/[lng]/[username]/_components/UserRepositories'
import { UserRepositoriesViewControl } from '@/app/[lng]/[username]/_components/UserRepositoriesViewControl'

export default function UserRepositoryPage() {
  const params = useParams<{ lng: string; username: string }>()
  const router = useRouter()

  const handleSubmit = (username: string) => {
    router.replace(`/${params.lng}/${username}`)
  }

  return (
    <div className="p-3 w-full m-auto mt-4 mb-4">
      <UsernameSearchForm
        onSubmit={handleSubmit}
        defaultValue={params.username}
      />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<RepositoriesSkeleton />}>
          <UserRepositoriesViewControl />
          <UserRepositories username={params.username} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
