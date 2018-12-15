import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import Register from './Register';
import { LargeModal } from '../../components/Modals';
import { fetchEmployees } from '../../actions/employee';

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      columns: [{ Header: 'name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Phone Number', accessor: 'phonenumber' },
      { Header: 'Address', accessor: 'address' },
      { Header: 'Role', accessor: 'role' },
      { Header: 'Status', accessor: 'status' }
      ],
      form: {},
      errors: {}
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchEmployees());
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
        header="Register Employee"
        onHide={this.closeModal}
        onSave={this.onSubmit}
        saveText="Submit"
        closeText="Close"
        resetText="Reset"
        showFooter={false}
        onReset={this.resetForm}
        style={{ margin: '0 auto' }}
      >
        <Register closeModal={this.closeModal} />
      </LargeModal>
      <ReactTable
        data={this.props.employees}
        columns={columns}
        defaultPageSize={10}
      />
    </div>);
  }
}
function mapStateToProps(state) {
  return { employees: state.employee.employees };
}
export default connect(mapStateToProps)(AdminView);
