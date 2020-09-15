import { fork } from 'redux-saga/effects'

import covid19DataReducer, { covid19DataSaga } from './covid19data'
import appStateReducer, { appStateSaga } from './app-state'
import covid19DataEditReducer, { covid19DataEditSaga } from './covid19data-edit'

function* rootSaga() {
  yield fork(covid19DataSaga)
  yield fork(appStateSaga)
  yield fork(covid19DataEditSaga)
}

export {
  covid19DataReducer,
  appStateReducer,
  covid19DataEditReducer,
  rootSaga,
}
