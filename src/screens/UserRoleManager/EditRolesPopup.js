import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Select from 'react-select';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Select } from '../../components/Dropdown';
import Button from '../../components/Button/Button';
import roles from '../../data/roles.json';
import { updateRolesOfUsers } from '../../actions/UserActions';

class EditRolePopup extends Component {
  constructor() {
    super();
    this.state = {
      Heading: '',
      otherOptions: [],
      selectedOption: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitRoles = this.submitRoles.bind(this);
    this.closeEditPopup = this.closeEditPopup.bind(this);
  }

  componentWillMount() {
    const data = { ...this.props };
    let Heading = '';
    if (data.allUsers.length === data.selectedData.length) {
      if (data.selectedData.length === 1) {
        data.allUsers.map(au => {
          if (data.selectedData.indexOf(au.id) >= 0) {
            Heading = au.userName;
          }
          return null;
        });
      } else {
        Heading = 'All Users';
      }
    } else if (data.selectedData.length > 1) {
      Heading = 'Multiple Users';
    } else if (data.selectedData.length === 1) {
      data.allUsers.map(au => {
        if (data.selectedData.indexOf(au.id) >= 0) {
          Heading = au.userName;
        }
        return null;
      });
    }
    // const staticOption = [];
    // let staticOptionObj = {};

    const otherOptions = [];
    let otherOptionsObj = {};
    roles.roles.map(r => {
      // staticOptionObj = {};
      if (r.value === 'Reader') {
        // do nothing
      } else {
        otherOptionsObj = r;
        otherOptions.push(otherOptionsObj);
      }
      return null;
    });
    // this.setState({ Heading, staticOption, otherOptions });
    this.setState({ Heading, otherOptions });
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  submitRoles() {
    const data = { ...this.props };
    let isValid = true;
    const rolesArray = [];
    // this.state.staticOption.map(sto => rolesArray.push(sto.value));
    if (this.state.selectedOption.value) {
      rolesArray.push(this.state.selectedOption.value);
    } else {
      alert('Please select a role to proceed');
      isValid = false;
    }
    if (isValid) {
      this.props.dispatch(
        updateRolesOfUsers(data.selectedData, rolesArray, data.closePopup)
      );
    }
  }

  closeEditPopup() {
    this.setState({ openEditPopup: false });
  }
  render() {
    const { selectedOption } = this.state;
    return (
      <div>
        <DialogTitle id="simple-dialog-title">
          {`Edit Roles For ${this.state.Heading}`}
          <button
            type="button"
            onClick={this.props.closePopup}
            className="close dialogue-close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </DialogTitle>
        {/* <div>{`Edit Roles For ${this.state.Heading}`}</div> */}
        {/* <Select value={this.state.staticOption} isDisabled /> */}
        <div className="padding">
          <Select
            id="design"
            className="custom-select"
            placeholder="Choose Role"
            label="Roles:"
            value={selectedOption}
            onChange={this.handleChange}
            options={this.state.otherOptions}
            isMulti={false}
          />
          <div className="text-center margin-top">
            <Button
              bsStyle="primary"
              bsSize="small"
              className="custom-button"
              onClick={this.submitRoles}
              variant="contained"
              value="Update"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(EditRolePopup);
