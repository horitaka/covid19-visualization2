import * as types from './types'

export const initializeData = () => ({
  type: types.INITIALIZE_DATA,
})

export const fetchDataRequest = (date) =>({
  type: types.FETCH_DATA_REQUEST,
})

export const fetchDataSuccess = (covid19Data) =>({
  type: types.FETCH_DATA_RECEIVED,
  payload: {
    covid19Data: covid19Data,
  }
})

export const fetchDataFail = (date) =>({
  type: types.FETCH_DATA_RECEIVED,
  payload: new Error(),
  error: true,
})

// export const setScrapedData = (data) => ({
//   type: types.SET_SCRAPED_DATA,
//   payload: {
//     data: data
//   }
// })


// export const fetchPageReceived = (data, error) => {
//   if (!error) {
//     return {
//       type: types.FETCH_PAGE_RECEIVED,
//       payload: {
//         data: data,
//       },
//       error: error
//     }
//   } else {
//     return {
//       type: types.FETCH_PAGE_RECEIVED,
//       payload: new Error(),
//       error: error
//     }
//   }
// }
