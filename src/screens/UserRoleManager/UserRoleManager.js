import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { Row, Col } from 'react-bootstrap';
// import Modal from 'react-responsive-modal';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import 'react-table/react-table.css';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import { fetchUsers, deleteUser } from '../../actions/UserActions';
import EditRolesPopup from './EditRolesPopup';
import AddUserPopup from './AddUserPopup';
import { TextInput } from '../../components/Input';
// import withAuth from '../../hocs/Auth';
// import { ADMIN } from '../Dashboard/InitialFormState';

// const Admin = withAuth(ADMIN);

const CheckboxTable = checkboxHOC(ReactTable);
const styles = theme => ({
  paper: { minWidth: '30vw', minHeight: '32vh' },
  button: {
    margin: theme.spacing.unit
  }
});

class UserRoleManager extends Component {
  constructor() {
    super();
    this.state = {
      selection: [],
      selectAll: false,
      openEditPopup: false,
      openAddPopup: false,
      searchStr: ''
    };
    // this.createTableData = this.createTableData.bind(this);
    this.editRoles = this.editRoles.bind(this);
    this.openAddUser = this.openAddUser.bind(this);
    this.closeEditPopup = this.closeEditPopup.bind(this);
    this.closeAddPopup = this.closeAddPopup.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(fetchUsers());
  }

  getEditIcon = () => (
    <i
      className="far fa-edit"
      title="Edit Roles"
      onClick={() => this.editRoles()}
    />
  );
  getAddIcon = () => (
    <i className="fas fa-plus" title="Add User" onClick={this.openAddUser} />
  );
  getDelIcon = () => (
    <i
      className="fas fa-minus"
      title="Delete Users"
      onClick={this.deleteUser}
    />
  );
  closeAddPopup() {
    this.setState({ openAddPopup: false });
  }
  editRoles() {
    if (this.state.selection.length > 0) {
      this.setState({ openEditPopup: true });
    } else {
      alert('Please Select a Row to Edit Roles');
    }
  }
  openAddUser() {
    this.setState({ openAddPopup: true });
  }
  closeEditPopup() {
    this.setState({ openEditPopup: false });
  }
  deleteUser() {
    if (this.state.selection.length > 0) {
      const delConfirm = confirm('Proceed to Delete?');
      if (delConfirm) {
        this.props.dispatch(
          deleteUser(this.state.selection, this.deleteCallback)
        );
      }
    } else {
      alert('Please Select a Row to Delete User');
    }
  }
  deleteCallback = response => alert(response.message);
  // createTableData(props) {
  //   if (props.allUsers.length > 0) {
  //     const data = [];
  //     let dataObj = {};
  //     const chanceId = '_id';
  //     props.allUsers.map(u => {
  //       dataObj = {};
  //       if (u.status !== 'INACTIVE') {
  //         dataObj.email = u.email;
  //         dataObj.id = u.id;
  //         dataObj.name = u.name;
  //         dataObj.rolesString = u.roles.toString();
  //         dataObj[chanceId] = u.id;
  //         data.push(dataObj);
  //       }
  //       return null;
  //     });
  //     return data;
  //   }
  //   return [];
  // }
  toggleSelection = (key, shift, row) => {
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(row.id);
    if (keyIndex >= 0) {
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      selection.push(row.id);
    }
    this.setState({ selection });
  };

  toggleAll = () => {
    const selectAll = !this.state.selectAll;
    const selection = [];
    if (selectAll) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      const key1 = '_original';
      const key2 = 'id';
      currentRecords.forEach(item => {
        selection.push(item[key1][key2]);
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => this.state.selection.includes(key);
  searchRecords = event => {
    this.setState({ searchStr: event.target.value });
  };
  render() {
    const props = { ...this.props };
    const data = props.allUsers.filter(
      row =>
        Object.values(row)
          .join('##')
          .toLowerCase()
          .indexOf(this.state.searchStr.toLowerCase()) >= 0
    );
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

    return (
      <div className="addprocess-panel">
        <Row>
          <Col lg={3} md={12} className="action-wrap no-padding">
            <ul className="action-buttons" style={{ margin: '5px' }}>
              <li>{this.getAddIcon()}</li>
              {this.state.selection.length > 0 && <li>{this.getEditIcon()}</li>}
              {this.state.selection.length > 0 && <li>{this.getDelIcon()}</li>}
              {/* <Modal
                open={this.state.openEditPopup}
                onClose={this.closeEditPopup}
                center
              >
                <EditRolesPopup
                  selectedData={this.state.selection}
                  allUsers={props.allUsers}
                  closePopup={this.closeEditPopup}
                />
              </Modal>
              <Modal
                open={this.state.openAddPopup}
                onClose={this.closeAddPopup}
                center
              >
                <AddUserPopup
                  selectedData={this.state.selection}
                  allUsers={props.allUsers}
                  closePopup={this.closeAddPopup}
                />
              </Modal> */}
              <Dialog
                open={this.state.openAddPopup}
                onClose={this.closeAddPopup}
                aria-labelledby="simple-dialog-title"
                classes={{
                  paper: props.classes.paper
                }}
                fullWidth
              >
                <DialogTitle id="simple-dialog-title">
                  Add New User{' '}
                  <button
                    type="button"
                    onClick={this.closeAddPopup}
                    className="close dialogue-close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </DialogTitle>
                <AddUserPopup closePopup={this.closeAddPopup} />
              </Dialog>
              <Dialog
                open={this.state.openEditPopup}
                onClose={this.closeEditPopup}
                aria-labelledby="simple-dialog-title"
                classes={{
                  paper: props.classes.paper
                }}
                // fullWidth
              >
                <EditRolesPopup
                  selectedData={this.state.selection}
                  allUsers={props.allUsers}
                  closePopup={this.closeEditPopup}
                />
                {/* <div className="modal-footer">
                  <button
                    type="button"
                    onClick={this.closeEditPopup}
                    className="btn btn-default no-margin"
                  >
                    Close
                  </button>
                </div> */}
              </Dialog>
            </ul>
          </Col>
          <Col lg={7} md={12} className="action-wrap no-padding" />
          <Col lg={2} md={12} className="action-wrap no-padding">
            <TextInput
              className="custom-box full-width search-box"
              type="string"
              id="search"
              placeholder="Search"
              value={this.state.searchString}
              onChange={this.searchRecords}
            />
          </Col>
        </Row>
        <CheckboxTable
          ref={r => {
            this.checkboxTable = r;
          }}
          data={data}
          columns={[
            { Header: 'Full Name', accessor: 'name' },
            { Header: 'Email Id', accessor: 'email' },
            { Header: 'Roles', accessor: 'roles' },
            { Header: 'Status', accessor: 'status' }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          {...checkboxProps}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allUsers: state.usersReducer.allUsers,
    roles: state.login.loggedInUser ? state.login.loggedInUser.roles : []
  };
}
const enhancedComp = withStyles(styles)(UserRoleManager);
export default connect(mapStateToProps)(enhancedComp);
