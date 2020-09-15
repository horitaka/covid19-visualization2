import { connect } from 'react-redux'

import { covid19DataEditOperations } from '../../../../state/modules/covid19data-edit'
// import { covid19DataSelectors, covid19DataOperations } from '../../../state/modules/covid19data'
import TableBody from './TableBody'

const mapStateToProps = (state, ownProps) => {
  return {
    covid19DataOriginal: state.covid19DataEdit.dataOriginal,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateDataEdited: (newData) => dispatch(covid19DataEditOperations.updateDataEdited(newData))
  }
}

const TableBodyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableBody)

export default TableBodyContainer;
