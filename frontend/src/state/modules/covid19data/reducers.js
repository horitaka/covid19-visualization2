import * as types from './types'

// covid19Data = {
//   20200313: [
//     {
//       prefectureCode: '13',
//       prefecture: '東京都',
//       city: '',
//       totalInjectedPeople: 2,
//       injectedPeople: 2,
//       noSymptomsPeople: 0,
//       positivePeople: 0,
//       deadPeople: 0,
//     },
//     {
//       prefectureCode: '11',
//       prefecture: '埼玉県',
//       city: '',
//       totalInjectedPeople: 8,
//       injectedPeople: 3,
//       noSymptomsPeople: 5,
//       positivePeople: 0,
//       deadPeople: 0,
//     },
//   ],
//   20200314: [
//     {
//       prefectureCode: '13',
//       prefecture: '東京都',
//       city: '',
//       totalInjectedPeople: 2,
//       injectedPeople: 2,
//       noSymptomsPeople: 0,
//       positivePeople: 0,
//       deadPeople: 0,
//     },
//     {
//       prefectureCode: '11',
//       prefecture: '埼玉県',
//       city: '',
//       totalInjectedPeople: 8,
//       injectedPeople: 3,
//       noSymptomsPeople: 5,
//       positivePeople: 0,
//       deadPeople: 0,
//     },
//   ],
// }

const initialState = {}

const covid19dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DATA_RECEIVED:
      return Object.assign({}, action.payload.covid19Data)
    default:
      return state

  }
}

export default covid19dataReducer
