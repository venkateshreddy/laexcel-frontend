import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import DefineFeeCode from './DefineFeeCode';
import { LargeModal } from '../../components/Modals';
import { fetchProgram } from '../../actions/programactions';

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      columns: [{ Header: 'Type', accessor: 'type' },
      { Header: 'Code', accessor: 'code' }
      ],
      form: {},
      errors: {}
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchProgram());
  }
  closeModal = () => {
    this.setState({ show: false });
  }
  openRegisterForm = () => {
    this.setState({ show: true });
  }
  render() {
    const { columns } = this.state;
    return (<div>
      <div className="action-icons">
        <i
          className="fas fa-plus"
          title="Register Employee"
          onClick={this.openRegisterForm}
        />
        {/* {selection.length <= 1 && (
          <i
            className="fas fa-pencil-alt"
            title="Edit branch"
            onClick={this.openModal(EDIT)}
          />
        )} */}
        {/* {selection.length >= 1 && (
          <i
            className="fas fa-trash"
            title="Delete branch"
            onClick={this.deleteBranches}
          />
        )} */}
      </div>
      <LargeModal
        show={this.state.show}
        header="Define Fee Code"
        onHide={this.closeModal}
        onSave={this.onSubmit}
        saveText="Submit"
        closeText="Close"
        resetText="Reset"
        showFooter={false}
        onReset={this.resetForm}
        style={{ margin: '0 auto' }}
      >
        <DefineFeeCode closeModal={this.closeModal} />
      </LargeModal>
      <ReactTable
        data={this.props.feeCode}
        columns={columns}
        defaultPageSize={10}
      />
    </div>);
  }
}
function mapStateToProps(state) {
  return { feeCode: state.feeCode.feeCode };
}
export default connect(mapStateToProps)(AdminView);
