import React, { Component } from 'react';
import { startCase, findIndex, reduce, map, split, capitalize } from 'lodash';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
// import { DayPickerInput } from '../../components/DatePicker';

import { SnackBar } from '../../components/SnackBar';
import { FieldGroup, FieldSelect, FieldRadio } from '../../components/Form';
import './PreAdmissions.scss';
import {
  updateBranch,
  deleteBranches,
  fetchBranches
} from '../../actions/BranchActions';
import { fetchCities } from '../../actions/CityActions';
import {
  fetchAgencyCodes,
  fetchSourceCodes
} from '../../actions/CodeAndTypeActions';
import { fetchStates } from '../../actions/StateAction';
import { createPreAdmission } from '../../actions/PreAdmissionActions';

const initialForm = {
  dateOfEnquiry: '',
  sourceType: '',
  agencyCode: '',
  branch: '',
  Program: '',
  StudentName: '',
  ContactNumber: '',
  Email: '',
  ageOrDoB: '',
  line1: '',
  line2: '',
  line3: '',
  city: '',
  state: '',
  pincode: '',
  wetherInEmployment: '',
  employerParticulars: '',
  referredBy: '',
  admissionNumber: ''
};

const ADD = 'add';
const EDIT = 'edit';

const ProgramOptions = [
  { name: 'Program 1', id: 'Program 1' },
  { name: 'Program 2', id: 'Program 2' },
  { name: 'Program 3', id: 'Program 3' }
];

const getTitleCase = string =>
  reduce(map(split(string, ' '), capitalize), (a, b) => `${a} ${b}`);

class PreAdmissionsForm extends Component {
  state = {
    type: ADD,
    showModal: false,
    form: initialForm,
    errors: initialForm,
    showFeedback: false,
    feedback: ''
  };

  componentDidMount() {
    this.props.dispatch(fetchBranches());
    this.props.dispatch(fetchCities());
    this.props.dispatch(fetchStates());
    this.props.dispatch(fetchSourceCodes());
    this.props.dispatch(fetchAgencyCodes());
  }

