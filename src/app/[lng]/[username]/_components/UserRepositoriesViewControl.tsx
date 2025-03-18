import { useTranslation } from '@/i18n/client'
import { useViewControlStore } from '@/app/[lng]/[username]/_store/useViewControlStore'
import { ControlledSelect } from '@/components/common'
import { useParams } from 'next/navigation'

export function UserRepositoriesViewControl() {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useTranslation(lng, 'sort')

  const selectedSort = useViewControlStore((s) => s.selectedSort)
  const setSelectedSort = useViewControlStore((s) => s.setSelectedSort)
  const selectedLanguage = useViewControlStore((s) => s.selectedLanguage)
  const setSelectedLanguage = useViewControlStore((s) => s.setSelectedLanguage)
  const languageItems = useViewControlStore((s) => s.languageItems)

  return (
    <div className="p-3 flex items-center justify-end gap-2 border border-b-0 rounded-tl-lg rounded-tr-lg">
      <ControlledSelect
        items={[
          {
            key: 'lastUpdate',
            value: 'lastUpdate',
            label: `${t('lastUpdated')}`,
          },
          { key: 'stars', value: 'stars', label: `${t('stars')}` },
        ]}
        value={selectedSort}
        onChange={setSelectedSort}
      />
      <ControlledSelect
        items={languageItems}
        value={selectedLanguage}
        onChange={setSelectedLanguage}
      />
    </div>
  )
}
