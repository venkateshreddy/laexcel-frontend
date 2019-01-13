import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { startCase } from 'lodash';
import { connect } from 'react-redux';
import PreviousNextButtons from '../PreviousNextButtons';
import { Admission } from '../../../actions/ActionType';
import { FieldGroup, FieldSelect } from '../../../components/Form';

class OtherInofrmation extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        isEmployee: 'true',
        employerName: '',
        upscAttempted: 'true',
        noOfAttempts: '',
        particulars: ''
      },
      errors: {
        isEmployee: '',
        employerName: '',
        upscAttempted: '',
        noOfAttempts: '',
        particulars: ''
      }
    };
  }

  onChangeText = name => ({ target: { value } }) => {
    const form = { ...this.state.form };
    const errors = { ...this.state.errors };
    form[name] = value;
    this.props.dispatch({ type: Admission.SET_OTHER_INFORMATION, data: { name, value } });
    this.validateInput(name, value).then(newErrors =>
      this.setState({ errors: newErrors })
    );
    this.setState({ form, errors });
  };

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

  getYesOrNo = () =>
    [{ label: 'Yes', value: true }, { label: 'No', value: false }].map((data) => <option value={data.value}>{data.label}</option>);

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
            id="isEmployee"
            label="Whether student is in employment"
            placeholder="Select Whether student is in employment"
            onChange={this.onChangeText('isEmployee')}
            value={form.isEmployee}
            validationState={errors.isEmployee !== '' ? 'error' : null}
            help={errors.isEmployee !== '' ? errors.isEmployee : null}
            options={this.getYesOrNo()}
          />
        </Col>
        {form.isEmployee === 'true' ? <Col lg={6} md={6} sm={12} xs={12}>
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
            id="upscAttempted"
            label="Attempted Earlier For UPSC Exam"
            placeholder="Select attempted upsc earlier"
            onChange={this.onChangeText('upscAttempted')}
            value={form.upscAttempted}
            validationState={errors.upscAttempted !== '' ? 'error' : null}
            help={errors.upscAttempted !== '' ? errors.upscAttempted : null}
            options={this.getYesOrNo()}
          />
        </Col>
        {form.upscAttempted === 'true' ? <div>
          <Col lg={6} md={6} sm={12} xs={12}>
            <FieldGroup
              id="noOfAttempts"
              type="text"
              label="Number of attempts"
              placeholder="Enter number of attempts"
              onChange={this.onChangeText('noOfAttempts')}
              value={form.noOfAttempts}
              validationState={errors.noOfAttempts !== '' ? 'error' : null}
              help={errors.noOfAttempts !== '' ? errors.noOfAttempts : null}
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
          </Col>
        </div>
          : null}
      </Row>
      <Row style={{ borderTop: '1px solid gray' }}>
        <PreviousNextButtons
          onPrevious={this.onPrevious}
          onNext={this.onNext}
        />
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
