import { create } from 'zustand'
import { SelectItems } from '@/components/common/ControlledSelect'

type UseViewControlStoreState = {
  selectedSort: string
  selectedLanguage: string
  languageItems: SelectItems
}

type UseViewControlStoreAction = {
  setSelectedSort: (sort: string) => void
  setSelectedLanguage: (repoLanguage: string) => void
  setLanguageItems: (repoLanguageItems: SelectItems) => void
}

export const useViewControlStore = create<
  UseViewControlStoreState & UseViewControlStoreAction
>((set) => ({
  selectedSort: 'lastUpdate',
  setSelectedSort: (selectedSort) => set({ selectedSort }),
  selectedLanguage: 'all',
  setSelectedLanguage: (selectedLanguage) => set({ selectedLanguage }),
  languageItems: [],
  setLanguageItems: (languageItems: SelectItems) => set({ languageItems }),
}))
