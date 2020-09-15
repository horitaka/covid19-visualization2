import { connect } from 'react-redux'

import { appStateOperations } from '../../../state/modules/app-state'
import { covid19DataOperations } from '../../../state/modules/covid19data'
import SettingItemDate from './SettingItemDate'

const mapStateToProps = (state, ownProps) => {
  return {
    dateFrom: state.appState.dateFrom,
    dateTo: state.appState.dateTo,
    isMapInitialized: state.appState.isMapInitialized,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPeriodDateFrom: (date) => dispatch(appStateOperations.setPeriodDateFrom(date)),
    setPeriodDateTo: (date) => dispatch(appStateOperations.setPeriodDateTo(date)),
    fetchData: () => dispatch(covid19DataOperations.fetchDataRequest()),
  }
}

const SettingItemDateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingItemDate)

export default SettingItemDateContainer;
