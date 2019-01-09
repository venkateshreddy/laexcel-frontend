import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { startCase } from 'lodash';
import { Row, Col } from 'react-bootstrap';
import Button from '../../../components/Button/Button';
import { FieldGroup } from '../../../components/Form';
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

  render() {
    const { form, errors } = this.props.educationalInformation;
    return (
      <div>
        <form>
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
        </form>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <Button
              value="<< Previous"
              onClick={() => this.props.onChange(this.props.previousTab)}
            />
            <Button
              value="Save &amp; Next >>"
              onClick={() => this.props.onChange(this.props.nextTab)}
            />
          </Col>
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
