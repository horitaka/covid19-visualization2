// import { createSelector } from 'reselect'


export const getSelectedDate = state => state.appState.selectedDate
export const getDateFrom = state => state.appState.dateFrom
export const getDateTo = state => state.appState.dateTo
export const getSelectedArea = state => state.appState.selectedArea


// export const getResultListByScraping = state => state.page.resultListByScraping
// export const getListPageUrls = state => state.page.listPageUrls
// export const getDetailPageUrls = state => state.page.detailPageUrls
//
// export const getDataByScraping = createSelector(
//   [getResultListByScraping],
//   resultListByScraping => {
//     const dataByScraping = resultListByScraping.map(item => item.data)
//     return dataByScraping
//   }
// )
