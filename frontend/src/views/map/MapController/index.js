import { connect } from 'react-redux'

import { appStateOperations } from '../../../state/modules/app-state'
import { covid19DataSelectors, covid19DataOperations } from '../../../state/modules/covid19data'
import MapController from './MapController'

const mapStateToProps = (state, ownProps) => {
  return {
    isMapInitialized: state.appState.isMapInitialized,
    totalInjectedPeople: covid19DataSelectors.getTotalInjectedPeopleOnSelectedDayByRegion(state),
    selectedDate: state.appState.selectedDate,
    oldestDate: covid19DataSelectors.getOldestDate(state),
    latestDate: covid19DataSelectors.getLatestDate(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPeriodDateFrom: (date) => dispatch(appStateOperations.setPeriodDateFrom(date)),
    setPeriodDateTo: (date) => dispatch(appStateOperations.setPeriodDateTo(date)),
    changeDate: (date) => dispatch(appStateOperations.changeDate(date)),
    fetchData: () => dispatch(covid19DataOperations.fetchDataRequest())
  }
}

const MapControllerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapController)

export default MapControllerContainer;
