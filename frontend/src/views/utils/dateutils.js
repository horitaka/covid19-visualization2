import dayjs from 'dayjs'

export const convertDateStringToSelectValue = (dateString, startDate) => {
  const oldestDateObject = dayjs(startDate, 'YYYYMMDD')
  const dateObject = dayjs(dateString, 'YYYYMMDD')
  const diff = dateObject.diff(oldestDateObject, 'day')
  return diff
}

export const convertSelectedValueToDateString = (dateValue, startDate) => {
  const oldestDateObject = dayjs(startDate, 'YYYYMMDD')
  const dateString = oldestDateObject.add(dateValue, 'day').format('YYYYMMDD')
  return dateString
}

export const formatDate = (date) => {
  if (!date) {
    return ''
  }

  let dateString = date
  if (!isNaN(date)) {
    dateString = String(date)
  }
  return dayjs(dateString, 'YYYYMMDD').format('MM/DD')
}

export const calculatePeriodDays = (oldestDate, latestDate) => {
  const oldestDateObject = dayjs(oldestDate, 'YYYYMMDD')
  const latestDateObject = dayjs(latestDate, 'YYYYMMDD')
  const days = latestDateObject.diff(oldestDateObject, 'day')
  return days
}
