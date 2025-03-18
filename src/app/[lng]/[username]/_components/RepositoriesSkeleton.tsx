import { Skeleton } from '@/components/ui'

export function RepositoriesSkeleton() {
  return (
    <>
      {Array.from({ length: 30 }, (_, index) => (
        <Skeleton key={index} className="w-full h-10 mb-2" />
      ))}
    </>
  )
}
