import { connect } from 'react-redux'

import { appStateOperations } from '../../../state/modules/app-state'
import SettingItemDisplayMode from './SettingItemDisplayMode'

const mapStateToProps = (state, ownProps) => {
  return {
    displayMode: state.appState.displayMode,
    isMapInitialized: state.appState.isMapInitialized,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeDisplayMode: (displayMode) => dispatch(appStateOperations.changeDisplayMode(displayMode)),
  }
}

const SettingItemDisplayModeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingItemDisplayMode)

export default SettingItemDisplayModeContainer;
