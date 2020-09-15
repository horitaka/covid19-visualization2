import { put, select, call, takeEvery } from 'redux-saga/effects'

import { START_AUTO_PLAY } from './types'
// import {
// 	runScrapingFinished,
// 	setListPageUrls,
// 	resetListPageProgress,
// 	updateListPageProgress,
// 	setDetailPageUrls,
// 	resetDetailPageProgress,
// 	updateDetailPageProgress,
// } from './operations'
// import { getDaysList } from './selectors'
import { changeDate, stopAutoPlay } from './operations'
import { covid19DataSelectors } from '../covid19data'

// function* runScraping(action) {
//
// }

export default function* saga() {
  yield takeEvery(START_AUTO_PLAY, startAutoPlay)
}

function* startAutoPlay() {
  const dateList = yield select(covid19DataSelectors.getDateList)
  dateList.sort()

  for (let i=0; i<dateList.length; i++) {
    yield put(changeDate(dateList[i]))
    yield call(sleep, 1000)
  }

  yield put(stopAutoPlay())
}

function sleep(msec) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, msec)
  })
}
