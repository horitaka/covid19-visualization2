import { connect } from 'react-redux'

import { appStateOperations } from '../../../state/modules/app-state'
import { covid19DataSelectors } from '../../../state/modules/covid19data'
import GraphViewer from './GraphViewer'

const mapStateToProps = (state, ownProps) => {
  return {
    covid19DataSelectedArea: covid19DataSelectors.getCovid19DataSelectedArea(state),
    selectedDate: state.appState.selectedDate,
    oldestDate: covid19DataSelectors.getOldestDate(state),
    latestDate: covid19DataSelectors.getLatestDate(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeDate: (date) => dispatch(appStateOperations.changeDate(date)),
  }
}

const GraphViewerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphViewer)

export default GraphViewerContainer;
