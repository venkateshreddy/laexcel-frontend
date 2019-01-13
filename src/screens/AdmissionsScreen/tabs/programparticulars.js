import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCase, cloneDeep, findIndex, merge } from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { FieldGroup, FieldSelect } from '../../../components/Form';
import { fetchProgram } from '../../../actions/programactions';
import { fetchCourse } from '../../../actions/courseactions';
import { fetchFeeStructure } from '../../../actions/feeStructureActions';
import { createAdmission } from '../../../actions/AdmissionActions';
import { Admission } from '../../../actions/ActionType';
import PreviousNextButtons from '../PreviousNextButtons';
import { DayPickerInput } from '../../../components/DatePicker';

class ProgramPaticulars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textBoxesList: [],
      form: {
        program: '',
        courses: [],
        installmentsDetails: [],
        isResidential: '',
        grossFee: 0,
        installmentDueDate: null,
        concessionAllowed: '',
        commitedFee: '',
        gstAmount: '',
        installmentsCount: '',
        totalFee: ''
      },
      errors: {
        program: '',
        courses: '',
        isResidential: '',
        installmentsDetails: '',
        grossFee: '',
        installmentDueDate: '',
        concessionAllowed: '',
        commitedFee: '',
        gstAmount: '',
        installmentsCount: '',
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
    if (name === 'installmentsCount') {
      const installmentsDetails = [];
      if (value && !isNaN(Number(value))) {
        //eslint-disable-next-line
        for (let i = 0; i < Number(value); i = i + 1) {
          installmentsDetails.push({ amount: 0, dueDate: null });
        }
        form.installmentsDetails = installmentsDetails;
        this.setState({ form });
      }
    }
    this.props.dispatch({ type: Admission.SET_PROGRAM_INFORMATION, data: { name, value } });
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

  onSave = () => {
    const { generalInformation, addressInformation, educationalInformation, otherInformation, programInformation } = this.props.admission;
    const obj = {
      thruCounselling: true,
      admissionNumber: '1234',
      organization: this.props.currentOrganisation.id,
      academicYear: this.props.currentAcademicYear.id,
      branch: '5c02ba7b70a1c3277ac848da',
      branchCode: '',
      firstName: generalInformation.firstName,
      middleName: generalInformation.middleName,
      lastName: generalInformation.lastName,
      dob: generalInformation.dob,
      contactNumber: generalInformation.contactNumber,
      email: generalInformation.email,
      fatherFirstName: generalInformation.fatherFirstName,
      fatherMiddleName: generalInformation.fatherMiddleName,
      fatherLastName: generalInformation.fatherLastName,
      fatherOccupation: generalInformation.fatherOccupation,
      fatherContactNumber: generalInformation.fatherContactNumber,
      motherName: generalInformation.motherName,
      motherOccupation: generalInformation.motherOccupation,
      siblingName: generalInformation.siblingName,
      qualification: generalInformation.qualification,
      institute: generalInformation.institute,
      others: {},
      category: generalInformation.category,
      isHostelResidant: !addressInformation.form.inHostel === 'No',
      hostelName: addressInformation.form.hostel,
      hostelContact: addressInformation.form.contactNumber,
      presentAddress: {
        line1: addressInformation.form.Presentline1,
        line2: addressInformation.form.Presentline2,
        line3: addressInformation.form.Presentline3,
        city: addressInformation.form.Presentcity,
        state: addressInformation.form.Presentstate,
        pincode: addressInformation.form.Presentpincode
      },
      permenantAddress: {
        line1: addressInformation.form.PermanentLine1,
        line2: addressInformation.form.Permanentline2,
        line3: addressInformation.form.Permanentline3,
        city: addressInformation.form.Permanentcity,
        state: addressInformation.form.Permanentstate,
        pincode: addressInformation.form.Permanentpincode
      },
      educationDetails: [
        {
          name: educationalInformation.form.examinationPassed,
          percentage: educationalInformation.form.marksPercent,
          passOutYear: educationalInformation.form.passingYear,
          institutionName: educationalInformation.form.schoolCollege,
          place: educationalInformation.form.place,
          boardOrUniversityName: educationalInformation.form.board
        }
      ]
    };
    const finalData = merge(obj, otherInformation, programInformation);
    this.props.dispatch(createAdmission(finalData)).then(() => {
      alert('successfully created');
    });
    console.log(finalData);
  };

  getPrograms = () => {
    const key = '_id';
    return this.props.program.map((each) => <option value={each[key]}>{each.name}</option>);
  }

  getYesOrNo = () => {
    const options = [{ label: 'Yes', value: true }, { label: 'No', value: false }].map((data) => {
      console.log(data);
      return <option value={data.value}>{data.label}</option>;
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

  checkBoxChange = (course) => {
    const key = '_id';
    const courses = cloneDeep(this.state.form.courses);
    const index = findIndex(this.state.form.courses, (each) => each === course[key]);
    if (index === -1) {
      courses.push(course[key]);
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
      form.courses = courses;
      this.setState({ form });
      this.props.dispatch({ type: Admission.SET_PROGRAM_INFORMATION, data: { name: 'courses', value: courses } });
    } else {
      courses.splice(index, 1);
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
      form.courses = courses;
      this.setState({ form });
      this.props.dispatch({ type: Admission.SET_PROGRAM_INFORMATION, data: { name: 'courses', value: courses } });
    }
  }

  handleDateChange = (date, index) => {
    const form = this.state.form;
    form.installmentsDetails[index].dueDate = date;
    this.props.dispatch({ type: Admission.SET_PROGRAM_INFORMATION, data: { name: 'installmentsDetails', value: form.installmentsDetails } });
    this.setState({ form });
  }
  handleAmountChange = (data, index) => {
    const form = this.state.form;
    form.installmentsDetails[index].amount = data.target.value;
    this.props.dispatch({ type: Admission.SET_PROGRAM_INFORMATION, data: { name: 'installmentsDetails', value: form.installmentsDetails } });
    this.setState({ form });
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

  renderInstallments = (installmentsDetails) => {
    console.log(installmentsDetails, 'installmentsDetails');
    return installmentsDetails.map((data, index) => {
      console.log(index);
      return (<Row>
        <Col lg={6} md={6} sm={12} xs={12}>
          <label>Installment Due Date</label>
          <br />
          <DayPickerInput
            style={{ width: '100%' }}
            value={this.state.form.installmentsDetails[index].dueDate}
            key={data.dueDate}
            onDayChange={(e) => this.handleDateChange(e, index)}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldGroup
            id="amount"
            type="text"
            label="Amount"
            placeholder="Enter amount"
            onChange={(e) => this.handleAmountChange(e, index)}
            defaultValue={this.state.form.installmentsDetails[index].amount}
            validationState={null}
            help={null}
          />
        </Col>
      </Row>);
    });
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
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldSelect
            id="isResidential"
            label="Whether student is Resendential"
            placeholder="Select resendential"
            onChange={this.onChangeText('isResidential')}
            value={form.isResidential}
            validationState={errors.isResidential !== '' ? 'error' : null}
            help={errors.isResidential !== '' ? errors.isResidential : null}
            options={this.getYesOrNo()}
          />
        </Col>
      </Row>
      <Row>
        {
          this.renderCourses(form.program)
        }
      </Row>
      <Row>
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
      </Row>
      <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldGroup
            id="commitedFee"
            type="text"
            label="Committed Fee"
            placeholder="Enter committed fee"
            onChange={this.onChangeText('commitedFee')}
            value={form.commitedFee}
            validationState={errors.commitedFee !== '' ? 'error' : null}
            help={errors.commitedFee !== '' ? errors.commitedFee : null}
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
      </Row>
      <Row>
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
            id="installmentsCount"
            type="text"
            label="Number of Installments"
            placeholder="Enter number of installments"
            onChange={this.onChangeText('installmentsCount')}
            value={form.installmentsCount}
            validationState={errors.installmentsCount !== '' ? 'error' : null}
            help={errors.installmentsCount !== '' ? errors.installmentsCount : null}
          />
        </Col>
      </Row>
      {
        this.renderInstallments(form.installmentsDetails)
      }
      <Row style={{ borderTop: '1px solid gray' }}>
        <PreviousNextButtons
          onPrevious={this.onPrevious}
          onNext={this.onSave}
          nextText="Save"
        />
      </Row>
    </div >);
  }
}
function mapStateToProps(state) {
  return {
    feeStructure: state.feeStructure.feeStructure,
    program: state.program.program,
    course: state.course.course,
    admission: state.admissions.admission,
    currentOrganisation: state.organisations.currentOrganisation,
    currentAcademicYear: state.academicYears.currentAcademicYear
  };
}
export default connect(mapStateToProps)(ProgramPaticulars);
