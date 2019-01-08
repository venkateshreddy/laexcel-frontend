import React, { Component } from 'react';
import { startCase } from 'lodash';
import { connect } from 'react-redux';

import { FieldGroup } from '../../components/Form';
import { LargeModal } from '../../components/Modals';
// import {
//   // createState,
//   // deleteState,
//   // updateState
// } from '../../actions/StateAction';
import { handleSnackBar } from '../../actions/DashboardAction';
import {
  createSourceCode,
  updateSourceType
} from '../../actions/CodeAndTypeActions';

const initialForm = {
  name: '',
  code: ''
};

const ADD = 'add';
const EDIT = 'edit';

class SourceCodeForm extends Component {
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
      sourceName: form.name,
      sourceCode: form.code,
      createdBy: this.props.loggedInUser.id
    };
    if (type === ADD) {
      this.props.dispatch(createSourceCode(data, this.callBack));
    }
    if (type === EDIT) {
      this.props.dispatch(
        updateSourceType(
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
        errors[name] = '';
      }
      resolve(errors);
    });

  editStateForm = () => ({
    name: this.props.selectedThisTableRow.sourceName,
    code: this.props.selectedThisTableRow.sourceCode
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

  deleteThisTableRows = () => {
    // this.props.dispatch(
    //   deleteState(this.props.selectedSourceCodes, this.callBack)
    // );
    alert('under development');
  };

  render() {
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
                title="Create Source"
              />
            </li>
            {this.props.selectedSourceCodes.length === 1 ? (
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
                  title="Edit Source"
                  onClick={this.openModal(EDIT)}
                />
              </li>
            ) : (
              ''
            )}
            {this.props.selectedSourceCodes.length > 0 ? (
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
                  title="Delete Source"
                  onClick={this.deleteThisTableRows}
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
            header={`${startCase(type)} Source`}
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
                id="sourceName"
                type="text"
                label="Source Name"
                placeholder="Enter Source name"
                onChange={this.onChangeText('name')}
                value={form.name}
                validationState={errors.name !== '' ? 'error' : null}
                help={errors.name !== '' ? errors.name : null}
              />
              <FieldGroup
                id="sourceCode"
                type="text"
                label="Source Code"
                minLength="1"
                maxLength="2"
                placeholder="Enter Source Code - Max 2 digits"
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

export default connect(mapStateToProps)(SourceCodeForm);
