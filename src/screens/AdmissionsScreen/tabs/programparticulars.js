import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCase, cloneDeep, findIndex } from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { FieldGroup, FieldSelect } from '../../../components/Form';
import { fetchProgram } from '../../../actions/programactions';
import { fetchCourse } from '../../../actions/courseactions';
import { fetchFeeStructure } from '../../../actions/feeStructureActions';
import { DayPickerInput } from '../../../components/DatePicker';

class ProgramPaticulars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textBoxesList: [],
      form: {
        program: '',
        grossFee: 0,
        installmentDueDate: null,
        concessionAllowed: '',
        committedFee: '',
        gstAmount: '',
        numberOfInstallments: '',
        totalFee: ''
      },
      errors: {
        program: '',
        grossFee: '',
        installmentDueDate: '',
        concessionAllowed: '',
        committedFee: '',
        gstAmount: '',
        numberOfInstallments: '',
        totalFee: ''
      }
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchProgram());
    this.props.dispatch(fetchCourse());
    this.props.dispatch(fetchFeeStructure());
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

  getPrograms = () => {
    const key = '_id';
    return this.props.program.map((each) => <option value={each[key]}>{each.name}</option>);
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

  checkBoxChange = (course) => {
    const key = '_id';
    const textBoxesList = cloneDeep(this.state.textBoxesList);
    const index = findIndex(this.state.textBoxesList, (each) => each === course[key]);
    if (index === -1) {
      textBoxesList.push(course[key]);
      let amount = cloneDeep(this.state.form.grossFee);
      let currentAmount = 0;
      this.props.feeStructure.map((feeData) => {
        if (feeData.courseName.toString() === course[key].toString()) {
          feeData.feeStructure.map((feeStructure) => {
            // eslint-disable-next-line
            currentAmount = currentAmount + Number(feeStructure.amount);
            return null;
          });
        }
        return null;
      });
      // eslint-disable-next-line
      amount = amount + currentAmount;
      const form = cloneDeep(this.state.form);
      form.grossFee = amount;
      this.setState({ form });
    } else {
      textBoxesList.splice(index, 1);
      let amount = cloneDeep(this.state.form.grossFee);
      let currentAmount = 0;
      this.props.feeStructure.map((feeData) => {
        if (feeData.courseName.toString() === course[key].toString()) {
          feeData.feeStructure.map((feeStructure) => {
            // eslint-disable-next-line
            currentAmount = currentAmount + Number(feeStructure.amount);
            return null;
          });
        }
        return null;
      });
      // eslint-disable-next-line
      amount = amount - currentAmount;
      const form = cloneDeep(this.state.form);
      form.grossFee = amount;
      this.setState({ form });
    }
    console.log(textBoxesList);
    this.setState({ textBoxesList });
  }

  handleDateChange = (date) => {
    console.log(date);
  }
  renderCourses = (program) => {
    const radioBox = [];
    if (program) {
      this.props.course.map((course) => {
        const key = '_id';
        if (course.program === program) {
          radioBox.push(<Col lg={4} md={4} sm={4} xs={4}>
            <input type="checkbox" value={course[key]} onChange={() => this.checkBoxChange(course)} />{course.name}
          </Col>);
        }
        return null;
      });
    }
    return radioBox;
  }

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
      </Row>
      <Row>
        {
          this.renderCourses(form.program)
        }
      </Row>
      <Col lg={6} md={6} sm={12} xs={12}>
        <FieldGroup
          id="grossFee"
          type="text"
          label="Gross Fee"
          placeholder="Enter gross fee"
          onChange={this.onChangeText('grossFee')}
          value={form.grossFee}
          validationState={errors.grossFee !== '' ? 'error' : null}
          help={errors.grossFee !== '' ? errors.grossFee : null}
        />
      </Col>
      <Col lg={6} md={6} sm={12} xs={12}>
        <FieldGroup
          id="concessionAllowed"
          type="text"
          label="Concession Allowed"
          placeholder="Enter concession allowed"
          onChange={this.onChangeText('concessionAllowed')}
          value={form.concessionAllowed}
          validationState={errors.concessionAllowed !== '' ? 'error' : null}
          help={errors.concessionAllowed !== '' ? errors.concessionAllowed : null}
        />
      </Col>
      <Col lg={6} md={6} sm={12} xs={12}>
        <FieldGroup
          id="committedFee"
          type="text"
          label="Committed Fee"
          placeholder="Enter committed fee"
          onChange={this.onChangeText('committedFee')}
          value={form.committedFee}
          validationState={errors.committedFee !== '' ? 'error' : null}
          help={errors.committedFee !== '' ? errors.committedFee : null}
        />
      </Col>
      <Col lg={6} md={6} sm={12} xs={12}>
        <FieldGroup
          id="gstAmount"
          type="text"
          label="GST Amount"
          placeholder="Enter gst amount"
          onChange={this.onChangeText('gstAmount')}
          value={form.gstAmount}
          validationState={errors.gstAmount !== '' ? 'error' : null}
          help={errors.gstAmount !== '' ? errors.gstAmount : null}
        />
      </Col>
      <Col lg={6} md={6} sm={12} xs={12}>
        <FieldGroup
          id="totalFee"
          type="text"
          label="Total Fee"
          placeholder="Enter total fee"
          onChange={this.onChangeText('totalFee')}
          value={form.totalFee}
          validationState={errors.totalFee !== '' ? 'error' : null}
          help={errors.totalFee !== '' ? errors.totalFee : null}
        />
      </Col>
      <Col lg={6} md={6} sm={12} xs={12}>
        <FieldGroup
          id="numberOfInstallments"
          type="text"
          label="Total Fee"
          placeholder="Enter number of installments"
          onChange={this.onChangeText('numberOfInstallments')}
          value={form.numberOfInstallments}
          validationState={errors.numberOfInstallments !== '' ? 'error' : null}
          help={errors.numberOfInstallments !== '' ? errors.numberOfInstallments : null}
        />
      </Col>
      <Col lg={6} md={6} sm={12} xs={12}>
        <label>Installment Due Date</label>
        <br />
        <DayPickerInput
          style={{ width: '100%' }}
          value={form.installmentDueDate}
          key={form.installmentDueDate}
          onDayChange={this.handleDateChange}
        />
      </Col>
    </div>);
  }
}
function mapStateToProps(state) {
  return {
    feeStructure: state.feeStructure.feeStructure,
    program: state.program.program,
    course: state.course.course
  };
}
export default connect(mapStateToProps)(ProgramPaticulars);
