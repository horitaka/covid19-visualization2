import {
  login,
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFail,
  updateDataEdited,
  uploadDataRequest,
  uploadDataSuccess,
  uploadDataFail,
} from './actions'

const fetchDataReceived = (isSuccess, data) => {
  if (isSuccess) {
    return fetchDataSuccess(data)
  } else {
    return fetchDataFail()
  }
}

const uploadDataFinished = (isSuccess) => {
  if (isSuccess) {
    return uploadDataSuccess()
  } else {
    return uploadDataFail()
  }
}

export {
  login,
  fetchDataRequest,
  fetchDataReceived,
  updateDataEdited,
  uploadDataRequest,
  uploadDataFinished,
}
