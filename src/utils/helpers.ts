import { Platform } from 'react-native'
import { MONTH_NAMES } from './constants'

export const formatNumberToRupiah = (value: number): string => {
  const rupiah =
    'Rp' + value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
  return rupiah
}

export const formatDateStringToHumanReadable = (stringDate: string): string => {
  const dateObj = new Date(stringDate.split(' ')[0])

  if (Platform.OS === 'ios') {
    return dateObj.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const date = dateObj.getDate()
  const month = MONTH_NAMES[dateObj.getMonth()]
  const year = dateObj.getFullYear()

  return `${date} ${month} ${year}`

}

export const capitalize = (str: string): string => {
  if (str.length <= 4) {
    return str.toUpperCase()
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const sortName = (a: string, b: string, order: string): number => {
  if (order === 'asc') {
    return a.localeCompare(b)
  }
  return b.localeCompare(a)
}

const sortDate = (a: string, b: string, order: string): number => {
  const aValue = new Date(a).getTime()
  const bValue = new Date(b).getTime()
  if (order === 'asc') {
    return aValue - bValue
  }
  return bValue - aValue
}

export const sortArrayBy = (arr: any[], criteria: string): any[] => {
  const sorted = arr.sort((a, b) => {
    const [key, order] = criteria.split(':')

    if (key === 'beneficiary_name') {
      return sortName(a[key], b[key], order)
    } else if (key === 'created_at') {
      return sortDate(a[key], b[key], order)
    }
    return 0
  })
  return sorted
}
