import React, { Component } from 'react';
import { startCase } from 'lodash';
import { connect } from 'react-redux';

import { FieldGroup, FieldSelect } from '../../components/Form';
import { LargeModal } from '../../components/Modals';
import { handleSnackBar } from '../../actions/DashboardAction';
import { createCity } from '../../actions/CityActions';

const initialForm = {
  name: '',
  code: '',
  state: ''
};

const ADD = 'add';
// const EDIT = 'edit';

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

  getStates = states =>
    states.map(stateObj => (
      <option key={stateObj.id} value={stateObj.id}>
        {stateObj.stateName}
      </option>
    ));

  formatDataAndSave = form => {
    const { type } = this.state;
    const data = {
      cityName: form.name,
      cityShortCode: form.code,
      state: form.state,
      createdBy: this.props.loggedInUser.id
    };
    if (type === ADD) {
      this.props.dispatch(createCity(data, this.callBack));
    }
  };

  callBack = APIresponse => {
    this.props.dispatch(
      handleSnackBar({ snackBarOpen: true, snackBarMsg: APIresponse.message })
    );
    if (!APIresponse.error) {
      this.closeModal();
      this.resetForm();
    }
  };

  resetForm = () => this.setState({ form: initialForm, errors: initialForm });

  validateInput = (name, value) =>
    new Promise(resolve => {
      const errors = { ...this.state.errors };
      if (value === '') {
        errors[name] = `${startCase(name)} cannot be empty!`;
      } else if (value !== '') {
        if (name === 'code' && !(value.length >= 3 && value.length <= 4)) {
          errors[name] = 'Branch code must be 3-4 digits!';
        } else {
          errors[name] = '';
        }
      }
      resolve(errors);
    });

  openModal = type => () => this.setState({ type, showModal: true });

  closeModal = () => this.setState({ type: '', showModal: false });

  render() {
    const { showModal, type, form, errors } = this.state;
    const { states } = this.props;
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
                title="Create City"
              />
            </li>
            {this.props.selectedCities.length > 0 ? (
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
                  // onClick={() =>
                  //   // this.setState({ openCreateAnnouncement: true })
                  //   this.getSelectedAnnouncementData(
                  //     this.state.selection[0],
                  //     announcements
                  //   )
                  // }
                  title="Edit City"
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
                onClick={this.props.toggleCitiesTableFilter}
              />
            </li>
          </ul>
        </div>
        {showModal && (
          <LargeModal
            show={showModal}
            header={`${startCase(type)} City`}
            onHide={this.closeModal}
            onSave={this.onSubmit}
            saveText="Submit"
            closeText="Close"
            resetText="Reset"
            onReset={this.resetForm}
            style={{ width: '450px', margin: '0 auto' }}
          >
            <form>
              <FieldGroup
                id="cityName"
                type="text"
                label="City Name"
                placeholder="Enter city name"
                onChange={this.onChangeText('name')}
                value={form.name}
                validationState={errors.name !== '' ? 'error' : null}
                help={errors.name !== '' ? errors.name : null}
              />
              <FieldGroup
                id="cityCode"
                type="text"
                label="City Code"
                minLength="3"
                maxLength="4"
                placeholder="Enter state Code 3 - 4 digits"
                onChange={this.onChangeText('code')}
                value={form.code}
                validationState={errors.code !== '' ? 'error' : null}
                help={errors.code !== '' ? errors.code : null}
              />
              <FieldSelect
                id="states"
                type="text"
                label="State"
                placeholder="Select State"
                onChange={this.onChangeText('state')}
                value={form.state}
                validationState={errors.state !== '' ? 'error' : null}
                help={errors.state !== '' ? errors.state : null}
                options={this.getStates(states)}
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
  states: state.states.states
});

export default connect(mapStateToProps)(CityForm);
