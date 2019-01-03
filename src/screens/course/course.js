import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { startCase } from 'lodash';
import { FieldGroup, FieldSelect } from '../../components/Form';
import Button from '../../components/Button/Button';
import { fetchProgram } from '../../actions/programactions';
import { createCourse, updateCourse } from '../../actions/courseactions';


class Program extends React.Component {
  constructor(props) {
    super(props);
    let initialForm = {};
    if (Object.keys(props.formData).length !== 0) {
      initialForm = props.formData;
    } else {
      initialForm = {
        name: '',
        code: '',
        program: ''
      };
    }

    this.state = {
      form: initialForm,
      errors: {
        name: '',
        code: '',
        program: ''
      }
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchProgram());
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
    const key = '_id';
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
      if (Object.keys(this.props.formData).length === 0) {
        this.props.dispatch(createCourse(form, this.resetRegisteration));
      } else {
        this.props.dispatch(updateCourse(this.props.formData[key], form, this.resetRegisteration));
      }
      this.props.closeModal();
    }
  };

  getPrograms = () => {
    const key = '_id';
    return this.props.program.map((each) => <option value={each[key]}>{each.name}</option>);
  }
  resetRegisteration = (data) => {
    const initialForm = {
      name: '',
      code: '',
      program: ''
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
          <FieldSelect
            id="program"
            label="Program"
            placeholder="Select program"
            onChange={this.onChangeText('program')}
            value={form.program}
            validationState={errors.program !== '' ? 'error' : null}
            help={errors.program !== '' ? errors.program : null}
            options={this.getPrograms()}
          />
        </Col>
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
        <Col lg={12} md={12} sm={12} xs={12}>
          <Button value="Submit" onClick={this.onSubmit} />
        </Col>
      </Row>
    </div>);
  }
}
function mapStateToProps(state) {
  return { program: state.program.program };
}
export default connect(mapStateToProps)(Program);
