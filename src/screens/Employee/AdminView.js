import React from 'react';
import ReactTable from 'react-table';
import { Row } from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import { connect } from 'react-redux';
import Register from './Register';
import { LargeModal } from '../../components/Modals';
import { fetchEmployees, deleteEmployee } from '../../actions/employee';

const CheckboxTable = checkboxHOC(ReactTable);

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
      errors: {},
      selectAll: [],
      selection: [],
      filterable: false,
      formData: {}
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchEmployees());
  }
  closeModal = () => {
    this.setState({ show: false, formData: {} });
  }
  openRegisterForm = () => {
    this.setState({ show: true });
  }

  openEditRegistertion = () => {
    const key = '_id';
    this.props.employees.map((data) => {
      if (data[key].toString() === this.state.selection[0].toString()) {
        this.setState({ formData: data });
      }
      return null;
    });
    this.setState({ show: true });
  }

  deleteEmployee = () => {
    this.props.dispatch(deleteEmployee(this.state.selection[0]));
  }

  toggleSelection = key => {
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    if (keyIndex >= 0) {
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      selection.push(key);
    }
    this.setState({ selection }, () => { });
  };

  toggleAll = () => {
    const selectAll = !this.state.selectAll;
    const selection = [];
    if (selectAll) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      const key1 = '_original';
      const key2 = '_id';
      currentRecords.forEach(item => {
        selection.push(item[key1][key2]);
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => this.state.selection.includes(key);

  toggleTableFilter = () => {
    this.setState({ filterable: !this.state.filterable });
  }

  render() {
    const { toggleSelection, toggleAll, isSelected } = this;
    const { selectAll } = this.state;
    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: 'checkbox',
      getTrProps: (s, r) => {
        const temp = 'id';
        const selected = r && r.original && this.isSelected(r.original[temp]);
        return {
          style: {
            backgroundColor: selected ? '#ccc' : 'inherit'
            // color: selected ? 'white' : 'inherit',
          }
        };
      }
    };
    const { columns, selection } = this.state;
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Register Employee</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div className="action-icons">
            <i
              className="fas fa-plus"
              title="Register Employee"
              onClick={this.openRegisterForm}
            />
            <i
              className="fas fa-filter"
              title="Filter Table"
              onClick={this.toggleTableFilter}
            />
            {selection.length === 1 && (
              <i
                className="fas fa-pencil-alt"
                title="Edit branch"
                onClick={this.openEditRegistertion}
              />
            )}
            {selection.length === 1 && (
              <i
                className="fas fa-trash"
                title="Delete branch"
                onClick={this.deleteEmployee}
              />
            )}
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
            <Register closeModal={this.closeModal} formData={this.state.formData} />
          </LargeModal>
          <Row className="action-wrap">
            <CheckboxTable
              ref={r => {
                this.checkboxTable = r;
              }} // TABLE
              data={this.props.employees}
              filterable={this.state.filterable}
              columns={columns}
              defaultPageSize={10}
              className="-striped -highlight"
              {...checkboxProps}
            />
          </Row>
        </Panel.Body>
      </Panel>);
  }
}
function mapStateToProps(state) {
  return { employees: state.employee.employees };
}
export default connect(mapStateToProps)(AdminView);
