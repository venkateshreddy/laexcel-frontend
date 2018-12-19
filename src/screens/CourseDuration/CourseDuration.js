import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { startCase } from 'lodash';
import { FieldGroup, FieldSelect } from '../../components/Form';
import Button from '../../components/Button/Button';
import { TextInput } from '../../components/Input/index';
import { fetchCourse } from '../../actions/courseactions';
import { createBatch, fetchBatch } from '../../actions/batchactions';

class Batch extends React.Component {
  constructor(props) {
    super(props);
    const initialForm = {
      academicYear: '',
      courseName: '',
      batch: '',
      courseDuration: '',
      months: '',
      fromDate: '',
      toDate: ''
    };
    this.state = {
      form: initialForm,
      errors: initialForm
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchCourse());
    this.props.dispatch(fetchBatch());
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
        this.props.dispatch(createBatch(form, this.resetRegisteration));
        this.props.closeModal();
      } else {
        errors.password = 'password didn\'t match';
        this.setState({ errors });
      }
    }
  };

  getAcademicYears = () => {
    const date = new Date();
    const year = date.getFullYear();
    const array = [];
    for (let i = -10; i < 10; i += 1) {
      array.push(year + i);
    }
    return array.map((each) => <option value={each}>{each}</option>);
  }

  getCourses = () => {
    const key = '_id';
    return this.props.course.map((each) => <option value={each[key]}>{each.name}</option>);
  }

  getBatch = () => {
    const key = '_id';
    return this.props.batch.map((each) => <option value={each[key]}>{each.name}</option>);
  }

  resetRegisteration = (data) => {
    const initialForm = {
      academicYear: '',
      courseName: '',
      batch: '',
      courseDuration: '',
      months: '',
      fromDate: '',
      toDate: ''
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
            id="academicYear"
            label="Academic Year"
            placeholder="Select Academic Year"
            onChange={this.onChangeText('academicYear')}
            value={form.program}
            validationState={errors.program !== '' ? 'error' : null}
            help={errors.program !== '' ? errors.program : null}
            options={this.getAcademicYears()}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldSelect
            id="courseName"
            label="Course Name"
            placeholder="Select Course Name"
            onChange={this.onChangeText('courseName')}
            value={form.program}
            validationState={errors.program !== '' ? 'error' : null}
            help={errors.program !== '' ? errors.program : null}
            options={this.getCourses()}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldSelect
            id="batch "
            label="Batch"
            placeholder="Select Batch"
            onChange={this.onChangeText('batch')}
            value={form.batch}
            validationState={errors.batch !== '' ? 'error' : null}
            help={errors.batch !== '' ? errors.batch : null}
            options={this.getBatch()}
          />
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          <TextInput
            id="months"
            type="radio"
            label="Months"
            onChange={this.onChangeText('months')}
            value={form.address}
            validationState={errors.address !== '' ? 'error' : null}
            help={errors.address !== '' ? errors.address : null}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldGroup
            id="months"
            type="text"
            label="Months"
            placeholder="Enter months"
            onChange={this.onChangeText('months')}
            value={form.address}
            validationState={errors.address !== '' ? 'error' : null}
            help={errors.address !== '' ? errors.address : null}
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
  return { program: state.program.program, course: state.course.course, batch: state.batch.batch };
}
export default connect(mapStateToProps)(Batch);
