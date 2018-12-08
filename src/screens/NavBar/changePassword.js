import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { LargeModal } from '../../components/Modals';
import { Button } from 'react-bootstrap';

import ReactBootstrapModal from '../../components/Modals/ReactBootstrapModal';
import { FieldGroup } from '../../components/Form';

const initialForm = {
  currentPass: '',
  newPass1: '',
  newPass2: ''
};

class ChangePassword extends Component {
  state = {
    form: initialForm,
    errors: initialForm
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
  validateInput = (name, value) =>
    new Promise(resolve => {
      const errors = { ...this.state.errors };
      if (value === '') {
        // errors[name] = `${startCase(name)} cannot be empty!`;
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

  render() {
    const { form, errors } = this.state;
    return (
      <ReactBootstrapModal
        show={this.props.show}
        title={'Change Password'}
        resetButton={<Button onClick={this.resetForm}>Reset</Button>}
        cancelText={'Cancel'}
        submitText={'Submit'}
        onHide={this.props.onHide}
      >
        <form>
          <FieldGroup
            id="currentPass"
            type="password"
            label="Current Password"
            placeholder="Enter Current Password"
            onChange={this.onChangeText('currentPass')}
            value={form.currentPass}
            validationState={errors.currentPass !== '' ? 'error' : null}
            help={errors.currentPass !== '' ? errors.currentPass : null}
          />
          <FieldGroup
            id="newPass1"
            type="password"
            label="New Password"
            placeholder="Enter New Password"
            onChange={this.onChangeText('newPass1')}
            value={form.newPass1}
            validationState={errors.newPass1 !== '' ? 'error' : null}
            help={errors.newPass1 !== '' ? errors.newPass1 : null}
          />
          <FieldGroup
            id="newPass2"
            type="password"
            label="Confirm New Password"
            placeholder="Confirm New Password"
            onChange={this.onChangeText('newPass2')}
            value={form.newPass2}
            validationState={errors.newPass2 !== '' ? 'error' : null}
            help={errors.newPass2 !== '' ? errors.newPass2 : null}
          />
        </form>
      </ReactBootstrapModal>
    );
  }
}

export default connect()(ChangePassword);
