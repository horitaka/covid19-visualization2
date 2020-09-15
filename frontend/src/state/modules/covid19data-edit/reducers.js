import * as types from './types'

// covid19DataEdit = {
//   isAdmin: true,
//   isFetching: true,
//
//   dataOriginal: {
//     20200313: [
//       {
//         prefectureCode: '13',
//         injectedPeople: 20,
//       },
//       {
//         prefectureCode: '11',
//         injectedPeople: 12,
//       },
//     ],
//     20200314: [
//       {
//         prefectureCode: '13',
//         injectedPeople: 20,
//       },
//       {
//         prefectureCode: '11',
//         injectedPeople: 12,
//       },
//     ],
//   }
// }

const initialState = {
  isAdmin: false,
  isFetching: false,
  isUploading: false,
  dataOriginal: {},
  dataEdited: {}
}

const covid19dataEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      const isAdmin = action.payload.password === 'covid!)admin'
      return {
        ...state,
        isAdmin: isAdmin,
      }
    case types.FETCH_DATA_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case types.FETCH_DATA_RECEIVED:
      return {
        ...state,
        dataOriginal: Object.assign({}, action.payload.covid19DataOriginal),
        isFetching: false,
      }
    case types.UPDATE_DATA_EDITED:
      return {
        ...state,
        dataEdited: Object.assign({}, action.payload.dataEdited)
      }
    case types.UPLOAD_DATA_REQUEST:
      return {
        ...state,
        isUploading: true,
      }
    case types.UPLOAD_DATA_SUCCESS:
      return {
        ...state,
        isUploading: false,
      }
    default:
      return state

  }
}

export default covid19dataEditReducer
