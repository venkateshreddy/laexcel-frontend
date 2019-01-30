import React, { Component } from 'react';
import { startCase } from 'lodash';
import { connect } from 'react-redux';

import { FieldGroup, FieldSelect } from '../../components/Form';
import { LargeModal } from '../../components/Modals';
import { handleSnackBar } from '../../actions/DashboardAction';
// import {
//   // createCity,
//   // deleteCities,
//   // updateCity
// } from '../../actions/CityActions';
import { createAgency, updateAgency } from '../../actions/CodeAndTypeActions';

const initialForm = {
  name: '',
  code: '',
  state: ''
};

const objectId = '_id';
const ADD = 'add';
const EDIT = 'edit';

class CityForm extends Component {
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

  getSourceTypes = jsonArr =>
    jsonArr.map(stateObj => (
      <option key={stateObj.id} value={stateObj.id}>
        {stateObj.sourceName}
      </option>
    ));

  formatDataAndSave = form => {
    const { type } = this.state;
    const data = {
      agencyName: form.name,
      agencyCode: form.code,
      source: form.state,
      createdBy: this.props.loggedInUser.id
    };
    if (type === ADD) {
      this.props.dispatch(createAgency(data, this.callBack));
    }
    if (type === EDIT) {
      this.props.dispatch(
        updateAgency(
          this.props.selectedThisTableRow[objectId],
          data,
          this.callBack
        )
      );
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
      if (value === '') {
        errors[name] = `${startCase(name)} cannot be empty!`;
      } else if (value !== '') {
        const noSpaceFormat = /[/\s/]/;
        if (name === 'code' && !(value.length >= 3 && value.length <= 4)) {
          errors[name] = 'Branch code must be 3-4 digits!';
        } else if (name === 'name' && noSpaceFormat.test(value)) {
          errors[name] = 'Spaces are not allowed';
        } else if (name === 'code' && noSpaceFormat.test(value)) {
          errors[name] = 'Spaces are not allowed';
        } else {
          errors[name] = '';
        }
      }
      resolve(errors);
    });

  editCityForm = () => ({
    name: this.props.selectedThisTableRow.agencyName,
    code: this.props.selectedThisTableRow.agencyCode,
    state: this.props.selectedThisTableRow.source
  });
  openModal = type => () => {
    if (type === EDIT) {
      const form = this.editCityForm();
      this.setState({ type, form, showModal: true });
    } else {
      this.setState({ type, showModal: true });
    }
  };

  closeModal = () => this.setState({ type: '', showModal: false });

  deleteRow = () => {
    // this.props.dispatch(deleteCities(this.props.selectedCities, this.callBack));
    alert('under development');
  };

  render() {
    console.log('in state', this.state);
    const { showModal, type, form, errors } = this.state;
    const { sourceTypes } = this.props;
    return (
      <div>
        <div>
          <ul
            style={{
              marginLeft: '-39px'
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
                title="Create Agency"
              />
            </li>
            {this.props.selectedAgencyCodes.length === 1 ? (
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
                  onClick={this.openModal(EDIT)}
                  title="Edit Agency"
                />
              </li>
            ) : (
              ''
            )}
            {this.props.selectedAgencyCodes.length > 0 ? (
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
                  title="Delete Agency"
                  onClick={this.deleteRow}
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
                onClick={this.props.toggleThisTableFilter}
              />
            </li>
          </ul>
        </div>
        {showModal && (
          <LargeModal
            show={showModal}
            header={`${startCase(type)} Agency`}
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
                id="states"
                type="text"
                label="Source"
                placeholder="Select Source"
                onChange={this.onChangeText('state')}
                value={form.state}
                validationState={errors.state !== '' ? 'error' : null}
                help={errors.state !== '' ? errors.state : null}
                options={this.getSourceTypes(sourceTypes)}
              />
              <FieldGroup
                id="cityName"
                type="text"
                label="Agency Name"
                placeholder="Enter agency name"
                onChange={this.onChangeText('name')}
                value={form.name}
                validationState={errors.name !== '' ? 'error' : null}
                help={errors.name !== '' ? errors.name : null}
              />
              <FieldGroup
                id="cityCode"
                type="text"
                label="Agency Code"
                minLength="3"
                maxLength="4"
                placeholder="Enter agency Code 3 - 4 digits"
                onChange={this.onChangeText('code')}
                value={form.code}
                validationState={errors.code !== '' ? 'error' : null}
                help={errors.code !== '' ? errors.code : null}
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
  sourceTypes: state.codesAndTypes.sourceTypes
});

export default connect(mapStateToProps)(CityForm);
