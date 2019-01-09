import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { startCase } from 'lodash';
import { Row, Col } from 'react-bootstrap';
// import Button from '../../../components/Button/Button';
import { FieldGroup } from '../../../components/Form';
import PreviousNextButtons from '../PreviousNextButtons';
import { changeEducationalInformation } from '../../../actions/AdmissionActions';

class EducationalInformation extends Component {
  onChangeText = name => ({ target: { value } }) => {
    const form = { ...this.props.educationalInformation.form };
    const errors = { ...this.props.educationalInformation.errors };
    form[name] = value;
    // this.validateInput(name, value).then(
    //   newErrors =>
    //     this.props.dispatch(changeEducationalInformationErrors(newErrors))
    //   // this.setState({ errors: newErrors })
    // );
    this.props.dispatch(changeEducationalInformation(form, errors));
    // this.setState({ form, errors });
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
  render() {
    const { form, errors } = this.props.educationalInformation;
    return (
      <div>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <FieldGroup
              id="examinationPassed"
              type="text"
              label="Examination Passed"
              placeholder="Examination Passed"
              onChange={this.onChangeText('examinationPassed')}
              value={form.examinationPassed}
              validationState={errors.examinationPassed !== '' ? 'error' : null}
              help={
                errors.examinationPassed !== '' ? errors.examinationPassed : null
              }
            />
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <FieldGroup
              id="marksPercent"
              type="text"
              label="% Of Marks"
              placeholder="Percent Of Marks"
              onChange={this.onChangeText('marksPercent')}
              value={form.marksPercent}
              validationState={errors.marksPercent !== '' ? 'error' : null}
              help={errors.marksPercent !== '' ? errors.marksPercent : null}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <FieldGroup
              id="passingYear"
              type="text"
              label="Year Of Passing"
              placeholder="Passing Year"
              onChange={this.onChangeText('passingYear')}
              value={form.passingYear}
              validationState={errors.passingYear !== '' ? 'error' : null}
              help={errors.passingYear !== '' ? errors.passingYear : null}
            />
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <FieldGroup
              id="schoolCollege"
              type="text"
              label="Name Of School/College"
              placeholder="School / College"
              onChange={this.onChangeText('schoolCollege')}
              value={form.schoolCollege}
              validationState={errors.schoolCollege !== '' ? 'error' : null}
              help={errors.schoolCollege !== '' ? errors.schoolCollege : null}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <FieldGroup
              id="place"
              type="text"
              label="Place"
              placeholder="Place"
              onChange={this.onChangeText('place')}
              value={form.place}
              validationState={errors.place !== '' ? 'error' : null}
              help={errors.place !== '' ? errors.place : null}
            />
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <FieldGroup
              id="board"
              type="text"
              label="Name Of Board / University"
              placeholder="Board / University"
              onChange={this.onChangeText('board')}
              value={form.board}
              validationState={errors.board !== '' ? 'error' : null}
              help={errors.board !== '' ? errors.board : null}
            />
          </Col>
        </Row>
        <Row style={{ borderTop: '1px solid gray' }}>
          <PreviousNextButtons
            onPrevious={this.onPrevious}
            onNext={this.onNext}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser,
  states: state.states.states,
  cities: state.cities.cities,
  educationalInformation: state.admissions.admission.educationalInformation
});

export default connect(mapStateToProps)(EducationalInformation);
