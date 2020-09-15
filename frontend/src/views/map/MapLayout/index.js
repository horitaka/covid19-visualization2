import { connect } from 'react-redux'


import MapLayout from './MapLayout'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const MapLayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapLayout)

export default MapLayoutContainer;
