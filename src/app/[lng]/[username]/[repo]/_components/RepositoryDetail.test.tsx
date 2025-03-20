import { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, render, screen } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { handlers } from '@/mocks/handler'
import { RepositoryDetail } from '@/app/[lng]/[username]/[repo]/_components/RepositoryDetail'
import { mockRepository } from '@/mocks/data'
import { setLanguage } from '../../../../../../jest.setup'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

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
          <RepositoryDetail username={'username'} repo={'repo'} />
        </Suspense>
      </QueryClientProvider>,
    )
  })
}

describe('RepositoryDetail', () => {
  it('데이터가 정상적으로 보이는지 확인', async () => {
    await renderComponent()

    expect(screen.getByText(mockRepository.name)).toBeInTheDocument()
    expect(screen.getByText(mockRepository.description as string)).toBeInTheDocument()
    expect(screen.getByText(mockRepository.language as string)).toBeInTheDocument()
    expect(screen.getByText(mockRepository.stargazers_count)).toBeInTheDocument()
    expect(screen.getByText(mockRepository.forks_count as number)).toBeInTheDocument()
    expect(screen.getByText(mockRepository.open_issues_count as number)).toBeInTheDocument()
  })

  it('깃허브 링크가 설정되어있는지 확인', async () => {
    await renderComponent()

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', mockRepository.clone_url)
  })

  it('언어 설정을 영어로 변경시 "깃허브로 이동" 버튼의 텍스트가 변경되는지 확인', async () => {
    setLanguage('en')

    await renderComponent()

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Go to GitHub')
  })
})
