export const formatNumberToRupiah = (value: number): string => {
  const rupiah = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)
  return rupiah
}

export const formatDateStringToHumanReadable = (date: string): string => {
  const dateObj = new Date(date.split(' ')[0])
  const formattedDate = dateObj.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  return formattedDate
}

export const capitalize = (str: string): string => {
  if (str.length <= 4) {
    return str.toUpperCase()
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}
