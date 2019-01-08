import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FieldGroup, FieldSelect } from '../../../components/Form';
import PreviousNextButtons from '../PreviousNextButtons';
import { setGeneralInformation } from '../../../actions/AdmissionActions';

class GeneralInfo extends Component {
  onPrevious = () => {
    const { previousTab, onChange } = this.props;
    if (previousTab) {
      onChange(previousTab);
    }
  };

  onNext = () => {
    const { nextTab, onChange } = this.props;
    if (nextTab) {
      onChange(nextTab);
    }
  };

  onChange = key => ({ target: { value } }) => {
    this.props.dispatch(setGeneralInformation({ key, value }));
  };

  getCategoryOptions = () => [
    <option key={1} value="BC">
      BC
    </option>,
    <option key={2} value="OC">
      OC
    </option>,
    <option key={3} value="SC">
      SC
    </option>,
    <option key={4} value="ST">
      ST
    </option>
  ];

  render() {
    const { generalInformation } = this.props;
    return (
      <Row>
        <Row>
          <Col lg={6} md={6} sm={6}>
            <FieldGroup
              id="firstName"
              type="text"
              label="First name"
              placeholder="Enter first name"
              onChange={this.onChange('firstName')}
              value={generalInformation.firstName}
              validationState={null}
              help={null}
            />
            <FieldGroup
              id="middleName"
              type="text"
              label="Middle name"
              placeholder="Enter middle name"
              onChange={this.onChange('middleName')}
              value={generalInformation.middleName}
              validationState={null}
              help={null}
            />
            <FieldGroup
              id="lastName"
              type="text"
              label="Last name"
              placeholder="Enter last name"
              onChange={this.onChange('lastName')}
              value={generalInformation.lastName}
              validationState={null}
              help={null}
            />
            <FieldGroup
              id="dob"
              type="date"
              label="Date of Birth"
              placeholder="Enter dob"
              onChange={this.onChange('dob')}
              value={generalInformation.dob}
              validationState={null}
              help={null}
            />
            <FieldGroup
              id="contactNumber"
              type="number"
              label="Contact number"
              placeholder="Contact number"
              onChange={this.onChange('contactNumber')}
              value={generalInformation.contactNumber}
              validationState={null}
              help={null}
            />
            <FieldGroup
              id="email"
              type="email"
              label="Email ID"
              placeholder="Enter number"
              onChange={this.onChange('email')}
              value={generalInformation.email}
              validationState={null}
              help={null}
            />
            <FieldGroup
              id="fatherFirstName"
              type="text"
              label="Father's first name"
              placeholder="Enter first name"
              onChange={this.onChange('fatherFirstName')}
              value={generalInformation.fatherFirstName}
              validationState={null}
              help={null}
            />
            <FieldGroup
              id="fatherMiddleName"
              type="text"
              label="Father's middle name"
              placeholder="Enter middle name"
              onChange={this.onChange('fatherMiddleName')}
              value={generalInformation.fatherMiddleName}
              validationState={null}
              help={null}
            />
            <FieldGroup
              id="fatherLastName"
              type="text"
              label="Father's last name"
              placeholder="Enter last name"
              onChange={this.onChange('fatherLastName')}
              value={generalInformation.fatherLastName}
              validationState={null}
              help={null}
            />
          </Col>
          <Col lg={6} md={6} sm={6}>
            <FieldGroup
              id="fatherOccupation"
              type="text"
              label="Father's occupation"
              placeholder="Enter occupation"
              onChange={this.onChange('fatherOccupation')}
              value={generalInformation.fatherOccupation}
              validationState={null}
              help={null}
            />
            <FieldGroup
              id="fatherContactNumber"
              type="number"
              label="Father's contact number"
              placeholder="Enter number"
              onChange={this.onChange('fatherContactNumber')}
              value={generalInformation.fatherContactNumber}
              validationState={null}
              help={null}
            />
            <FieldGroup
              id="motherName"
              type="text"
              label="Mother's name"
              placeholder="Enter name"
              onChange={this.onChange('motherName')}
              value={generalInformation.motherName}
              validationState={null}
              help={null}
            />
            <FieldGroup
              id="motherOccupation"
              type="text"
              label="Mother's occupation"
              placeholder="Enter occupation"
              onChange={this.onChange('motherOccupation')}
              value={generalInformation.motherOccupation}
              validationState={null}
              help={null}
            />
            <FieldGroup
              id="siblingName"
              type="text"
              label="Sibling's name"
              placeholder="Enter name"
              onChange={this.onChange('siblingName')}
              value={generalInformation.siblingName}
              validationState={null}
              help={null}
            />
            <FieldGroup
              id="qualification"
              type="text"
              label="Education"
              placeholder="Enter education"
              onChange={this.onChange('qualification')}
              value={generalInformation.qualification}
              validationState={null}
              help={null}
            />
            <FieldGroup
              id="institute"
              type="text"
              label="Institute"
              placeholder="Enter institute"
              onChange={this.onChange('institute')}
              value={generalInformation.institute}
              validationState={null}
              help={null}
            />
            <FieldSelect
              id="category"
              label="Category"
              placeholder="Select category"
              onChange={this.onChange('category')}
              value={generalInformation.category}
              validationState={null}
              help={null}
              options={this.getCategoryOptions()}
            />
          </Col>
        </Row>
        <Row>
          <PreviousNextButtons
            onPrevious={this.onPrevious}
            onNext={this.onNext}
          />
        </Row>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  generalInformation: state.admissions.admission.generalInformation
});

export default connect(mapStateToProps)(GeneralInfo);
