import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { startCase } from 'lodash';
import { FieldGroup, FieldSelect } from '../../components/Form';
import Button from '../../components/Button/Button';
import { fetchStates } from '../../actions/StateAction';
import { fetchOrganisations } from '../../actions/OrganisationActions';
import { createGstRate } from '../../actions/gstRatesActions';

class Program extends React.Component {
  constructor(props) {
    super(props);
    const initialForm = {
      organization: '',
      state: '',
      gstRegisterationNumber: ''
    };
    this.state = {
      form: initialForm,
      errors: initialForm
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchStates());
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
      this.props.dispatch(createGstRate(form, this.resetRegisteration));
      this.props.closeModal();
    }
  };

  getOrganizations = () => {

  }

  getStates = () => this.props.states.map((each) => <option value={each.id}>{each.stateName}</option>)

  getOrganizations = () => this.props.organisations.map((each) => <option value={each.id}>{each.orgName}</option>)

  resetRegisteration = (data) => {
    const initialForm = {
      organization: '',
      state: '',
      gstRegisterationNumber: ''
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
            id="organization"
            label="Organization"
            placeholder="Select organization"
            onChange={this.onChangeText('organization')}
            value={form.organization}
            validationState={errors.organization !== '' ? 'error' : null}
            help={errors.organization !== '' ? errors.organization : null}
            options={this.getOrganizations()}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldSelect
            id="state"
            label="State"
            placeholder="Select state"
            onChange={this.onChangeText('state')}
            value={form.state}
            validationState={errors.state !== '' ? 'error' : null}
            help={errors.state !== '' ? errors.state : null}
            options={this.getStates()}
          />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <FieldGroup
            id="gstRegisterationNumber"
            type="text"
            label="GST Registeration Number"
            placeholder="Enter GST Registeration Number"
            onChange={this.onChangeText('gstRegisterationNumber')}
            value={form.gstRegisterationNumber}
            validationState={errors.gstRegisterationNumber !== '' ? 'error' : null}
            help={errors.gstRegisterationNumber !== '' ? errors.gstRegisterationNumber : null}
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
  return { states: state.states.states, organisations: state.organisations.organisations };
}
export default connect(mapStateToProps)(Program);
