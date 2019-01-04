import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { startCase } from 'lodash';
import { FieldGroup } from '../../components/Form';
import Button from '../../components/Button/Button';
import { fetchOrganisations } from '../../actions/OrganisationActions';
import { createMasterGstRates, updateMasterGstRates } from '../../actions/mastergstrateactions';


class Program extends React.Component {
  constructor(props) {
    super(props);
    let initialForm;
    if (Object.keys(props.formData).length === 0) {
      initialForm = {
        rateOfGst: '',
        cgst: '',
        sgst: '',
        igst: ''
      };
    } else {
      initialForm = props.formData;
    }
    this.state = {
      form: initialForm,
      errors: {
        rateOfGst: '',
        cgst: '',
        sgst: '',
        igst: ''
      }
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchOrganisations());
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

  onChangeBlurText = name => ({ target: { value } }) => {
    const form = { ...this.state.form };
    const errors = { ...this.state.errors };
    const array = ['rateOfGst', 'cgst', 'sgst', 'igst'];
    if (array.includes(name)) {
      form[name] = Number(value).toFixed(2);
    } else {
      form[name] = value;
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
      const key = '_id';
      if (Object.keys(this.props.formData).length === 0) {
        this.props.dispatch(createMasterGstRates(form, this.resetRegisteration));
      } else {
        this.props.dispatch(updateMasterGstRates(this.props.formData[key], form, this.resetRegisteration));
      }
      this.props.closeModal();
    }
  };

  resetRegisteration = (data) => {
    const initialForm = {
      type: '',
      code: ''
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
        const splCharsAllowed = ['cgst', 'igst', 'sgst'];
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
            id="rateOfGst"
            type="text"
            label="Rate of GST"
            placeholder="Enter Rate of GST"
            onChange={this.onChangeText('rateOfGst')}
            onBlur={this.onChangeBlurText('rateOfGst')}
            value={form.rateOfGst}
            validationState={errors.rateOfGst !== '' ? 'error' : null}
            help={errors.rateOfGst !== '' ? errors.rateOfGst : null}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldGroup
            id="cgst"
            type="text"
            label="CGST"
            placeholder="Enter CGST"
            onChange={this.onChangeText('cgst')}
            onBlur={this.onChangeBlurText('cgst')}
            value={form.cgst}
            validationState={errors.cgst !== '' ? 'error' : null}
            help={errors.cgst !== '' ? errors.cgst : null}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldGroup
            id="sgst"
            type="text"
            label="SGST"
            placeholder="Enter SGST"
            onChange={this.onChangeText('sgst')}
            onBlur={this.onChangeBlurText('sgst')}
            value={form.sgst}
            validationState={errors.sgst !== '' ? 'error' : null}
            help={errors.sgst !== '' ? errors.sgst : null}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldGroup
            id="igst"
            type="text"
            label="IGST"
            placeholder="Enter IGST"
            onChange={this.onChangeText('igst')}
            onBlur={this.onChangeBlurText('igst')}
            value={form.igst}
            validationState={errors.igst !== '' ? 'error' : null}
            help={errors.igst !== '' ? errors.igst : null}
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
  return { organisations: state.organisations.organisations };
}
export default connect(mapStateToProps)(Program);
