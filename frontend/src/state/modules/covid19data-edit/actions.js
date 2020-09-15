import * as types from './types'

export const login = (password) =>({
  type: types.LOGIN,
  payload: {
    password: password,
  }
})

export const fetchDataRequest = (option) =>({
  type: types.FETCH_DATA_REQUEST,
  payload: {
    onlyUnconfirmed: option.onlyUnconfirmed,
    date: option.date,
  }
})

export const fetchDataSuccess = (covid19DataOriginal) =>({
  type: types.FETCH_DATA_RECEIVED,
  payload: {
    covid19DataOriginal: covid19DataOriginal,
  }
})

export const fetchDataFail = () =>({
  type: types.FETCH_DATA_RECEIVED,
  payload: new Error(),
  error: true,
})

export const updateDataEdited = (newData) =>({
  type: types.UPDATE_DATA_EDITED,
  payload: {
    dataEdited: newData,
  }
})

export const uploadDataRequest = () =>({
  type: types.UPLOAD_DATA_REQUEST,
})

export const uploadDataSuccess = () =>({
  type: types.UPLOAD_DATA_SUCCESS,
})

export const uploadDataFail = () =>({
  type: types.UPLOAD_DATA_FAIL,
  payload: new Error(),
  error: true,
})
