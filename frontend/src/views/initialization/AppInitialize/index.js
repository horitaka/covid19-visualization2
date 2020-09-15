import { connect } from 'react-redux'

import { appStateOperations } from '../../../state/modules/app-state'
import { covid19DataOperations } from '../../../state/modules/covid19data'
import AppInitialize from './AppInitialize'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeArea: (area) => dispatch(appStateOperations.changeArea(area)),
    setPeriodDateFrom: (date) => dispatch(appStateOperations.setPeriodDateFrom(date)),
    setPeriodDateTo: (date) => dispatch(appStateOperations.setPeriodDateTo(date)),
    fetchData: () => dispatch(covid19DataOperations.fetchDataRequest())
  }
}

const AppInitializeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppInitialize)

export default AppInitializeContainer;
