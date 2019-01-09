import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PreviousNextButtons from '../PreviousNextButtons';
import { FieldGroup, FieldRadio } from '../../../components/Form';
import { SnackBar } from '../../../components/SnackBar';
import {
  setAdmissionInformation,
  prefillGeneralInfo
} from '../../../actions/AdmissionActions';
import { fetchEnquiresByStudent } from '../../../actions/PreAdmissionActions';

const initialState = {
  name: '',
  email: '',
  number: ''
};

class AdmissionInfo extends Component {
  state = {
    disableNext: true,
    form: initialState,
    showFeedback: false,
    feedback: ''
  };

  onSearchClick = () => {
    const { name, email, number } = this.state.form;
    if (name !== '' || email !== '' || number !== '') {
      this.props
        .dispatch(fetchEnquiresByStudent({ name, email, number }))
        .then(response => {
          if (response.error !== undefined) {
            if (!response.error && response.payload.length) {
              const student = response.payload[0];
              const data = {
                firstName: student.StudentName,
                email: student.Email,
                contactNumber: student.ContactNumber
              };
              this.props.dispatch(prefillGeneralInfo(data));
              this.setState({ disableNext: false });
            }
            this.showFeedback(response.message);
            setTimeout(this.hideSnackBar, 2000);
          }
        });
    } else {
      alert('Please fill at least on field to continue!');
    }
  };

  onNext = () => {
    const { nextTab, onChange } = this.props;
    if (nextTab) {
      onChange(nextTab);
    }
  };

  onRadioChange = key => ({ target: { name, checked } }) => {
    const value = checked ? name : '';
    this.props.dispatch(setAdmissionInformation({ key, value }));
    if (name === 'Direct Admission') {
      this.setState({ disableNext: !checked });
    }
  };

  showFeedback = feedback => {
    this.setState({
      showFeedback: true,
      feedback
    });
  };

  hideSnackBar = () => this.setState({ showFeedback: false, feedback: '' });

  handleChange = name => ({ target: { value } }) => {
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });
  };

  resetForm = () => {
    this.setState({
      form: { email: '', name: '', number: '' }
    });
    this.resetModalForm();
  };

  render() {
    const { admissionInformation } = this.props;
    const { disableNext, form, showFeedback, feedback } = this.state;
    return (
      <Row>
        <Row style={{ margin: '10px' }}>
          <Col lg={6} md={6} sm={6}>
            <FieldRadio
              id="thruCounselling"
              label="Admission Type"
              checked={admissionInformation.thruCounselling}
              values={['Through Counselling', 'Direct Admission']}
              onChange={this.onRadioChange('thruCounselling')}
            />
          </Col>
        </Row>
        {admissionInformation.thruCounselling === 'Through Counselling' && (
          <Row>
            <Row>
              <Col lg={6} md={6} sm={6}>
                <FieldGroup
                  id="name"
                  type="text"
                  label="Name of Student"
                  placeholder="Enter name"
                  onChange={this.handleChange('name')}
                  value={form.name}
                  validationState={null}
                  help={null}
                />
              </Col>
              <Col lg={6} md={6} sm={6}>
                <FieldGroup
                  id="number"
                  type="text"
                  label="Contact Number"
                  placeholder="Enter number"
                  onChange={this.handleChange('number')}
                  value={form.number}
                  validationState={null}
                  help={null}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={6}>
                <FieldGroup
                  id="email"
                  type="text"
                  label="Email ID"
                  placeholder="Enter number"
                  onChange={this.handleChange('email')}
                  value={form.email}
                  validationState={null}
                  help={null}
                />
              </Col>
            </Row>
            <Row className="text-right margin">
              <Button
                style={{ marginRight: '15px' }}
                onClick={this.resetForm}
                bsStyle="primary"
              >
                Reset
              </Button>
              <Button
                style={{ marginRight: '15px' }}
                onClick={this.onSearchClick}
                bsStyle="primary"
              >
                Search
              </Button>
            </Row>
          </Row>
        )}
        <Row style={{ borderTop: '1px solid gray' }}>
          <PreviousNextButtons
            disablePrevious
            disableNext={disableNext}
            onNext={this.onNext}
          />
        </Row>
        <SnackBar
          open={showFeedback}
          onClose={this.hideSnackBar}
          msg={feedback}
        />
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  admissionInformation: state.admissions.admission.admissionInformation
});

export default connect(mapStateToProps)(AdmissionInfo);
