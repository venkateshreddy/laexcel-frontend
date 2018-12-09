import React, { Component } from 'react';
import { startCase, findIndex } from 'lodash';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { SnackBar } from '../../components/SnackBar';
import { FieldGroup, FieldSelect } from '../../components/Form';
import { LargeModal } from '../../components/Modals';
import './Campus.scss';
import {
  createCampus,
  deleteCampuses,
  updateCampus
} from '../../actions/CampusActions';

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
const EDIT = 'edit';

class CampusForm extends Component {
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

  setEditData = id => {
    const { campuses } = this.props;
    const index = findIndex(campuses, { id });
    if (index >= 0) {
      const form = {
        campusName: campuses[index].campusName,
        campusCode: campuses[index].campusCode,
        parentBranch: campuses[index].parentBranch,
        line1: campuses[index].address.line1,
        line2: campuses[index].address.line2,
        line3: campuses[index].address.line3,
        city: campuses[index].city,
        state: campuses[index].state,
        pincode: campuses[index].pincode
      };
      this.setState({ type: EDIT, showModal: true, form });
    } else {
      this.setState({
        showFeedback: true,
        feedback: 'Unable to edit data at the moment!'
      });
    }
  };

  deleteCampuses = () => {
    if (window.confirm('This action will delete all the selected campuses!')) {
      this.props.dispatch(deleteCampuses({ ids: this.props.selection }));
    }
  };

  formatDataAndSave = form => {
    const objectId = '_id';
    const { type } = this.state;
    const { currentOrganisation } = this.props;
    const data = {
      campusName: form.campusName,
      campusCode: form.campusCode,
      parentBranch: form.parentBranch,
      parentOrg: currentOrganisation.id,
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
      this.props
        .dispatch(createCampus(data))
        .then(result => this.showFeedback(result, 'added'));
      this.closeModal();
      this.resetForm();
    }
    if (type === EDIT) {
      this.props
        .dispatch(updateCampus(this.props.selection[0], data))
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
        feedback: `Campus ${actionType} successfully!`
      });
    }
  };

  hideSnackBar = () => this.setState({ showFeedback: false, feedback: '' });

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
          feedback: 'Please select a campus to edit!'
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
    const { cities, branches, selection } = this.props;
    return (
      <div>
        <div className="action-icons">
          <i
            className="fas fa-plus"
            title="Add campus"
            onClick={this.openModal(ADD)}
          />
          {selection.length <= 1 && (
            <i
              className="fas fa-pencil-alt"
              title="Edit campus"
              onClick={this.openModal(EDIT)}
            />
          )}
          {selection.length >= 1 && (
            <i
              className="fas fa-trash"
              title="Delete campus"
              onClick={this.deleteCampuses}
            />
          )}
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
              <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
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
                    validationState={
                      errors.parentBranch !== '' ? 'error' : null
                    }
                    help={
                      errors.parentBranch !== '' ? errors.parentBranch : null
                    }
                    options={this.getOptions(branches, 'name', 'id')}
                  />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
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
  cities: state.cities.cities,
  branches: state.branch.branches,
  campuses: state.campus.campuses,
  currentOrganisation: state.organisations.currentOrganisation
});

export default connect(mapStateToProps)(CampusForm);
