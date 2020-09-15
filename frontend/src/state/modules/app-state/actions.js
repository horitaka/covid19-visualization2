import * as types from './types'

export const initializeMap = (map) => ({
  type: types.INITIALIZE_MAP,
  payload: {
    map: map,
  }
})

export const completeMapInitialization = () => ({
  type: types.COMPLETE_MAP_INITIALIZATION,
})

export const changeDate = (selectedDate) => ({
  type: types.CHANGE_DATE,
  payload: {
    selectedDate: selectedDate,
  }
})

export const changeDataType = (dataType) => ({
  type: types.CHANGE_DATA_TYPE,
  payload: {
    dataType: dataType,
  }
})

export const changeDisplayMode = (displayMode) => ({
  type: types.CHANGE_DISPLAY_MODE,
  payload: {
    displayMode: displayMode,
  }
})

export const changeArea = (selectedArea) => ({
  type: types.CHANGE_AREA,
  payload: {
    selectedArea: selectedArea,
  }
})

export const setPeriodDateFrom = (dateFrom) => ({
  type: types.SET_PERIOD_DATE_FROM,
  payload: {
    dateFrom: dateFrom
  }
})

export const setPeriodDateTo = (dateTo) => ({
  type: types.SET_PERIOD_DATE_TO,
  payload: {
    dateTo: dateTo
  }
})

export const startAutoPlay = () => ({
  type: types.START_AUTO_PLAY,
})

export const stopAutoPlay = () => ({
  type: types.STOP_AUTO_PLAY,
})
