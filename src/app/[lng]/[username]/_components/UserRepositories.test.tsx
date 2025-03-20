import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { setupServer } from 'msw/node'
import { handlers } from '@/mocks/handler'
import {
  sortByLastUpdate,
  sortByStars,
  UserRepositories,
} from '@/app/[lng]/[username]/_components/UserRepositories'
import { useViewControlStore } from '@/app/[lng]/[username]/_store/useViewControlStore'
import { mockRepositories } from '@/mocks/data'
import { PAGE_SIZE } from '@/app/[lng]/[username]/_query/useUserRepositoriesQuery'
import { Repository } from '@/types/github'

const server = setupServer(...handlers)

const renderComponent = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  })
  return act(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={null}>
          <UserRepositories username={'username'} />
        </Suspense>
      </QueryClientProvider>,
    )
  })
}

const getSortedMock = (sortFn: (a: Repository, b: Repository) => number) => {
  const mock = [...mockRepositories].slice(0, PAGE_SIZE)
  return mock.sort((a, b) => sortFn(a, b))
}

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('useUserRepositoriesQuery', () => {
  beforeEach(async () => {
    await renderComponent()
  })

  it('데이터가 정상적으로 보이는지 확인', async () => {
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(PAGE_SIZE)
    })
  })

  it('스크롤시 새로운 데이터가 목록에 보이는지 확인', async () => {
    const initialItemCount = screen.getAllByRole('listitem').length

    fireEvent.scroll(window, { target: { scrollY: 1000 } })

    await waitFor(() => {
      const newItemCount = screen.getAllByRole('listitem').length
      expect(newItemCount).toBeGreaterThan(initialItemCount)
    })
  })

  it('마지막 페이지일 경우 데이터가 추가되지 않는지 확인', async () => {
    // 마지막 페이지까지 데이터 로드
    for (let i = 0; i < 10; i++) {
      fireEvent.scroll(window, { target: { scrollY: 1000 } })
      await waitFor(() => {
        expect(screen.getAllByRole('listitem').length).toBeLessThanOrEqual(
          mockRepositories.length,
        )
      })
    }

    // 마지막 페이지 로드 이후 아이템이 추가되지 않는지 확인
    const initialItemCount = screen.getAllByRole('listitem').length
    fireEvent.scroll(window, { target: { scrollY: 1000 } })

    await waitFor(() => {
      expect(screen.getAllByRole('listitem').length).toBe(initialItemCount)
    })
  })

  it('정렬이 마지막 업데이트순일때 최근 업데이트 날짜 순서대로 정렬되어 보이는지 확인', async () => {
    await act(async () => {
      useViewControlStore.setState({ selectedSort: 'lastUpdate' })
    })

    const items = screen.getAllByRole('listitem')
    const sortedMock = getSortedMock(sortByLastUpdate)

    expect(items[0]).toHaveTextContent(sortedMock[0].name)
    expect(items[items.length - 1]).toHaveTextContent(
      sortedMock[items.length - 1].name,
    )
  })

  it('정렬이 Star순일때 Star가 많은 순서대로 정렬되어 보이는지 확인', async () => {
    await act(async () => {
      useViewControlStore.setState({ selectedSort: 'stars' })
    })

    const items = screen.getAllByRole('listitem')
    const sortedMock = getSortedMock(sortByStars)

    expect(items[0]).toHaveTextContent(sortedMock[0].name)
    expect(items[items.length - 1]).toHaveTextContent(
      sortedMock[items.length - 1].name,
    )
  })
})
