import * as types from './types'

const initialState = {
  isMapInitialized: false,
  isFething: false,
  selectedDate: '',
  dataType: 'injectedPeople',
  displayMode: 'map',
  selectedRegion: 'Tokyo',
  dateFrom: '',
  dateTo: '',
  isAutoPlaying: false,
}

const appStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INITIALIZE_MAP:
      return {
        ...state,
        map: action.payload.map,
      }
    case types.COMPLETE_MAP_INITIALIZATION:
      return {
        ...state,
        isMapInitialized: true,
      }
    case types.CHANGE_DATE:
      return {
        ...state,
        selectedDate: action.payload.selectedDate,
      }
    case types.CHANGE_DATA_TYPE:
      return {
        ...state,
        dataType: action.payload.dataType,
      }
    case types.CHANGE_DISPLAY_MODE:
      return {
        ...state,
        displayMode: action.payload.displayMode,
      }
    case types.CHANGE_AREA:
      return {
        ...state,
        selectedArea: action.payload.selectedArea,
      }
    case types.SET_PERIOD_DATE_FROM:
      return {
        ...state,
        dateFrom: action.payload.dateFrom,
      }
    case types.SET_PERIOD_DATE_TO:
      return {
        ...state,
        dateTo: action.payload.dateTo,
      }
    case types.START_AUTO_PLAY:
      return {
        ...state,
        isAutoPlaying: true,
      }
    case types.STOP_AUTO_PLAY:
      return {
        ...state,
        isAutoPlaying: false,
      }
    default:
      return state

  }
}

export default appStateReducer
