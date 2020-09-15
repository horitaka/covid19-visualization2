import { connect } from 'react-redux'

import { appStateOperations } from '../../../state/modules/app-state'
import SettingItemAreaSelection from './SettingItemAreaSelection'

const mapStateToProps = (state, ownProps) => {
  return {
    isMapInitialized: state.appState.isMapInitialized,
    selectedArea: state.appState.selectedArea
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeArea: (area) => dispatch(appStateOperations.changeArea(area)),
  }
}

const SettingItemAreaSelectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingItemAreaSelection)

export default SettingItemAreaSelectionContainer;
