import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { startCase } from 'lodash';
import { connect } from 'react-redux';
import { FieldGroup, FieldSelect } from '../../../components/Form';

class OtherInofrmation extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        studentIsInEmployment: 'Yes',
        employerName: '',
        attemptedUpscEarler: 'Yes',
        numberOfAttempts: '',
        particulars: ''
      },
      errors: {
        studentIsInEmployment: '',
        employerName: '',
        attemptedUpscEarler: '',
        numberOfAttempts: '',
        particulars: ''
      }
    };
  }

  onChangeText = name => ({ target: { value } }) => {
    const form = { ...this.state.form };
    const errors = { ...this.state.errors };
    form[name] = value;
    this.validateInput(name, value).then(newErrors =>
      this.setState({ errors: newErrors })
    );
    this.setState({ form, errors });
  };

  getYesOrNo = () => {
    const options = ['Yes', 'No'].map((data) => {
      console.log(data);
      return <option value={data}>{data}</option>;
    });
    return options;
  }

  validateInput = (name, value) =>
    new Promise(resolve => {
      const errors = { ...this.state.errors };
      if (value === '') {
        errors[name] = `${startCase(name)} cannot be empty!`;
      } else if (value !== '') {
        const splCharsAllowed = ['email', 'address'];
        // eslint-disable-next-line
        const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (!splCharsAllowed.includes(name) && format.test(value)) {
          errors[name] = 'Special characters are not allowed!';
        } else if (name === 'email') {
          // eslint-disable-next-line
          const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!emailFormat.test(value)) {
            errors[name] = 'invalid email';
          } else {
            errors[name] = '';
          }
        } else {
          errors[name] = '';
        }
      }
      resolve(errors);
    });

  render() {
    const { form, errors } = this.state;
    return (<div>
      <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldSelect
            id="studentIsInEmployment"
            label="Whether student is in employment"
            placeholder="Select Whether student is in employment"
            onChange={this.onChangeText('studentIsInEmployment')}
            value={form.studentIsInEmployment}
            validationState={errors.studentIsInEmployment !== '' ? 'error' : null}
            help={errors.studentIsInEmployment !== '' ? errors.studentIsInEmployment : null}
            options={this.getYesOrNo()}
          />
        </Col>
        {form.studentIsInEmployment === 'Yes' ? <Col lg={6} md={6} sm={12} xs={12}>
          <FieldGroup
            id="employerName"
            type="text"
            label="Name of Employer"
            placeholder="Enter name of employer"
            onChange={this.onChangeText('employerName')}
            value={form.employerName}
            validationState={errors.employerName !== '' ? 'error' : null}
            help={errors.employerName !== '' ? errors.employerName : null}
          />
        </Col>
          : null}
      </Row>
      <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldSelect
            id="attemptedUpscEarler"
            label="Attempted Earlier For UPSC Exam"
            placeholder="Select attempted upsc earlier"
            onChange={this.onChangeText('attemptedUpscEarler')}
            value={form.attemptedUpscEarler}
            validationState={errors.attemptedUpscEarler !== '' ? 'error' : null}
            help={errors.attemptedUpscEarler !== '' ? errors.attemptedUpscEarler : null}
            options={this.getYesOrNo()}
          />
        </Col>
        {form.attemptedUpscEarler === 'Yes' ? <div><Col lg={6} md={6} sm={12} xs={12}>
          <FieldGroup
            id="numberOfAttempts"
            type="text"
            label="Number of attempts"
            placeholder="Enter number of attempts"
            onChange={this.onChangeText('numberOfAttempts')}
            value={form.numberOfAttempts}
            validationState={errors.numberOfAttempts !== '' ? 'error' : null}
            help={errors.numberOfAttempts !== '' ? errors.numberOfAttempts : null}
          />
        </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <FieldGroup
              id="particulars"
              type="text"
              label="Particulars"
              placeholder="Enter particulars"
              onChange={this.onChangeText('particulars')}
              value={form.particulars}
              validationState={errors.particulars !== '' ? 'error' : null}
              help={errors.particulars !== '' ? errors.particulars : null}
            />
          </Col></div>
          : null}
      </Row>
    </div>);
  }
}
function mapStateToProps(state) {
  return {
    program: state.program.program
  };
}
export default connect(mapStateToProps)(OtherInofrmation);
