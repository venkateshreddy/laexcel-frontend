import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { LargeModal } from '../../components/Modals';

import { FieldGroup } from '../../components/Form';
import { updatePassword } from '../../actions/LoginAction';

const initialForm = {
  currentPass: '',
  newPass1: '',
  newPass2: ''
};

class ChangePassword extends Component {
  state = {
    form: initialForm,
    errors: initialForm,
    showFeedback: false,
    feedback: ''
  };

  onSubmit = () => {
    const { form } = this.state;
    const errors = { ...this.state.errors };
    let isValid = true;
    if (form.currentPass === '') {
      errors.currentPass = 'Current Password cannot be empty';
      isValid = false;
    }
    if (form.newPass1 === '') {
      errors.newPass1 = 'New Password cannot be empty';
      isValid = false;
    }
    if (form.newPass2 === '') {
      errors.newPass2 = 'Confirm New Password cannot be empty';
      isValid = false;
    }
    if (form.newPass1 !== form.newPass2) {
      errors.newPass2 = "New Password and Confirm New Password didn't match";
      isValid = false;
    }
    if (isValid) {
      this.props
        .dispatch(
          updatePassword(this.props.email, form.currentPass, form.newPass1)
        )
        .then(result => {
          if (result.error !== undefined && !result.error) {
            this.resetForm();
            this.props.onHide();
            this.props.showFeedback();
          }
        });
    }
    this.setState({ errors });
  };

  onChangeText = name => ({ target: { value } }) => {
    const form = { ...this.state.form };
    const errors = { ...this.state.errors };
    form[name] = value;
    errors[name] = '';
    this.setState({ form, errors });
  };

  onHide = () => {
    this.resetForm();
    this.props.onHide();
  };

  resetForm = () => this.setState({ form: initialForm, errors: initialForm });

  render() {
    const { form, errors } = this.state;
    return (
      <Fragment>
        <LargeModal
          show={this.props.show}
          header="Change Password"
          resetText="Reset"
          closeText="Cancel"
          saveText="Submit"
          onHide={this.onHide}
          onSave={this.onSubmit}
          onReset={this.resetForm}
          style={{ width: '450px', margin: '0 auto' }}
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
        </LargeModal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  email: state.login.loggedInUser.email
});

export default connect(mapStateToProps)(ChangePassword);
