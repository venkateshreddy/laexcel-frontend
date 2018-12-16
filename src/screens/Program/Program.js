import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { startCase } from 'lodash';
import { FieldGroup, FieldSelect } from '../../components/Form';
import Button from '../../components/Button/Button';
import { createProgram } from '../../actions/programactions';

class Program extends React.Component {
  constructor(props) {
    super(props);
    const initialForm = {
      name: '',
      code: '',
      gstApplicable: '',
      rateOfGst: ''
    };
    this.state = {
      form: initialForm,
      errors: initialForm
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
    }
    console.log(form);
    if (hasNoErrors) {
      // this.formatDataAndSave(form);
      if (form.password === form.confirmpassword) {
        errors.password = '';
        this.props.dispatch(createProgram(form, this.resetRegisteration));
        this.props.closeModal();
      } else {
        errors.password = 'password didn\'t match';
        this.setState({ errors });
      }
    }
  };

  getGstApplicable() {
    return ['Yes', 'No'].map((each) => <option value={each}>{each}</option>);
  }
  getRateOfGst() {
    return ['2', '4'].map((each) => <option value={each}>{each}</option>);
  }
  resetRegisteration = (data) => {
    const initialForm = {
      name: '',
      code: '',
      gstApplicable: '',
      rateOfGst: ''
    };
    this.setState({ errors: initialForm, form: initialForm });
    alert(data.message);
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
          <FieldGroup
            id="name"
            type="text"
            label="Name"
            placeholder="Enter name"
            onChange={this.onChangeText('name')}
            value={form.name}
            validationState={errors.name !== '' ? 'error' : null}
            help={errors.name !== '' ? errors.name : null}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldGroup
            id="code"
            type="text"
            label="Code"
            placeholder="Enter code"
            onChange={this.onChangeText('code')}
            value={form.code}
            validationState={errors.code !== '' ? 'error' : null}
            help={errors.code !== '' ? errors.code : null}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldSelect
            id="role"
            label="Gst Applicable"
            placeholder="Select gst applicable"
            onChange={this.onChangeText('gstApplicable')}
            value={form.role}
            validationState={errors.role !== '' ? 'error' : null}
            help={errors.city !== '' ? errors.city : null}
            options={this.getGstApplicable()}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldSelect
            id="rateOfGst"
            label="Rate of Gst"
            placeholder="Select rate of gst"
            onChange={this.onChangeText('rateOfGst')}
            value={form.role}
            validationState={errors.role !== '' ? 'error' : null}
            help={errors.city !== '' ? errors.city : null}
            options={this.getRateOfGst()}
          />
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Button value="Submit" onClick={this.onSubmit} />
        </Col>
      </Row>
    </div>);
  }
}
// function mapStateToProps() {
export default connect()(Program);
