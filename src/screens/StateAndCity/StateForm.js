import React, { Component } from 'react';
import { startCase } from 'lodash';
import { connect } from 'react-redux';

import { FieldGroup } from '../../components/Form';
import { LargeModal } from '../../components/Modals';
import {
  createState,
  deleteState,
  updateState
} from '../../actions/StateAction';
import { handleSnackBar } from '../../actions/DashboardAction';

const initialForm = {
  name: '',
  code: ''
};

const ADD = 'add';
const EDIT = 'edit';

class StateForm extends Component {
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

  formatDataAndSave = form => {
    const objectId = '_id';
    const { type } = this.state;
    const data = {
      stateName: form.name,
      stateShortCode: form.code,
      createdBy: this.props.loggedInUser.id
    };
    if (type === ADD) {
      this.props.dispatch(createState(data, this.callBack));
    }
    if (type === EDIT) {
      this.props.dispatch(
        updateState(
          this.props.selectedStateTableRow[objectId],
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
        errors[name] = '';
      }
      resolve(errors);
    });

  editStateForm = () => ({
    name: this.props.selectedStateTableRow.stateName,
    code: this.props.selectedStateTableRow.stateShortCode
  });
  openModal = type => () => {
    if (type === EDIT) {
      const form = this.editStateForm();
      this.setState({ type, form, showModal: true });
    } else {
      this.setState({ type, showModal: true });
    }
  };

  closeModal = () => this.setState({ type: '', showModal: false });

  deleteState = () => {
    this.props.dispatch(deleteState(this.props.selectedStates, this.callBack));
  };

  render() {
    console.log('in state', this.state);
    const { showModal, type, form, errors } = this.state;
    return (
      <div>
        <div>
          {/* <i className="fas fa-pencil-alt" onClick={this.openModal(EDIT)} /> */}

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
                title="Create State"
              />
            </li>
            {this.props.selectedStates.length === 1 ? (
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
                  title="Edit State"
                  onClick={this.openModal(EDIT)}
                />
              </li>
            ) : (
              ''
            )}
            {this.props.selectedStates.length > 0 ? (
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
                  title="Delete State"
                  onClick={this.deleteState}
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
                onClick={this.props.toggleStateTableFilter}
              />
            </li>
          </ul>
        </div>
        {showModal && (
          <LargeModal
            show={showModal}
            header={`${startCase(type)} State`}
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
                id="stateName"
                type="text"
                label="State Name"
                placeholder="Enter state name"
                onChange={this.onChangeText('name')}
                value={form.name}
                validationState={errors.name !== '' ? 'error' : null}
                help={errors.name !== '' ? errors.name : null}
              />
              <FieldGroup
                id="stateCode"
                type="text"
                label="State Code"
                minLength="1"
                maxLength="2"
                placeholder="Enter state Code - Max 2 digits"
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
  loggedInUser: state.login.loggedInUser
});

export default connect(mapStateToProps)(StateForm);
