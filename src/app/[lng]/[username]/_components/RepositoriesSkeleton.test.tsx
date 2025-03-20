import { RepositoriesSkeleton } from './RepositoriesSkeleton'
import { render, screen } from '@testing-library/react'

jest.mock('@/components/ui', () => {
  const MockSkeleton = () => <div data-testid="skeleton-item" />
  return { Skeleton: MockSkeleton }
})

describe('RepositoriesSkeleton', () => {
  it('30개의 Skeleton이 렌더링되는지 확인', () => {
    render(<RepositoriesSkeleton />)
    const skeletonElements = screen.getAllByTestId('skeleton-item')
    expect(skeletonElements).toHaveLength(30)
  })
})
