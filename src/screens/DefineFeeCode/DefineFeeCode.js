import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { startCase } from 'lodash';
import { FieldGroup } from '../../components/Form';
import Button from '../../components/Button/Button';
import { createFeeCode, updateFeeCode } from '../../actions/definefeecodeactions';

class Program extends React.Component {
  constructor(props) {
    super(props);
    let initialForm = null;
    if (Object.keys(props.formData).length === 0) {
      initialForm = {
        type: '',
        code: ''
      };
    } else {
      initialForm = props.formData;
    }
    this.state = {
      form: initialForm,
      errors: {
        type: '',
        code: ''
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
      if (Object.keys(this.props.formData).length === 0) {
        this.props.dispatch(createFeeCode(form, this.resetRegisteration));
      } else {
        const key = '_id';
        this.props.dispatch(updateFeeCode(this.props.formData[key], form, this.resetRegisteration));
      }
      this.props.closeModal();
    }
  };

  resetRegisteration = (data) => {
    const initialForm = {
      type: '',
      code: ''
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
            id="type"
            type="text"
            label="Type"
            placeholder="Enter type"
            onChange={this.onChangeText('type')}
            value={form.type}
            validationState={errors.type !== '' ? 'error' : null}
            help={errors.type !== '' ? errors.type : null}
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
        <Col lg={12} md={12} sm={12} xs={12}>
          <Button value="Submit" onClick={this.onSubmit} />
        </Col>
      </Row>
    </div>);
  }
}
// function mapStateToProps() {
export default connect()(Program);
