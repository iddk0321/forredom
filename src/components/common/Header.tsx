'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/client'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { cookieName } from '@/i18n/settings'
import { useCookies } from 'react-cookie'

export function Header() {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useTranslation(lng, 'common')

  return (
    <div className="z-10 h-16 sticky top-0 flex px-4 py-2 items-center justify-between border-b bg-background">
      <Link href={`/${lng}`}>
        <h1 className="font-semibold text-sm md:text-md">{t('title')}</h1>
      </Link>
      <div className="flex gap-2">
        <LanguageChangeDropdown />
        <ThemeChangeDropdown />
      </div>
    </div>
  )
}

function LanguageChangeDropdown() {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useTranslation(lng, 'languages')

  const [, setCookie] = useCookies([cookieName])
  const router = useRouter()
  const pathname = usePathname()

  const handleChangeRoute = (lng: 'ko' | 'en') => {
    const segments = pathname.split('/')
    if (segments.length > 1 && lng !== segments[1]) {
      segments[1] = lng
      setCookie(cookieName, lng, { path: '/' })
      router.replace(segments.join('/'))
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{t('language')}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChangeRoute('ko')}>{t('ko')}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeRoute('en')}>{t('en')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ThemeChangeDropdown() {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useTranslation(lng, 'theme')
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{t('theme')}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>{t('light')}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>{t('dark')}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>{t('system')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
