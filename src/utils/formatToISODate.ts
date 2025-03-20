export const formatToISODate = (dateString?: string): string => {
  return new Date(dateString ?? 0).toISOString().split('T')[0]
}
