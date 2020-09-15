import {
  initializeData,
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFail,
} from './actions'

const fetchDataReceived = (isSuccess, data) => {
  if (isSuccess) {
    return fetchDataSuccess(data)
  } else {
    return fetchDataFail()
  }
}

export {
  initializeData,
  fetchDataRequest,
  fetchDataReceived
}
