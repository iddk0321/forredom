import { InitOptions } from 'i18next'

export const fallbackLng = 'ko'
export const languages = [fallbackLng, 'en']
export const defaultNS = 'common'
export const cookieName = 'i18next'

export function getOptions(lng = fallbackLng, ns: string | string[] = defaultNS): InitOptions {
  return {
    ns,
    lng,
    supportedLngs: languages,
    fallbackLng,
    fallbackNS: defaultNS,
    defaultNS,
  }
}
