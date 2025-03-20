export const formatCompactNumber = (number: number | undefined | null, locale: string = 'en'): string => {
  const num = number ?? 0
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
  }).format(num)
}
