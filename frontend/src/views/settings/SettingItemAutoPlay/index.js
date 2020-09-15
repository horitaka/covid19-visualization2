import { connect } from 'react-redux'

import { appStateOperations } from '../../../state/modules/app-state'
import SettingItemAutoPlay from './SettingItemAutoPlay'

const mapStateToProps = (state, ownProps) => {
  return {
    isMapInitialized: state.appState.isMapInitialized,
    isAutoPlaying: state.appState.isAutoPlaying
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startAutoPlay: () => dispatch(appStateOperations.startAutoPlay()),
  }
}

const SettingItemAutoPlayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingItemAutoPlay)

export default SettingItemAutoPlayContainer;
