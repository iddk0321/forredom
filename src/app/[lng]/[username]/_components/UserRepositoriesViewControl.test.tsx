import { render, screen } from '@testing-library/react'
import { UserRepositoriesViewControl } from '@/app/[lng]/[username]/_components/UserRepositoriesViewControl'
import { useViewControlStore } from '@/app/[lng]/[username]/_store/useViewControlStore'
import { setLanguage } from '../../../../../jest.setup'
import userEvent from '@testing-library/user-event'

const setup = async (buttonName: string) => {
  const user = userEvent.setup()
  const { container } = render(<UserRepositoriesViewControl />)
  const button = container.querySelector(`button[name="${buttonName}"]`)
  await user.click(button as Element)
  return { user, button }
}

describe('UserRepositoriesViewControl', () => {
  beforeEach(() => {
    useViewControlStore.setState({
      selectedSort: 'lastUpdate',
      selectedLanguage: 'JavaScript',
      languageItems: [
        { key: 'JavaScript', value: 'JavaScript', label: 'JavaScript' },
        { key: 'TypeScript', value: 'TypeScript', label: 'TypeScript' },
      ],
    })
  })

  it('정렬 Select가 정상적으로 보이는지 확인', async () => {
    await setup('sort')
    expect(
      screen.getByRole('option', { name: '마지막 업데이트 순' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Star 순' })).toBeInTheDocument()
  })

  it('필터 Select가 정상적으로 보이는지 확인', async () => {
    await setup('filter')
    expect(
      screen.getByRole('option', { name: 'JavaScript' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: 'TypeScript' }),
    ).toBeInTheDocument()
  })

  it('정렬 변경시 zustand store가 변경되는지 확인', async () => {
    const { user } = await setup('sort')
    await user.click(screen.getByRole('option', { name: 'Star 순' }))
    expect(useViewControlStore.getState().selectedSort).toBe('stars')
  })

  it('언어 변경시 zustand store가 변경되는지 확인', async () => {
    const { user } = await setup('filter')
    await user.click(screen.getByRole('option', { name: 'TypeScript' }))
    expect(useViewControlStore.getState().selectedLanguage).toBe('TypeScript')
  })

  it('다국어 설정을 영어로 변경했을 때 정렬 Select의 텍스트가 변경되는지 확인', () => {
    setLanguage('en')
    const { container } = render(<UserRepositoriesViewControl />)
    const sortSelect = container.querySelector('button[name="sort"]')
    expect(sortSelect).toHaveTextContent('Last Updated')
  })
})
