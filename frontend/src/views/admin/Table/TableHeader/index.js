import { connect } from 'react-redux'

import { covid19DataEditOperations } from '../../../../state/modules/covid19data-edit'
// import { covid19DataSelectors, covid19DataOperations } from '../../../state/modules/covid19data'
import TableHeader from './TableHeader'

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.covid19DataEdit.isFetching,
    isUploading: state.covid19DataEdit.isUploading,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData: (option) => dispatch(covid19DataEditOperations.fetchDataRequest(option)),
    uploadData: () => dispatch(covid19DataEditOperations.uploadDataRequest())
  }
}

const TableHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableHeader)

export default TableHeaderContainer;
