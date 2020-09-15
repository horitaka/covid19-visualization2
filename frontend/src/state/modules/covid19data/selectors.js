import { createSelector } from 'reselect'

import { getSelectedArea } from '../app-state/selectors'

export const getCovid19Data = state => state.covid19Data
export const getSelectedDate = state => state.appState.selectedDate

export const getCovid19DataSelectedArea = createSelector(
  [getCovid19Data, getSelectedArea],
  (covid19Data, selectedArea) => {

    const dateList = Object.keys(covid19Data)
    if (dateList.length === 0) {
      return {}
    }

    let covid19DataBySelectedArea = {}
    dateList.forEach(date => {
      const singleDateDataList = covid19Data[date]
      const dataBySelectedArea = singleDateDataList.find(data => data.areaCode === selectedArea)
      covid19DataBySelectedArea[date] = dataBySelectedArea
    })

    return covid19DataBySelectedArea
  }
)

export const getCovid19DataOnSelectedDay = createSelector(
  [getCovid19Data, getSelectedDate],
  (covid19Data, selectedDate) => {
    return covid19Data[selectedDate] || []
  }
)

export const getTotalInjectedPeopleOnSelectedDay = createSelector(
  [getCovid19DataOnSelectedDay],
  (covid19Data) => {
    let totalInjectedPeople = 0
    covid19Data.forEach(data => {
      totalInjectedPeople = totalInjectedPeople + data.totalInjectedPeople
    })
    return totalInjectedPeople
  }
)

export const getTotalInjectedPeopleOnSelectedDayByRegion = createSelector(
  [getCovid19DataOnSelectedDay, getSelectedArea],
  (covid19Data, selectedArea) => {

    let totalInjectedPeople = 0
    const covid19DataOnSelectedDayByRegion = covid19Data.find(data => data.areaCode === selectedArea)

    if (covid19DataOnSelectedDayByRegion && covid19DataOnSelectedDayByRegion.totalInjectedPeople) {
      totalInjectedPeople = covid19DataOnSelectedDayByRegion.totalInjectedPeople
    }
    return totalInjectedPeople
  }
)

export const getDateList = createSelector(
  [getCovid19Data],
  covid19Data => {
    const dateList = Object.keys(covid19Data)
    return dateList
  }
)

export const getLatestDate = createSelector(
  [getDateList],
  dateList => {
    if (dateList.length === 0) {
      return ''
    }
    const dateListNumber = dateList.map(dateString => Number(dateString))
    return String(Math.max.apply(null, dateListNumber))
  }
)

export const getOldestDate = createSelector(
  [getDateList],
  dateList => {
    if (dateList.length === 0) {
      return ''
    }
    const dateListNumber = dateList.map(dateString => Number(dateString))
    return String(Math.min.apply(null, dateListNumber))
  }
)
