import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { startCase, cloneDeep, findIndex } from 'lodash';
import { FieldSelect } from '../../components/Form';
import Button from '../../components/Button/Button';
// import { TextInput } from '../../components/Input/index';
import { fetchCourse } from '../../actions/courseactions';
import { fetchBranches } from '../../actions/BranchActions';
import { createFeeStructure } from '../../actions/feeStructureActions';

class Batch extends React.Component {
  constructor(props) {
    super(props);
    const initialForm = {
      academicYear: '',
      courseName: '',
      branch: ''
    };
    this.state = {
      textBoxesList: [],
      dataSet: [],
      form: cloneDeep(initialForm),
      errors: cloneDeep(initialForm)
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchCourse());
    this.props.dispatch(fetchBranches());
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
    if (!hasNoErrors) {
      this.setState({ errors });
    }
    console.log(hasNoErrors, errors, 'hasNoErrors');
    if (hasNoErrors) {
      // this.formatDataAndSave(form);
      errors.password = '';
      form.feeStructure = this.state.dataSet;
      this.props.dispatch(createFeeStructure(form, this.resetRegisteration));
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
    return this.props.branches.map((each) => <option value={each[key]}>{each.name}</option>);
  }

  resetRegisteration = (data) => {
    const initialForm = {
      academicYear: '',
      courseName: '',
      branch: ''
    };
    this.setState({ errors: initialForm, form: initialForm });
    alert(data.message);
  }

  checkBoxChange = (feeCode) => {
    const key = '_id';
    const textBoxesList = cloneDeep(this.state.textBoxesList);
    const dataSet = cloneDeep(this.state.dataSet);
    const index = findIndex(this.state.textBoxesList, (each) => each[key] === feeCode[key]);
    console.log(textBoxesList, dataSet, 'dat set');
    if (index === -1) {
      textBoxesList.push(feeCode);
      dataSet.push({ type: feeCode.type, amount: 0 });
    } else {
      textBoxesList.splice(index, 1);
      dataSet.splice(index, 1);
    }
    this.setState({ textBoxesList, dataSet });
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

  updateAmount = (e, index) => {
    const dataSet = cloneDeep(this.state.dataSet);
    dataSet[index].amount = e.target.value;
    this.setState({ dataSet });
  }

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
            id="branch"
            label="Branch"
            placeholder="Select Branch"
            onChange={this.onChangeText('branch')}
            value={form.branch}
            validationState={errors.branch !== '' ? 'error' : null}
            help={errors.branch !== '' ? errors.branch : null}
            options={this.getBatch()}
          />
        </Col>
      </Row>
      <Row>
        {
          this.props.feeCode.map((feeCode) => {
            const key = '_id';
            return (<Col lg={4} md={4} sm={4} xs={4}>
              <input type="checkbox" value={feeCode[key]} onChange={() => this.checkBoxChange(feeCode)} />{feeCode.type}
            </Col>);
          })
        }
      </Row>
      <Row>
        {
          this.state.dataSet.map((feeCode, index) => {
            console.log(feeCode, index, 'feeCode');
            return (<div>
              <Col lg={4} md={4} sm={4} xs={4}><label>Type</label></Col>
              <Col lg={2} md={2} sm={2} xs={2}>
                <input type="text" value={feeCode.type} />
              </Col>
              <Col lg={2} md={2} sm={2} xs={2}><label>Amount</label></Col>
              <Col lg={4} md={4} sm={4} xs={4}>
                <input type="text" value={feeCode.amount} onChange={(e) => this.updateAmount(e, index)} />
              </Col></div>);
          })
        }
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Button value="Submit" onClick={this.onSubmit} />
        </Col>
      </Row>
    </div>);
  }
}
function mapStateToProps(state) {
  return {
    program: state.program.program,
    course: state.course.course,
    branches: state.branch.branches,
    feeCode: state.feeCode.feeCode
  };
}
export default connect(mapStateToProps)(Batch);
