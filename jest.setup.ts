import '@testing-library/jest-dom'
import resources from './src/i18n/i18n.json'
import { fallbackLng } from '@/i18n/settings'
import { useParams } from 'next/navigation'
import { TextDecoder, TextEncoder } from 'util'
import { ReadableStream, TransformStream } from 'stream/web'

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream },
  TransformStream: { value: TransformStream },
})

jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ lng: fallbackLng })),
  useRouter: jest.fn(),
}))

jest.mock('@/i18n/client', () => ({
  useTranslation: (lng: 'en' | 'ko' = fallbackLng, namespace: string) => ({
    t: (key: string) => {
      return (
        (
          resources as Record<
            'ko' | 'en',
            Record<string, Record<string, string>>
          >
        )[lng][namespace][key] || '!!! Not Found i18n Resources !!!'
      )
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}))

class MockPointerEvent extends Event {
  button: number
  ctrlKey: boolean
  pointerType: string

  constructor(type: string, props: PointerEventInit) {
    super(type, props)
    this.button = props.button || 0
    this.ctrlKey = props.ctrlKey || false
    this.pointerType = props.pointerType || 'mouse'
  }
}

window.PointerEvent = MockPointerEvent as any
window.HTMLElement.prototype.scrollIntoView = jest.fn()
window.HTMLElement.prototype.releasePointerCapture = jest.fn()
window.HTMLElement.prototype.hasPointerCapture = jest.fn()

export const setLanguage = (lng: string) => {
  ;(useParams as jest.Mock).mockReturnValue({ lng })
}
