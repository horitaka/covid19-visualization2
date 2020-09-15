import { connect } from 'react-redux'

// import { appStateSelectors } from '../../../state/modules/app-state'

import Map from './Map'

const mapStateToProps = (state, ownProps) => {
  return {
    displayMode: state.appState.displayMode
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer;