  onSubmit = () => {
    const mandatoryFields = [
      'Program',
      'StudentName',
      'ContactNumber',
      'Email'
    ];
    const { form } = this.state;
    const errors = { ...this.state.errors };
    Object.keys(form).map(name => {
      if (form[name] === '' && mandatoryFields.includes(name)) {
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

  onDayChange = name => value => {
    const form = { ...this.state.form };
    form[name] = value;
    this.setState({ form });
  };

  onChangeText = name => ({ target: { value } }) => {
    const form = { ...this.state.form };
    const errors = { ...this.state.errors };
    if (name === 'StudentName') {
      form[name] = getTitleCase(value);
    } else {
      form[name] = value;
    }
    this.validateInput(name, value).then(newErrors =>
      this.setState({ errors: newErrors })
    );
    this.setState({ form, errors });
  };

  onRadioSelect = key => ({ target: { name, checked } }) => {
    const form = { ...this.state.form };
    const errors = { ...this.state.errors };
    form[key] = checked ? name : '';
    errors[key] = '';
    this.setState({ form, errors });
  };

  getCities = cities => {
    const { form } = this.state;
    const objectId = '_id';
    if (form.state !== '') {
      return cities.map(city => {
        if (city.state[objectId] === form.state) {
          return (
            <option key={city.id} value={city.id}>
              {city.cityName}
            </option>
          );
        }
        return null;
      });
    }
    return (
      <option key="0" value="">
        --Please Select State First--
      </option>
    );
  };

  getOptions = (array, label, value) =>
    array.map(data => (
      <option key={data.id} value={data[value]}>
        {data[label]}
      </option>
    ));

  setEditData = id => {
    const { branches } = this.props;
    const index = findIndex(branches, { id });
    if (index >= 0) {
      const form = {
        name: branches[index].name,
        code: branches[index].code,
        line1: branches[index].address.line1,
        line2: branches[index].address.line2,
        line3: branches[index].address.line3,
        city: branches[index].city,
        pincode: branches[index].pincode
      };
      this.setState({ type: EDIT, showModal: true, form });
    } else {
      this.setState({
        showFeedback: true,
        feedback: 'Unable to edit data at the moment!'
      });
    }
  };

  deleteBranches = () => {
    if (window.confirm('This action will delete all the selected branches!')) {
      this.props.dispatch(deleteBranches({ ids: this.props.selection }));
    }
  };

  formatDataAndSave = form => {
    const { type } = this.state;
    const data = {
      Program: form.Program,
      StudentName: form.StudentName,
      ContactNumber: form.ContactNumber,
      Email: form.Email,
      sourceType: form.sourceType,
      agencyCode: form.agencyCode,
      others: {
        dateOfEnquiry: form.dateOfEnquiry,
        branch: form.branch,
        ageOrDoB: form.ageOrDoB,
        line1: form.line1,
        line2: form.line2,
        line3: form.line3,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        wetherInEmployment: form.wetherInEmployment,
        employerParticulars: form.employerParticulars,
        referredBy: form.referredBy,
        admissionNumber: form.admissionNumber
      },
      createdBy: this.props.loggedInUser.id
    };
    if (type === ADD) {
      this.props
        .dispatch(createPreAdmission(data))
        .then(result => this.showFeedback(result, 'added'));
      // this.closeModal();
      this.resetForm();
    }
    if (type === EDIT) {
      this.props
        .dispatch(updateBranch(this.props.selection[0], data))
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
        feedback: `Enquiry ${actionType} successfully!`
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
        const splCharsAllowed = ['line1', 'line2', 'line3', 'Email'];
        // eslint-disable-next-line
        const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        const emailFormat = /\S+@\S+\.\S+/;
        if (!splCharsAllowed.includes(name) && format.test(value)) {
          errors[name] = 'Special characters are not allowed!';
        } else if (name === 'pincode' && value.length !== 6) {
          errors[name] = 'Pincode must be 6 digits long!';
        } else if (name === 'Email' && !emailFormat.test(value)) {
          errors[name] = 'Invalid Email Format';
        } else if (name === 'ContactNumber' && value.length > 10) {
          errors[name] = 'Contact Number should not exceed 10 digits';
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
          feedback: 'Please select a branch to edit!'
        });
      }
    }
  };

  closeModal = () => this.setState({ type: '', showModal: false });

  render() {
    const {
      // type,
      form,
      errors,
      feedback,
      showFeedback
    } = this.state;
    const { cities, states, branches, sourceTypes, agencyCodes } = this.props;
    return (
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <div className="browse-wrap padding">
            <form>
              <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                  {/* <div>
                    <label>Date Of Enquiry</label>
                    <br />
                    <DayPickerInput
                      style={{ width: '100%' }}
                      value={form.dateOfEnquiry}
                      onDayChange={this.onDayChange('dateOfEnquiry')}
                    />
                  </div> */}
                  <FieldSelect
                    id="sourceType"
                    label="Source Type"
                    placeholder="Select source type"
                    onChange={this.onChangeText('sourceType')}
                    value={form.sourceType}
                    validationState={errors.sourceType !== '' ? 'error' : null}
                    help={errors.sourceType !== '' ? errors.sourceType : null}
                    options={this.getOptions(sourceTypes, 'sourceName', 'id')}
                  />
                  <FieldSelect
                    id="agencyCode"
                    label="Agency Code"
                    placeholder="Select agency code"
                    onChange={this.onChangeText('agencyCode')}
                    value={form.agencyCode}
                    validationState={errors.agencyCode !== '' ? 'error' : null}
                    help={errors.agencyCode !== '' ? errors.agencyCode : null}
                    options={this.getOptions(agencyCodes, 'agencyName', 'id')}
                  />
                  <FieldSelect
                    id="branch"
                    label="Enquiry for Branch"
                    placeholder="Select a branch"
                    onChange={this.onChangeText('branch')}
                    value={form.branch}
                    validationState={errors.branch !== '' ? 'error' : null}
                    help={errors.branch !== '' ? errors.branch : null}
                    options={this.getOptions(branches, 'name', 'id')}
                  />
                  <FieldSelect
                    id="Program"
                    label="Enquiry for Program"
                    placeholder="Select a program"
                    onChange={this.onChangeText('Program')}
                    value={form.Program}
                    validationState={errors.Program !== '' ? 'error' : null}
                    help={errors.Program !== '' ? errors.Program : null}
                    options={this.getOptions(ProgramOptions, 'name', 'id')}
                  />
                  <FieldGroup
                    id="StudentName"
                    type="text"
                    label="Name of Student"
                    placeholder="Enter student name"
                    onChange={this.onChangeText('StudentName')}
                    value={form.StudentName}
                    validationState={errors.StudentName !== '' ? 'error' : null}
                    help={errors.StudentName !== '' ? errors.StudentName : null}
                  />
                  <FieldGroup
                    id="ContactNumber"
                    type="number"
                    label="Contact Number"
                    placeholder="Enter contact number"
                    onChange={this.onChangeText('ContactNumber')}
                    value={form.ContactNumber}
                    validationState={
                      errors.ContactNumber !== '' ? 'error' : null
                    }
                    help={
                      errors.ContactNumber !== '' ? errors.ContactNumber : null
                    }
                  />
                  <FieldGroup
                    id="Email"
                    type="text"
                    label="Email"
                    placeholder="Enter email"
                    onChange={this.onChangeText('Email')}
                    value={form.Email}
                    validationState={errors.Email !== '' ? 'error' : null}
                    help={errors.Email !== '' ? errors.Email : null}
                  />
                  <FieldGroup
                    id="ageOrDoB"
                    type="text"
                    label="Age/Date of Birth"
                    placeholder="Enter age or DoB"
                    onChange={this.onChangeText('ageOrDoB')}
                    value={form.ageOrDoB}
                    validationState={errors.ageOrDoB !== '' ? 'error' : null}
                    help={errors.ageOrDoB !== '' ? errors.ageOrDoB : null}
                  />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <label>Address for communication</label>
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
                    id="state"
                    label="State"
                    placeholder="Select state"
                    onChange={this.onChangeText('state')}
                    value={form.state}
                    validationState={errors.state !== '' ? 'error' : null}
                    help={errors.state !== '' ? errors.state : null}
                    options={this.getOptions(states, 'stateName', 'id')}
                  />
                  <FieldSelect
                    id="city"
                    label="City"
                    placeholder="Enter city"
                    onChange={this.onChangeText('city')}
                    value={form.city}
                    validationState={errors.city !== '' ? 'error' : null}
                    help={errors.city !== '' ? errors.city : null}
                    options={this.getCities(cities)}
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
                  <FieldRadio
                    id="wetherInEmployment"
                    label="Whether In Employment"
                    checked={form.wetherInEmployment}
                    values={['Yes', 'No']}
                    onChange={this.onRadioSelect('wetherInEmployment')}
                    validationState={
                      errors.wetherInEmployment !== '' ? 'error' : null
                    }
                    help={
                      errors.wetherInEmployment !== ''
                        ? errors.wetherInEmployment
                        : null
                    }
                  />
                  <FieldGroup
                    id="employerParticulars"
                    type="text"
                    label="Employer Particulars"
                    placeholder="Enter employer particulars"
                    onChange={this.onChangeText('employerParticulars')}
                    value={form.employerParticulars}
                    validationState={
                      errors.employerParticulars !== '' ? 'error' : null
                    }
                    help={
                      errors.employerParticulars !== ''
                        ? errors.employerParticulars
                        : null
                    }
                  />
                  <FieldGroup
                    id="referredBy"
                    type="text"
                    label="Referred By"
                    placeholder=""
                    onChange={this.onChangeText('referredBy')}
                    value={form.referredBy}
                    validationState={errors.referredBy !== '' ? 'error' : null}
                    help={errors.referredBy !== '' ? errors.referredBy : null}
                  />
                  <FieldGroup
                    id="admissionNumber"
                    type="number"
                    label="Admission Number"
                    placeholder="Enter admission number"
                    onChange={this.onChangeText('admissionNumber')}
                    value={form.admissionNumber}
                    validationState={
                      errors.admissionNumber !== '' ? 'error' : null
                    }
                    help={
                      errors.admissionNumber !== ''
                        ? errors.admissionNumber
                        : null
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12} xs={12} />
                <Col lg={6} md={6} sm={12} xs={12} className="text-right">
                  <Button
                    onClick={this.resetForm}
                    className="margin-right"
                    bsStyle="primary"
                  >
                    Reset
                  </Button>
                  <Button onClick={this.onSubmit} bsStyle="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </form>
            <SnackBar
              open={showFeedback}
              onClose={this.hideSnackBar}
              msg={feedback}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser,
  cities: state.cities.cities,
  branches: state.branch.branches,
  states: state.states.states,
  sourceTypes: state.codesAndTypes.sourceTypes,
  agencyCodes: state.codesAndTypes.agencyCodes
});

export default connect(mapStateToProps)(PreAdmissionsForm);
