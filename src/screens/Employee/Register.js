import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { startCase, cloneDeep } from 'lodash';
import { FieldGroup, FieldSelect } from '../../components/Form';
import Button from '../../components/Button/Button';
import { createEmployee, updateEmployee } from '../../actions/employee';

class Register extends React.Component {
  constructor(props) {
    super(props);
    let initialForm;
    if (Object.keys(props.formData).length === 0) {
      initialForm = {
        name: '',
        email: '',
        password: '',
        phonenumber: '',
        address: '',
        confirmpassword: '',
        role: ''
      };
    } else {
      const propsUpdate = cloneDeep(props.formData);
      propsUpdate.confirmpassword = props.formData.password;
      initialForm = propsUpdate;
    }
    this.state = {
      form: initialForm,
      errors: {
        name: '',
        email: '',
        password: '',
        phonenumber: '',
        address: '',
        confirmpassword: '',
        role: ''
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
    if (hasNoErrors) {
      // this.formatDataAndSave(form);
      if (form.password === form.confirmpassword) {
        errors.password = '';
        if (Object.keys(this.props.formData).length === 0) {
          this.props.dispatch(createEmployee(form, this.resetRegisteration));
        } else {
          const key = '_id';
          this.props.dispatch(updateEmployee(form, this.props.formData[key], this.resetRegisteration));
        }
        this.props.closeModal();
      } else {
        errors.password = 'password didn\'t match';
        this.setState({ errors });
      }
    }
  };

  getRoles() {
    return ['Teaching', 'Non teaching', 'Tele caller'].map((each) => <option value={each}>{each}</option>);
  }
  resetRegisteration = () => {
    const initialForm = {
      name: '',
      email: '',
      password: '',
      phonenumber: '',
      address: '',
      confirmpassword: '',
      role: ''
    };
    this.setState({ errors: initialForm, form: initialForm });
    if (Object.keys(this.props.formData).length === 0) {
      alert('Registeration successfull');
    } else {
      alert('update successfull');
    }
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
            id="email"
            type="text"
            label="Email"
            placeholder="Enter email"
            onChange={this.onChangeText('email')}
            value={form.email}
            validationState={errors.email !== '' ? 'error' : null}
            help={errors.email !== '' ? errors.email : null}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldGroup
            id="password"
            type="password"
            label="Password"
            placeholder="Enter password"
            onChange={this.onChangeText('password')}
            value={form.password}
            validationState={errors.password !== '' ? 'error' : null}
            help={errors.password !== '' ? errors.password : null}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldGroup
            id="confirmpassword"
            type="password"
            label="Confirm password"
            placeholder="Confirm password"
            onChange={this.onChangeText('confirmpassword')}
            value={form.confirmpassword}
            validationState={errors.confirmpassword !== '' ? 'error' : null}
            help={errors.confirmpassword !== '' ? errors.confirmpassword : null}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldGroup
            id="phonenumber"
            type="number"
            label="Phone Number"
            placeholder="Enter phonenumber"
            onChange={this.onChangeText('phonenumber')}
            value={form.phonenumber}
            validationState={errors.phonenumber !== '' ? 'error' : null}
            help={errors.phonenumber !== '' ? errors.phonenumber : null}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldGroup
            id="address"
            type="text"
            label="Address"
            placeholder="Enter address"
            onChange={this.onChangeText('address')}
            value={form.address}
            validationState={errors.address !== '' ? 'error' : null}
            help={errors.address !== '' ? errors.address : null}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldSelect
            id="role"
            label="Role"
            placeholder="Enter role"
            onChange={this.onChangeText('role')}
            value={form.role}
            validationState={errors.role !== '' ? 'error' : null}
            help={errors.city !== '' ? errors.city : null}
            options={this.getRoles()}
          />
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Button value="register" onClick={this.onSubmit} />
        </Col>
      </Row>
    </div>);
  }
}
// function mapStateToProps() {
export default connect()(Register);
