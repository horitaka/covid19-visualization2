import { connect } from 'react-redux'

import { appStateOperations } from '../../../state/modules/app-state'
import SettingItemDataType from './SettingItemDataType'

const mapStateToProps = (state, ownProps) => {
  return {
    dataType: state.appState.dataType,
    isMapInitialized: state.appState.isMapInitialized,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeDataType: (dataType) => dispatch(appStateOperations.changeDataType(dataType)),
  }
}

const SettingItemDataTypeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingItemDataType)

export default SettingItemDataTypeContainer;
