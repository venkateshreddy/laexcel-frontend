import React, { Component } from 'react';
import { startCase, findIndex } from 'lodash';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { SnackBar } from '../../components/SnackBar';
import { FieldGroup, FieldSelect } from '../../components/Form';
import { LargeModal } from '../../components/Modals';
import './Branch.scss';
import {
  createAcademicYear,
  updateAcademicYear,
  deleteAcademicYear
} from '../../actions/AcademicYearActions';

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
const EDIT = 'edit';

class AcademicYearForm extends Component {
  state = {
    type: '',
    form: initialForm,
    errors: initialForm,
    showModal: false,
    showFeedback: false,
    feedback: ''
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

  setEditData = id => {
    const { academicYears } = this.props;
    const index = findIndex(academicYears, { id });
    if (index >= 0) {
      const form = {
        name: academicYears[index].name,
        code: academicYears[index].status
      };
      this.setState({ type: EDIT, showModal: true, form });
    } else {
      this.setState({
        showFeedback: true,
        feedback: 'Invalid Edit!'
      });
    }
  };

  getOptions = () =>
    ['Active', 'Inactive'].map(opt => (
      <option key={opt.toUpperCase()} value={opt.toUpperCase()}>
        {opt}
      </option>
    ));
  deleteAcademicYears = () => {
    if (window.confirm('This action will delete all the selected academic years!')) {
      this.props.dispatch(deleteAcademicYear({ ids: this.props.selection }));
    }
  };
  formatDataAndSave = form => {
    const { type } = this.state;
    const data = {
      academicYear: form.name,
      status: form.status,
      createdBy: this.props.loggedInUser.id
    };
    if (type === ADD) {
      this.props
        .dispatch(createAcademicYear(data))
        .then(result => this.showFeedback(result, 'added'));
      this.closeModal();
      this.resetForm();
    }
    if (type === EDIT) {
      this.props
        .dispatch(updateAcademicYear(this.props.selection[0], data))
        .then(result => this.showFeedback(result, 'updated'));
      this.closeModal();
      this.resetForm();
    }
  };
  resetForm = () => this.setState({ form: initialForm, errors: initialForm });
  showFeedback = (result, actionType) => {
    if (result.error !== undefined && !result.error) {
      this.setState({
        showFeedback: true,
        feedback: `Branch ${actionType} successfully!`
      });
    }
  };
  hideSnackBar = () => this.setState({ showFeedback: false, feedback: '' });
  validateInput = (name, value) =>
    new Promise(resolve => {
      const errors = { ...this.state.errors };
      if (value === '') {
        errors[name] = `${startCase(name)} cannot be empty!`;
      }
      resolve(errors);
    });
  openModal = type => () => {
    if (type === ADD) {
      this.setState({ type, showModal: true });
    } else {
      const { selection } = this.props;
      if (selection.length === 1) {
        this.setEditData(selection[0]);
      } else if (selection.length === 0) {
        this.setState({
          showFeedback: true,
          feedback: 'Please select a branch to edit!'
        });
      }
    }
  };
  closeModal = () => this.setState({ type: '', showModal: false });
  render() {
    const {
      showModal,
      type,
      form,
      errors,
      feedback,
      showFeedback
    } = this.state;
    const { selection } = this.props;
    return (
      <div>
        <div className="action-icons">
          <i
            className="fas fa-plus"
            title="Add Academic Year"
            onClick={this.openModal(ADD)}
          />
          {selection.length <= 1 && (
            <i
              className="fas fa-pencil-alt"
              title="Edit branch"
              onClick={this.openModal(EDIT)}
            />
          )}
          {selection.length >= 1 && (
            <i
              className="fas fa-trash"
              title="Delete branch"
              onClick={this.deleteAcademicYears}
            />
          )}
        </div>
        {showModal && (
          <LargeModal
            show={showModal}
            header={`${startCase(type)} Branch`}
            onHide={this.closeModal}
            onSave={this.onSubmit}
            saveText="Submit"
            closeText="Close"
            resetText="Reset"
            onReset={this.resetForm}
            style={{ margin: '0 auto' }}
          >
            <form>
              <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <FieldGroup
                    id="academicYear"
                    type="text"
                    label="Academic Year"
                    placeholder="Enter Academic Year"
                    onChange={this.onChangeText('name')}
                    value={form.name}
                    validationState={errors.name !== '' ? 'error' : null}
                    help={errors.name !== '' ? errors.name : null}
                  />
                  <FieldSelect
                    id="status"
                    label="Status"
                    placeholder="Choose Status"
                    onChange={this.onChangeText('status')}
                    value={form.status}
                    validationState={errors.status !== '' ? 'error' : null}
                    help={errors.status !== '' ? errors.status : null}
                    options={this.getOptions()}
                  />
                </Col>
              </Row>
            </form>
          </LargeModal>
        )}
        <SnackBar
          open={showFeedback}
          onClose={this.hideSnackBar}
          msg={feedback}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser,
  academicYears: state.academicYears.academicYears
});

export default connect(mapStateToProps)(AcademicYearForm);
