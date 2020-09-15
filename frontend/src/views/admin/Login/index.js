import { connect } from 'react-redux'

import { covid19DataEditOperations } from '../../../state/modules/covid19data-edit'
import Login from './Login'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (password) => dispatch(covid19DataEditOperations.login(password))
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer;
