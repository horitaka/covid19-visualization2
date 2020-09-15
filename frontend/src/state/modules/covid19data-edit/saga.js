import { call, put, select, takeEvery } from 'redux-saga/effects'

import ApiAccess from '../../utils/ApiAccess'
import { FETCH_DATA_REQUEST, UPLOAD_DATA_REQUEST } from './types'
import { fetchDataReceived, uploadDataFinished } from './operations'
import { getDataEdited } from './selectors'


export default function* saga() {
  // yield fork(fetchDataSaga);
  // yield fork(changeDateSaga);
  yield takeEvery(FETCH_DATA_REQUEST, fetchData)
  yield takeEvery(UPLOAD_DATA_REQUEST, uploadData)
}

// function* fetchDataSaga() {
//   yield takeEvery(FETCH_DATA_REQUEST, fetchData)
//   yield takeEvery(UPLOAD_DATA_REQUEST, uploadData)
// }

function* fetchData(action) {
  const onlyUnconfirmed = action.payload.onlyUnconfirmed
  const date = action.payload.date

	const api = new ApiAccess()
  let url
  if (date) {
    url = `${process.env.REACT_APP_API_URL}/covid19data-raw/date/${date}`
  } else {
    url = `${process.env.REACT_APP_API_URL}/covid19data-raw`
  }
	const data = yield call(api.fetchData.bind(api), url, {unconfirmed: onlyUnconfirmed })
	yield put(fetchDataReceived(true, data))
}

function* uploadData() {
  const api = new ApiAccess()
  const editedData = yield select(getDataEdited)
  // console.log(editedData)

  const dateList = Object.keys(editedData)

  // RawDataの更新
  for(let i=0; i<dateList.length; i++) {
    const dataByDate = editedData[dateList[i]]
    const url = process.env.REACT_APP_API_URL + '/covid19data-raw/date/' + dateList[i]
    yield call(api.postData.bind(api), url, dataByDate)
  }
  yield put(uploadDataFinished(true))
}
