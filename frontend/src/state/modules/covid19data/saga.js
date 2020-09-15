import { call, put, select, takeEvery } from 'redux-saga/effects'

import ApiAccess from '../../utils/ApiAccess'
import { FETCH_DATA_REQUEST } from './types'
import { fetchDataReceived } from './operations'
import { getLatestDate } from './selectors'
// import { getSelectedDate } from './selectors'
import { appStateOperations, appStateSelectors } from '../app-state'

export default function* saga() {
  yield takeEvery(FETCH_DATA_REQUEST, fetchData)
}

// function* fetchDataSaga() {
// }

function* fetchData() {
	const api = new ApiAccess()

	const url = process.env.REACT_APP_API_URL + '/covid19data'
  const dateFrom = yield select(appStateSelectors.getDateFrom)
  const dateTo = yield select(appStateSelectors.getDateTo)

  let params = {}
  if (dateFrom) {
    params.from = dateFrom
  }
  if (dateTo) {
    params.to = dateTo
  }

	const data = yield call(api.fetchData.bind(api), url, params)
	yield put(fetchDataReceived(true, data))

  const latestDate = yield select(getLatestDate)
  yield put(appStateOperations.changeDate(latestDate))
}
