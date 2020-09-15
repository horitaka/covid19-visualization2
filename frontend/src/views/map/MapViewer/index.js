import { connect } from 'react-redux'

import { appStateOperations } from '../../../state/modules/app-state'
import { covid19DataSelectors } from '../../../state/modules/covid19data'

import MapViewer from './MapViewer'

const mapStateToProps = (state, ownProps) => {
  return {
    selectedArea: state.appState.selectedArea,
    displayMode: state.appState.displayMode,
    covid19DataOnSelectedDay: covid19DataSelectors.getCovid19DataOnSelectedDay(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    completeMapInitialization: () => dispatch(appStateOperations.completeMapInitialization()),
  }
}

const MapViewerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapViewer)

export default MapViewerContainer;
