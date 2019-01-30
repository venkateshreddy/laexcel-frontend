import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { startCase } from 'lodash';
import { FieldGroup, FieldSelect } from '../../components/Form';
import Button from '../../components/Button/Button';
import { createProgram, updateProgram } from '../../actions/programactions';
import { fetchMasterGstRates } from '../../actions/mastergstrateactions';

class Program extends React.Component {
  constructor(props) {
    super(props);
    let initialForm;
    if (Object.keys(props.formData).length === 0) {
      initialForm = {
        name: '',
        code: '',
        gstApplicable: '',
        rateOfGst: ''
      };
    } else {
      initialForm = props.formData;
    }
    this.state = {
      form: initialForm,
      errors: {
        name: '',
        code: '',
        gstApplicable: '',
        rateOfGst: ''
      }
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchMasterGstRates());
  }

  onChangeText = name => ({ target: { value } }) => {
    const form = { ...this.state.form };
    const errors = { ...this.state.errors };
    form[name] = value;
    console.log(name, 'on change');
    if (name === 'gstApplicable') {
      if (value === 'No' || value === '' || value === 'select') {
        errors.rateOfGst = '';
      }
    }
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
        if (name === 'rateOfGst') {
          if (form.gstApplicable === 'Yes') {
            errors[name] = `${startCase(name)} cannot be empty!`;
          } else {
            errors[name] = '';
          }
        } else {
          errors[name] = `${startCase(name)} cannot be empty!`;
        }
      }
      return name;
    });
    const hasNoErrors = Object.keys(errors).every(name => errors[name] === '');
    this.setState({ errors });
    console.log(form, errors, hasNoErrors);
    if (hasNoErrors) {
      const key = '_id';
      if (form.rateOfGst === '') {
        form.rateOfGst = null;
      }
      if (Object.keys(this.props.formData).length === 0) {
        this.props.dispatch(createProgram(form, this.resetRegisteration));
      } else {
        this.props.dispatch(updateProgram(this.props.formData[key], form, this.resetRegisteration));
      }
    }
  };

  getGstApplicable() {
    return ['Yes', 'No'].map((each) => <option value={each}>{each}</option>);
  }
  getRateOfGst() {
    const key = '_id';
    return this.props.masterGstRates.map((each) => <option value={each[key]}>{each.rateOfGst}</option>);
  }
  resetRegisteration = () => {
    const initialForm = {
      name: '',
      code: '',
      gstApplicable: '',
      rateOfGst: ''
    };
    this.setState({ errors: initialForm, form: initialForm });
    if (Object.keys(this.props.formData).length === 0) {
      alert('Program created successfully');
    } else {
      alert('Program updated successfully');
    }
    this.props.closeModal();
  }
  validateInput = (name, value) =>
    new Promise(resolve => {
      const errors = { ...this.state.errors };
      const form = { ...this.state.form };
      if (value === '') {
        if (name === 'rateOfGst') {
          if (form.gstApplicable === 'Yes') {
            errors[name] = `${startCase(name)} cannot be empty!`;
          } else {
            errors[name] = '';
          }
        } else if (name === 'gstApplicable') {
          if (value === 'No' || value === '' || value === 'select') {
            errors.rateOfGst = '';
          }
        } else {
          errors[name] = `${startCase(name)} cannot be empty!`;
        }
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
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldSelect
            id="role"
            label="Gst Applicable"
            placeholder="Select gst applicable"
            onChange={this.onChangeText('gstApplicable')}
            value={form.gstApplicable}
            validationState={errors.gstApplicable !== '' ? 'error' : null}
            help={errors.gstApplicable !== '' ? errors.gstApplicable : null}
            options={this.getGstApplicable()}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldSelect
            id="rateOfGst"
            label="Rate of Gst"
            placeholder="Select rate of gst"
            onChange={this.onChangeText('rateOfGst')}
            value={form.rateOfGst}
            validationState={errors.rateOfGst !== '' ? 'error' : null}
            help={errors.rateOfGst !== '' ? errors.rateOfGst : null}
            options={this.getRateOfGst()}
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
  return {
    masterGstRates: state.masterGstRates.masterGstRates
  };
}
export default connect(mapStateToProps)(Program);
