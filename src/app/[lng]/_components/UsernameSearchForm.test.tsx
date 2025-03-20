import { UsernameSearchForm } from './UsernameSearchForm'
import { fireEvent, render, screen } from '@testing-library/react'
import { setLanguage } from '../../../../jest.setup'

describe('UsernameSearchForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('input, button이 올바르게 렌더링 되는지 확인', () => {
    render(<UsernameSearchForm onSubmit={mockOnSubmit} />)

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')

    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('기본값이 없을 때 입력 필드가 빈 상태인지 확인', () => {
    render(<UsernameSearchForm onSubmit={mockOnSubmit} />)

    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute(
      'placeholder',
      '사용자명을 입력하세요. ex) Forredom',
    )
    expect(input).toHaveValue('')
  })

  it('기본값이 있을 때 input value가 설정되는지 확인', () => {
    render(<UsernameSearchForm defaultValue="test" onSubmit={mockOnSubmit} />)

    const input = screen.getByRole('textbox')

    expect(input).toHaveValue('test')
  })

  it('입력 필드에 값을 입력하면 올바르게 반영되는지 확인', () => {
    render(<UsernameSearchForm onSubmit={mockOnSubmit} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(input).toHaveValue('test')
  })

  it('입력 필드에 값을 입력하고 폼을 제출하면 onSubmit이 호출되는지 확인', () => {
    render(<UsernameSearchForm onSubmit={mockOnSubmit} />)

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')

    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(button)

    expect(mockOnSubmit).toHaveBeenCalledWith('test')
  })

  it('언어를 영어로 변경했을 때 input placeholder, button의 텍스트가 올바르게 바뀌는지 확인', () => {
    setLanguage('en')

    render(<UsernameSearchForm onSubmit={mockOnSubmit} />)

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')

    expect(input).toHaveAttribute(
      'placeholder',
      'Enter a username. ex) Forredom',
    )
    expect(button).toHaveTextContent('Search')
  })
})
