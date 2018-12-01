import React, { Component } from 'react';
import { startCase } from 'lodash';
import { connect } from 'react-redux';

import { FieldGroup, FieldSelect } from '../../components/Form';
import { LargeModal } from '../../components/Modals';
import './Branch.scss';
import { createBranch } from '../../actions/BranchActions';

const initialForm = {
  name: '',
  code: '',
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

class BranchForm extends Component {
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

  getCities = () => [
    <option value="select">--select--</option>,
    <option value="chennai">Chennai</option>,
    <option value="delhi">Delhi</option>,
    <option value="hyderabad">Hyderabad</option>,
    <option value="mumbai">Mumbai</option>
  ];

  formatDataAndSave = form => {
    const { type } = this.state;
    const data = {
      name: form.name,
      code: form.code,
      parentOrg: null,
      state: null,
      address: {
        line1: form.line1,
        line2: form.line2,
        line3: form.line3
      },
      cityName: form.city,
      pincode: form.pincode,
      createdBy: null
    };
    if (type === ADD) {
      this.props.dispatch(createBranch(data));
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
        if (name === 'code' && !(value.length >= 3 && value.length <= 4)) {
          errors[name] = 'Branch code must be 3-4 digits!';
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
    return (
      <div>
        <div className="action-icons">
          <i className="fas fa-plus" onClick={this.openModal(ADD)} />
          {/* <i className="fas fa-pencil-alt" onClick={this.openModal(EDIT)} /> */}
        </div>
        {showModal && (
          <LargeModal
            show={showModal}
            header={`${startCase(type)} Branch`}
            onHide={this.closeModal}
            onSave={this.onSubmit}
            saveText="Submit"
            closeText="Close"
            style={{ width: '450px', margin: '0 auto' }}
          >
            <form>
              <FieldGroup
                id="branchName"
                type="text"
                label="Branch Name"
                placeholder="Enter branch name"
                onChange={this.onChangeText('name')}
                value={form.name}
                validationState={errors.name !== '' ? 'error' : null}
                help={errors.name !== '' ? errors.name : null}
              />
              <FieldGroup
                id="branchCode"
                type="text"
                label="Branch Code"
                minLength="3"
                maxLength="4"
                placeholder="Enter branch Code"
                onChange={this.onChangeText('code')}
                value={form.code}
                validationState={errors.code !== '' ? 'error' : null}
                help={errors.code !== '' ? errors.code : null}
              />
              <label>Branch Address</label>
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
                type="text"
                label="City"
                placeholder="Enter city"
                onChange={this.onChangeText('city')}
                value={form.city}
                validationState={errors.city !== '' ? 'error' : null}
                help={errors.city !== '' ? errors.city : null}
                options={this.getCities()}
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

export default connect()(BranchForm);
