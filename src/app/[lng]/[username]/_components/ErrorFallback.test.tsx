import { ErrorFallback } from './ErrorFallback'
import { render, screen } from '@testing-library/react'
import { ForbiddenError, NoDataError, NotFoundError } from '@/api/errors'
import { setLanguage } from '../../../../../jest.setup'

describe('ErrorFallback', () => {
  // ko
  it('한국어 - NoDataError 발생 시 올바른 메시지를 표시하는지 확인', () => {
    render(<ErrorFallback error={new NoDataError()} />)
    expect(screen.getByText('데이터가 없습니다.')).toBeInTheDocument()
  })

  it('한국어 - NotFoundError 발생 시 올바른 메시지를 표시하는지 확인', () => {
    render(<ErrorFallback error={new NotFoundError()} />)
    expect(screen.getByText('사용자를 찾을 수 없습니다.')).toBeInTheDocument()
  })

  it('한국어 - ForbiddenError 발생 시 올바른 메시지와 설명을 표시하는지 확인', () => {
    render(<ErrorFallback error={new ForbiddenError()} />)
    expect(
      screen.getByText('요청량이 많아 일시적인 오류가 발생했습니다.'),
    ).toBeInTheDocument()
    expect(screen.getByText('잠시 후 다시 시도해주세요.')).toBeInTheDocument()
  })

  it('한국어 - 알 수 없는 오류 발생 시 기본 메시지를 표시하는지 확인', () => {
    render(<ErrorFallback error={new Error()} />)
    expect(
      screen.getByText('알 수 없는 오류가 발생했습니다.'),
    ).toBeInTheDocument()
    expect(screen.getByText('잠시 후 다시 시도해주세요.')).toBeInTheDocument()
  })

  // en
  it('영어 - NoDataError 발생 시 올바른 메시지를 표시하는지 확인', () => {
    setLanguage('en')
    render(<ErrorFallback error={new NoDataError()} />)
    expect(screen.getByText('Data not found.')).toBeInTheDocument()
  })

  it('영어 - NotFoundError 발생 시 올바른 메시지를 표시하는지 확인', () => {
    setLanguage('en')
    render(<ErrorFallback error={new NotFoundError()} />)
    expect(screen.getByText('User not found.')).toBeInTheDocument()
  })

  it('영어 - ForbiddenError 발생 시 올바른 메시지와 설명을 표시하는지 확인', () => {
    setLanguage('en')
    render(<ErrorFallback error={new ForbiddenError()} />)
    expect(
      screen.getByText('Too many requests have caused a temporary error.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Please try again later.')).toBeInTheDocument()
  })

  it('영어 - 알 수 없는 오류 발생 시 기본 메시지를 표시하는지 확인', () => {
    setLanguage('en')
    render(<ErrorFallback error={new Error()} />)
    expect(
      screen.getByText('An unknown error has occurred.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Please try again later.')).toBeInTheDocument()
  })
})
