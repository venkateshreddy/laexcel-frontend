import React, { Component } from 'react';
import { startCase } from 'lodash';
import { connect } from 'react-redux';

import { FieldGroup, FieldSelect } from '../../components/Form';
import { LargeModal } from '../../components/Modals';
import { handleSnackBar } from '../../actions/DashboardAction';
import { createOrg, deleteOrg, updateOrg } from '../../actions/OrganisationActions';

const initialForm = {
  legalStatus: '',
  orgName: '',
  orgShortName: '',
  line1: '',
  line2: '',
  line3: '',
  state: '',
  city: '',
  orgPan: '',
  pincode: ''
};

const objectId = '_id';
const ADD = 'add';
const EDIT = 'edit';

class OrganisationForm extends Component {
  state = {
    type: '',
    form: initialForm,
    errors: initialForm,
    showModal: false
  };

  onSubmit = () => {
    const { form } = this.state;
    const errors = { ...this.state.errors };
    Object.keys(form).map(name => {
      if (form[name] === '') {
        errors[name] = `${startCase(name)} cannot be empty!`;
      }
      return name;
    });
    const hasNoErrors = Object.keys(errors).every(name => errors[name] === '');
    if (!hasNoErrors) {
      this.setState({ errors });
    } else {
      this.formatDataAndSave(form);
    }
  };

  onChangeText = name => ({ target: { value } }) => {
    const form = { ...this.state.form };
    const errors = { ...this.state.errors };
    form[name] = value;
    this.validateInput(name, value).then(newErrors =>
      this.setState({ errors: newErrors })
    );
    this.setState({ form, errors });
  };

  getLegalStatuses = () => {
    const LegalStatusesArray = [
      { id: 0, name: 'Company' },
      { id: 1, name: 'Partnership' },
      { id: 2, name: 'Proprietory Concern' }
    ];
    return LegalStatusesArray.map(legalStatus => (
      <option key={legalStatus.id} value={legalStatus.name}>
        {legalStatus.name}
      </option>
    ));
  };
  getStates = states =>
    states.map(stateObj => (
      <option key={stateObj.id} value={stateObj.id}>
        {stateObj.stateName}
      </option>
    ));
  getCities = cities => {
    const { form } = this.state;
    if (form.state !== '') {
      return cities.map(city => {
        if (city.state[objectId] === form.state) {
          return (
            <option key={city.id} value={city.id}>
              {city.cityName}
            </option>
          );
        }
        return null;
      });
    }
    return (
      <option key="0" value="">
        --Please Select State First--
      </option>
    );
  };

  formatDataAndSave = form => {
    const { type } = this.state;
    const data = {
      legalStatus: form.legalStatus,
      orgName: form.orgName,
      orgShortName: form.orgShortName,
      orgAddress: {
        line1: form.line1,
        line2: form.line2,
        line3: form.line3
      },
      state: form.state,
      city: form.city,
      orgPAN: form.orgPan,
      orgPin: form.pincode,
      createdBy: this.props.loggedInUser.id
    };
    if (type === ADD) {
      this.props.dispatch(createOrg(data, this.callBack));
    }
    if (type === EDIT) {
      this.props.dispatch(updateOrg(this.props.selectedTableRow.id, data, this.callBack));
    }
  };

  callBack = APIresponse => {
    this.props.dispatch(
      handleSnackBar({ snackBarOpen: true, snackBarMsg: APIresponse.message })
    );
    if (!APIresponse.error) {
      this.closeModal();
      this.resetForm();
      this.props.changeParentState();
    }
  };

  resetForm = () => this.setState({ form: initialForm, errors: initialForm });

  validateInput = (name, value) =>
    new Promise(resolve => {
      const errors = { ...this.state.errors };
      console.log(value);
      if (value === '' || value === 'select') {
        errors[name] = `${startCase(name)} cannot be empty!`;
      } else if (value !== '') {
        const splCharsAllowed = ['line1', 'line2', 'line3', 'orgPan'];
        // eslint-disable-next-line
        const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (!splCharsAllowed.includes(name) && format.test(value)) {
          errors[name] = 'Special characters are not allowed!';
        } else if (name === 'pincode' && value.length !== 6) {
          errors[name] = 'Pincode must be 6 digits long!';
        } else if (name === 'orgPan' && value.length !== 10) {
          errors[name] = 'PAN must be 10 digits long!';
        } else {
          errors[name] = '';
        }
      }
      resolve(errors);
    });

  editForm = () => ({
    legalStatus: this.props.selectedTableRow.legalStatus,
    orgName: this.props.selectedTableRow.orgName,
    orgShortName: this.props.selectedTableRow.orgShortName,
    line1: this.props.selectedTableRow.orgAddress.line1,
    line2: this.props.selectedTableRow.orgAddress.line2,
    line3: this.props.selectedTableRow.orgAddress.line3,
    state: this.props.selectedTableRow.state[objectId],
    city: this.props.selectedTableRow.city[objectId],
    orgPan: this.props.selectedTableRow.orgPAN,
    pincode: this.props.selectedTableRow.orgPin
  });
  openModal = type => () => {
    if (type === EDIT) {
      const form = this.editForm();
      this.setState({ type, form, showModal: true });
    } else {
      this.setState({ type, showModal: true });
    }
  };

  closeModal = () => {
    this.setState({ type: '', showModal: false });
    this.resetForm();
  }

  deleteOrganisations = () => {
    this.props.dispatch(
      deleteOrg(this.props.selectedOrganisations, this.callBack)
    );
  };

