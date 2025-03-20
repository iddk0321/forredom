import { createInstance, FlatNamespace, KeyPrefix, Namespace } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { FallbackNs } from 'react-i18next'
import { getOptions } from './settings'
import resources from './i18n.json'

const initI18next = async (lng: string, ns: string | string[]) => {
  const i18nInstance = createInstance()
  await i18nInstance.use(initReactI18next).init({
    resources,
    ...getOptions(lng, ns),
  })
  return i18nInstance
}

type $Tuple<T> = readonly [T?, ...T[]]
type $FirstNamespace<Ns extends Namespace> = Ns extends readonly unknown[] ? Ns[0] : Ns

export async function useTranslation<
  Ns extends FlatNamespace | $Tuple<FlatNamespace>,
  KPrefix extends KeyPrefix<FallbackNs<Ns extends FlatNamespace ? FlatNamespace : $FirstNamespace<FlatNamespace>>> = undefined,
>(lng: string, ns?: Ns, options: { keyPrefix?: KPrefix } = {}) {
  const i18nextInstance = await initI18next(lng, Array.isArray(ns) ? (ns as string[]) : (ns as string))
  return {
    t: Array.isArray(ns)
      ? i18nextInstance.getFixedT(lng, ns[0], options.keyPrefix)
      : i18nextInstance.getFixedT(lng, ns as FlatNamespace, options.keyPrefix),
    i18n: i18nextInstance,
  }
}
