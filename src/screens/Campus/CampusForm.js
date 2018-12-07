import React, { Component } from 'react';
import { startCase, findIndex } from 'lodash';
import { connect } from 'react-redux';

import { FieldGroup, FieldSelect } from '../../components/Form';
import { LargeModal } from '../../components/Modals';
import './Campus.scss';
import { createCampus } from '../../actions/CampusActions';

const initialForm = {
  campusName: '',
  campusCode: '',
  parentBranch: '',
  // parentOrg: null,
  line1: '',
  line2: '',
  line3: '',
  city: '',
  // state: null,
  pincode: ''
};

const ADD = 'add';
// const EDIT = 'edit';

class CampusForm extends Component {
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

  getOptions = (array, label, value) =>
    array.map(data => (
      <option key={data.id} value={data[value]}>
        {data[label]}
      </option>
    ));

  getState = city => {
    const { cities } = this.props;
    const index = findIndex(cities, { id: city });
    return index >= 0 ? cities[index].state : null;
  };

  formatDataAndSave = form => {
    const objectId = '_id';
    const { type } = this.state;
    const data = {
      campusName: form.campusName,
      campusCode: form.campusCode,
      parentBranch: form.parentBranch,
      parentOrg: null,
      state: this.getState(form.city)[objectId],
      address: {
        line1: form.line1,
        line2: form.line2,
        line3: form.line3
      },
      city: form.city,
      pincode: form.pincode,
      createdBy: this.props.loggedInUser.id
    };
    if (type === ADD) {
      this.props.dispatch(createCampus(data));
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
        const splCharsAllowed = ['line1', 'line2', 'line3'];
        // eslint-disable-next-line
        const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (
          name === 'campusCode' &&
          !(value.length >= 3 && value.length <= 4)
        ) {
          errors[name] = 'Campus code must be 3-4 digits!';
        } else if (!splCharsAllowed.includes(name) && format.test(value)) {
          errors[name] = 'Special characters are not allowed!';
        } else if (name === 'pincode' && value.length !== 6) {
          errors[name] = 'Pincode must be 6 digits long!';
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
    const { cities, branches } = this.props;
    return (
      <div>
        <div className="action-icons">
          <i className="fas fa-plus" onClick={this.openModal(ADD)} />
          {/* <i className="fas fa-pencil-alt" onClick={this.openModal(EDIT)} /> */}
        </div>
        {showModal && (
          <LargeModal
            show={showModal}
            header={`${startCase(type)} Campus`}
            onHide={this.closeModal}
            onSave={this.onSubmit}
            onReset={this.resetForm}
            saveText="Submit"
            closeText="Close"
            style={{ width: '450px', margin: '0 auto' }}
          >
            <form>
              <FieldGroup
                id="campusName"
                type="text"
                label="Campus Name"
                placeholder="Enter campus name"
                onChange={this.onChangeText('campusName')}
                value={form.campusName}
                validationState={errors.campusName !== '' ? 'error' : null}
                help={errors.campusName !== '' ? errors.campusName : null}
              />
              <FieldGroup
                id="campusCode"
                type="text"
                label="Campus Code"
                minLength="3"
                maxLength="4"
                placeholder="Enter campus Code"
                onChange={this.onChangeText('campusCode')}
                value={form.campusCode}
                validationState={errors.campusCode !== '' ? 'error' : null}
                help={errors.campusCode !== '' ? errors.campusCode : null}
              />
              <FieldSelect
                id="parentBranch"
                label="Branch"
                placeholder="Enter branch"
                onChange={this.onChangeText('parentBranch')}
                value={form.parentBranch}
                validationState={errors.parentBranch !== '' ? 'error' : null}
                help={errors.parentBranch !== '' ? errors.parentBranch : null}
                options={this.getOptions(branches, 'name', 'id')}
              />
              <label>Campus Address</label>
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
                id="city"
                label="City"
                placeholder="Enter city"
                onChange={this.onChangeText('city')}
                value={form.city}
                validationState={errors.city !== '' ? 'error' : null}
                help={errors.city !== '' ? errors.city : null}
                options={this.getOptions(cities, 'cityName', 'id')}
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
  cities: state.cities.cities,
  branches: state.branch.branches
});

export default connect(mapStateToProps)(CampusForm);