  render() {
    const { showModal, type, form, errors } = this.state;
    const { states, cities } = this.props;
    return (
      <div>
        <div>
          <ul
            style={{
              marginLeft: '-40px'
            }}
          >
            <li
              style={{
                display: 'inline',
                padding: '5px',
                color: '#0073a8'
              }}
            >
              <i
                className="fas fa-plus"
                aria-hidden="true"
                onClick={this.openModal(ADD)}
                title="Create Organisation"
              />
            </li>
            {this.props.selectedOrganisations.length === 1 ? (
              <li
                style={{
                  display: 'inline',
                  padding: '5px',
                  color: '#0073a8'
                }}
              >
                <i
                  className="far fa-edit"
                  aria-hidden="true"
                  title="Edit Organisation"
                  onClick={this.openModal(EDIT)}
                />
              </li>
            ) : (
              ''
            )}
            {this.props.selectedOrganisations.length > 0 ? (
              <li
                style={{
                  display: 'inline',
                  padding: '5px',
                  color: '#0073a8'
                }}
              >
                <i
                  className="fa fa-trash"
                  aria-hidden="true"
                  title="Delete Organisation"
                  onClick={this.deleteOrganisations}
                />
              </li>
            ) : (
              ''
            )}
            <li
              style={{
                display: 'inline',
                padding: '5px',
                color: '#0073a8'
              }}
            >
              <i
                className="fas fa-filter"
                title="Filter Table"
                onClick={this.props.toggleTableFilter}
              />
            </li>
          </ul>
        </div>
        {showModal && (
          <LargeModal
            show={showModal}
            header={`${startCase(type)} Organisation`}
            onHide={this.closeModal}
            onSave={this.onSubmit}
            saveText="Submit"
            closeText="Close"
            resetText="Reset"
            onReset={this.resetForm}
            style={{ width: '450px', margin: '0 auto' }}
          >
            <form>
              <FieldSelect
                id="legalStatus"
                type="text"
                label="Legal Status"
                placeholder="Select Legal Status"
                onChange={this.onChangeText('legalStatus')}
                value={form.legalStatus}
                validationState={errors.legalStatus !== '' ? 'error' : null}
                help={errors.legalStatus !== '' ? errors.legalStatus : null}
                options={this.getLegalStatuses()}
              />
              <FieldGroup
                id="orgName"
                type="text"
                label="Organisation Name"
                placeholder="Enter Organisation name"
                onChange={this.onChangeText('orgName')}
                value={form.orgName}
                validationState={errors.orgName !== '' ? 'error' : null}
                help={errors.orgName !== '' ? errors.orgName : null}
              />
              <FieldGroup
                id="orgShortName"
                type="text"
                label="Organisation Short Name"
                placeholder="Enter Organisation Short name"
                onChange={this.onChangeText('orgShortName')}
                value={form.orgShortName}
                validationState={errors.orgShortName !== '' ? 'error' : null}
                help={errors.orgShortName !== '' ? errors.orgShortName : null}
              />
              <label>Organisation Address</label>
              <FieldGroup
                id="line1"
                type="text"
                label="Line 1"
                placeholder="Enter address"
                onChange={this.onChangeText('line1')}
                value={form.line1}
                validationState={errors.line1 !== '' ? 'error' : null}
                help={errors.line1 !== '' ? errors.line1 : null}
              />
              <FieldGroup
                id="line2"
                type="text"
                label="Line 2"
                placeholder="Enter address"
                onChange={this.onChangeText('line2')}
                value={form.line2}
                validationState={errors.line2 !== '' ? 'error' : null}
                help={errors.line2 !== '' ? errors.line2 : null}
              />
              <FieldGroup
                id="line3"
                type="text"
                label="Line 3"
                placeholder="Enter address"
                onChange={this.onChangeText('line3')}
                value={form.line3}
                validationState={errors.line3 !== '' ? 'error' : null}
                help={errors.line3 !== '' ? errors.line3 : null}
              />
              <FieldSelect
                id="state"
                type="text"
                label="State"
                placeholder="Select State"
                onChange={this.onChangeText('state')}
                value={form.state}
                validationState={errors.state !== '' ? 'error' : null}
                help={errors.state !== '' ? errors.state : null}
                options={this.getStates(states)}
              />
              <FieldSelect
                id="city"
                type="text"
                label="City"
                placeholder="Select City"
                onChange={this.onChangeText('city')}
                value={form.city}
                validationState={errors.city !== '' ? 'error' : null}
                help={errors.city !== '' ? errors.city : null}
                options={this.getCities(cities)}
              />
              <FieldGroup
                id="orgPan"
                type="text"
                label="PAN"
                placeholder="Enter 10 digit PAN"
                onChange={this.onChangeText('orgPan')}
                value={form.orgPan}
                validationState={errors.orgPan !== '' ? 'error' : null}
                help={errors.orgPan !== '' ? errors.orgPan : null}
              />
              <FieldGroup
                id="pincode"
                type="number"
                label="Pincode"
                placeholder="Enter pincode"
                onChange={this.onChangeText('pincode')}
                value={form.pincode}
                validationState={errors.pincode !== '' ? 'error' : null}
                help={errors.pincode !== '' ? errors.pincode : null}
              />
            </form>
          </LargeModal>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser,
  states: state.states.states,
  cities: state.cities.cities
});

export default connect(mapStateToProps)(OrganisationForm);
