import { connect } from 'react-redux'

import Admin from './Admin'

const mapStateToProps = (state, ownProps) => {
  return {
    isAdmin: state.covid19DataEdit.isAdmin
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const AdminContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)

export default AdminContainer;
