import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { startCase } from 'lodash';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { FieldGroup, FieldSelect } from '../../components/Form';
import Button from '../../components/Button/Button';
// import { TextInput } from '../../components/Input/index';
import { fetchCourse } from '../../actions/courseactions';
import { fetchBatch } from '../../actions/batchactions';
import { createCourseDuration, updateCourseDuration } from '../../actions/courseDurationActions';

class Batch extends React.Component {
  constructor(props) {
    super(props);
    let initialForm = null;
    if (Object.keys(this.props.formData).length === 0) {
      initialForm = {
        academicYear: '',
        courseName: '',
        batch: '',
        courseDuration: '',
        months: '',
        fromDate: '',
        toDate: ''
      };
    } else {
      initialForm = props.formData;
    }

    this.state = {
      form: initialForm,
      errors: {
        academicYear: '',
        courseName: '',
        batch: '',
        courseDuration: '',
        months: '',
        fromDate: '',
        toDate: ''
      }
    };
    this.state.form.courseDuration = 'In Months';
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
      this.validateInput(name, form[name]);
      return null;
    });
    const hasNoErrors = Object.keys(errors).every(name => {
      let flag = true;
      if (form.courseDuration === 'In Months') {
        if (name !== 'fromDate' && name !== 'toDate') {
          flag = errors[name] === '';
        }
      }
      if (form.courseDuration === 'Between Dates') {
        if (name !== 'months') {
          flag = errors[name] === '';
        }
      }
      return flag;
    });
    console.log(hasNoErrors, errors, 'hasNoErrors');
    if (!hasNoErrors) {
      this.setState({ errors });
    }
    console.log(form);
    if (hasNoErrors) {
      // this.formatDataAndSave(form);
      if (Object.keys(this.props.formData).length === 0) {
        this.props.dispatch(createCourseDuration(form, this.resetRegisteration));
      } else {
        const key = '_id';
        this.props.dispatch(updateCourseDuration(this.props.formData[key], form, this.resetRegisteration));
      }
      this.props.closeModal();
    }
  };

  onDayChange = (date, key) => {
    const { form } = this.state;
    form[key] = date;
    this.setState({ form });
  }

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
      const { form } = this.state;
      if (form.courseDuration === 'In Months') {
        if (name !== 'fromDate' && name !== 'toDate') {
          if (value === '') {
            errors[name] = `${startCase(name)} cannot be empty!`;
          } else if (value !== '') {
            // const splCharsAllowed = ['email', 'address'];
            // eslint-disable-next-line
            // const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            // if (!splCharsAllowed.includes(name) && format.test(value)) {
            //   errors[name] = 'Special characters are not allowed!';
            // } else if (name === 'email') {
            //   // eslint-disable-next-line
            //   const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            //   if (!emailFormat.test(value)) {
            //     errors[name] = 'invalid email';
            //   } else {
            //     errors[name] = '';
            //   }
            // } else {
            //   errors[name] = '';
            // }
            errors[name] = '';
          }
        }
      }
      if (form.courseDuration === 'Between Dates') {
        if (name !== 'months') {
          if (value === '') {
            errors[name] = `${startCase(name)} cannot be empty!`;
          } else if (value !== '') {
            // const splCharsAllowed = ['email', 'address'];
            // eslint-disable-next-line
            // const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            // if (!splCharsAllowed.includes(name) && format.test(value)) {
            //   errors[name] = 'Special characters are not allowed!';
            // } else if (name === 'email') {
            //   // eslint-disable-next-line
            //   const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            //   if (!emailFormat.test(value)) {
            //     errors[name] = 'invalid email';
            //   } else {
            //     errors[name] = '';
            //   }
            // } else {
            //   errors[name] = '';
            // }
            errors[name] = '';
          }
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
            value={form.academicYear}
            validationState={errors.academicYear !== '' ? 'error' : null}
            help={errors.academicYear !== '' ? errors.academicYear : null}
            options={this.getAcademicYears()}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldSelect
            id="courseName"
            label="Course Name"
            placeholder="Select Course Name"
            onChange={this.onChangeText('courseName')}
            value={form.courseName}
            validationState={errors.courseName !== '' ? 'error' : null}
            help={errors.courseName !== '' ? errors.courseName : null}
            options={this.getCourses()}
          />
        </Col>
      </Row>
      <Row>
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
          {/* <TextInput
            id="months"
            type="radio"
            label="Months"
            onChange={this.onChangeText('months')}
            value={form.address}
            validationState={errors.address !== '' ? 'error' : null}
            help={errors.address !== '' ? errors.address : null}
          /> */}
        </Col>
      </Row>
      <Row>
        <Col lg={4} md={4} sm={4} xs={4}>
          Course Duration
        </Col>
        <Col lg={4} md={4} sm={4} xs={4}>
          <input type="radio" name="courseDuration" value="In Months" onChange={this.onChangeText('courseDuration')} checked={this.state.form.courseDuration === 'In Months'} />In months
        </Col>
        <Col lg={4} md={4} sm={4} xs={4}>
          <input type="radio" name="courseDuration" value="Between Dates" onChange={this.onChangeText('courseDuration')} checked={this.state.form.courseDuration === 'Between Dates'} />Between Dates
        </Col>
      </Row>
      {
        this.state.form.courseDuration === 'Between Dates' ?
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div>
                <label>From</label>
                <br />
                <DayPickerInput
                  style={{ width: '100%' }}
                  value={form.fromDate}
                  onDayChange={(date) => this.onDayChange(date, 'fromDate')}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div>
                <label>To</label>
                <br />
                <DayPickerInput
                  style={{ width: '100%' }}
                  value={form.toDate}
                  onDayChange={(date) => this.onDayChange(date, 'toDate')}
                />
              </div>
            </Col>
          </Row>
          :
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
              <FieldGroup
                id="months"
                type="text"
                label="Months"
                placeholder="Enter months"
                onChange={this.onChangeText('months')}
                value={form.months}
                validationState={errors.months !== '' ? 'error' : null}
                help={errors.months !== '' ? errors.months : null}
              />
            </Col>
          </Row>
      }
      <Row>
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
