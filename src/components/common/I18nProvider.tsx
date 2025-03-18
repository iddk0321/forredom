'use client'

import i18nData from '@/i18n/i18n.json'
import { createContext, useContext, ReactNode } from 'react'

type I18nContextType = {
  lng: keyof typeof i18nData
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({
  lng,
  children,
}: {
  lng: keyof typeof i18nData
  children: ReactNode
}) {
  return <I18nContext.Provider value={{ lng }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
