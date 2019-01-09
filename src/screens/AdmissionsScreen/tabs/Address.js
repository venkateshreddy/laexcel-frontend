import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import { Row, Col } from 'react-bootstrap';
// import Button from '../../../components/Button/Button';
import FieldRadio from '../../../components/Form/FieldRadio';
import PreviousNextButtons from '../PreviousNextButtons';
import { FieldGroup, FieldSelect } from '../../../components/Form';
import {
  changeAddressInformation,
  changeAddressInformationErrors
} from '../../../actions/AdmissionActions';

const objectId = '_id';
// const ADD = 'add';
// const EDIT = 'edit';

// const initialForm = {
//   inHostel: '',
//   hostel: '',
//   contactNumber: '',
//   Presentline1: '',
//   Presentline2: '',
//   Presentline3: '',
//   Presentstate: '',
//   Presentcity: '',
//   Presentpincode: '',

//   PermanentLine1: '',
//   Permanentline2: '',
//   Permanentline3: '',
//   Permanentstate: '',
//   Permanentcity: '',
//   Permanentpincode: ''
// };

class Address extends Component {
  // state = {
  //   form: initialForm,
  //   errors: initialForm
  // };

  onRadioSelect = key => ({ target: { name, checked } }) => {
    const form = { ...this.props.addressInformation.form };
    const errors = { ...this.props.addressInformation.errors };
    form[key] = checked ? name : '';
    errors[key] = '';
    this.props.dispatch(changeAddressInformation(form, errors));
    // this.setState({ form, errors });
  };

  onChangeText = name => ({ target: { value } }) => {
    const form = { ...this.props.addressInformation.form };
    const errors = { ...this.props.addressInformation.errors };
    form[name] = value;
    this.validateInput(name, value).then(
      newErrors =>
        this.props.dispatch(changeAddressInformationErrors(newErrors))
      // this.setState({ errors: newErrors })
    );
    this.props.dispatch(changeAddressInformation(form, errors));
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

  getStates = states =>
    states.map(stateObj => (
      <option key={stateObj.id} value={stateObj.id}>
        {stateObj.stateName}
      </option>
    ));
  getCitiesForPresentAddress = cities => {
    const { form } = this.props.addressInformation;
    if (form.state !== '') {
      return cities.map(city => {
        if (city.state[objectId] === form.Presentstate) {
          return (
            <option key={city.id} value={city.id}>
              {city.cityName}
            </option>
          );
        }
        return null;
      });
    }
    return (
      <option key="0" value="">
        --Please Select State First--
      </option>
    );
  };
  getCitiesForPermanentAddress = cities => {
    const { form } = this.props.addressInformation;
    if (form.state !== '') {
      return cities.map(city => {
        if (city.state[objectId] === form.Permanentstate) {
          return (
            <option key={city.id} value={city.id}>
              {city.cityName}
            </option>
          );
        }
        return null;
      });
    }
    return (
      <option key="0" value="">
        --Please Select State First--
      </option>
    );
  };

  validateInput = (name, value) =>
    new Promise(resolve => {
      const errors = this.props.addressInformation;
      if (value === '') {
        errors[name] = `${startCase(name)} cannot be empty!`;
      } else if (value !== '') {
        const splCharsAllowed = [
          'Presentline1',
          'Presentline2',
          'Presentline3',
          'Presentstate',
          'Presentcity',
          'Presentpincode',

          'PermanentLine1',
          'Permanentline2',
          'Permanentline3',
          'Permanentstate',
          'Permanentcity',
          'Permanentpincode'
        ];
        // eslint-disable-next-line
        const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (!splCharsAllowed.includes(name) && format.test(value)) {
          errors[name] = 'Special characters are not allowed!';
        } else if (name === 'Presentpincode' && value.length !== 6) {
          errors[name] = 'Pincode must be 6 digits long!';
        } else if (name === 'Permanentpincode' && value.length !== 6) {
          errors[name] = 'Pincode must be 6 digits long!';
        } else {
          errors[name] = '';
        }
      }
      resolve(errors);
    });

  render() {
    console.log('in address', this.props);
    const { form, errors } = this.props.addressInformation;
    const { states, cities } = this.props;
    return (
      <div>
        <form>
          <label>whether Student there in Hostel ?</label>
          <FieldRadio
            id="inHostel"
            checked={form.inHostel}
            values={['Yes', 'No']}
            onChange={this.onRadioSelect('inHostel')}
            validationState={errors.inHostel !== '' ? 'error' : null}
            help={errors.inHostel !== '' ? errors.inHostel : null}
          />
          {form.inHostel === 'Yes' ? (
            <FieldGroup
              id="hostel"
              type="text"
              label="Hostel Name"
              placeholder="Enter Hostel name"
              onChange={this.onChangeText('hostel')}
              value={form.hostel}
              validationState={errors.hostel !== '' ? 'error' : null}
              help={errors.hostel !== '' ? errors.hostel : null}
            />
          ) : (
              ''
            )}
          <FieldGroup
            id="contactNumber"
            type="text"
            label="Contact Number"
            placeholder="Enter Contact Number"
            onChange={this.onChangeText('contactNumber')}
            value={form.contactNumber}
            validationState={errors.contactNumber !== '' ? 'error' : null}
            help={errors.contactNumber !== '' ? errors.contactNumber : null}
          />
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Col lg={6} md={6} sm={6} xs={6}>
                <label>Present Address</label>
                <FieldGroup
                  id="Presentline1"
                  type="text"
                  label="Line 1"
                  placeholder="Enter address"
                  onChange={this.onChangeText('Presentline1')}
                  value={form.Presentline1}
                  validationState={errors.Presentline1 !== '' ? 'error' : null}
                  help={errors.Presentline1 !== '' ? errors.Presentline1 : null}
                />
                <FieldGroup
                  id="Presentline2"
                  type="text"
                  label="Line 2"
                  placeholder="Enter address"
                  onChange={this.onChangeText('Presentline2')}
                  value={form.Presentline2}
                  validationState={errors.Presentline2 !== '' ? 'error' : null}
                  help={errors.Presentline2 !== '' ? errors.Presentline2 : null}
                />
                <FieldGroup
                  id="Presentline3"
                  type="text"
                  label="Line 3"
                  placeholder="Enter address"
                  onChange={this.onChangeText('Presentline3')}
                  value={form.Presentline3}
                  validationState={errors.Presentline3 !== '' ? 'error' : null}
                  help={errors.Presentline3 !== '' ? errors.Presentline3 : null}
                />
                <FieldSelect
                  id="Presentstate"
                  type="text"
                  label="State"
                  placeholder="Select State"
                  onChange={this.onChangeText('Presentstate')}
                  value={form.Presentstate}
                  validationState={errors.Presentstate !== '' ? 'error' : null}
                  help={errors.Presentstate !== '' ? errors.Presentstate : null}
                  options={this.getStates(states)}
                />
                <FieldSelect
                  id="Presentcity"
                  type="text"
                  label="City"
                  placeholder="Select City"
                  onChange={this.onChangeText('Presentcity')}
                  value={form.Presentcity}
                  validationState={errors.Presentcity !== '' ? 'error' : null}
                  help={errors.Presentcity !== '' ? errors.Presentcity : null}
                  options={this.getCitiesForPresentAddress(cities)}
                />
                <FieldGroup
                  id="Presentpincode"
                  type="number"
                  label="Pincode"
                  placeholder="Enter pincode"
                  onChange={this.onChangeText('Presentpincode')}
                  value={form.Presentpincode}
                  validationState={
                    errors.Presentpincode !== '' ? 'error' : null
                  }
                  help={
                    errors.Presentpincode !== '' ? errors.Presentpincode : null
                  }
                />
              </Col>
              <Col lg={6} md={6} sm={6} xs={6}>
                <label>Permanent Address</label>
                <FieldGroup
                  id="PermanentLine1"
                  type="text"
                  label="Line 1"
                  placeholder="Enter address"
                  onChange={this.onChangeText('PermanentLine1')}
                  value={form.PermanentLine1}
                  validationState={
                    errors.PermanentLine1 !== '' ? 'error' : null
                  }
                  help={
                    errors.PermanentLine1 !== '' ? errors.PermanentLine1 : null
                  }
                />
                <FieldGroup
                  id="Permanentline2"
                  type="text"
                  label="Line 2"
                  placeholder="Enter address"
                  onChange={this.onChangeText('Permanentline2')}
                  value={form.Permanentline2}
                  validationState={
                    errors.Permanentline2 !== '' ? 'error' : null
                  }
                  help={
                    errors.Permanentline2 !== '' ? errors.Permanentline2 : null
                  }
                />
                <FieldGroup
                  id="Permanentline3"
                  type="text"
                  label="Line 3"
                  placeholder="Enter address"
                  onChange={this.onChangeText('Permanentline3')}
                  value={form.Permanentline3}
                  validationState={
                    errors.Permanentline3 !== '' ? 'error' : null
                  }
                  help={
                    errors.Permanentline3 !== '' ? errors.Permanentline3 : null
                  }
                />
                <FieldSelect
                  id="Permanentstate"
                  type="text"
                  label="State"
                  placeholder="Select State"
                  onChange={this.onChangeText('Permanentstate')}
                  value={form.Permanentstate}
                  validationState={
                    errors.Permanentstate !== '' ? 'error' : null
                  }
                  help={
                    errors.Permanentstate !== '' ? errors.Permanentstate : null
                  }
                  options={this.getStates(states)}
                />
                <FieldSelect
                  id="Permanentcity"
                  type="text"
                  label="City"
                  placeholder="Select City"
                  onChange={this.onChangeText('Permanentcity')}
                  value={form.Permanentcity}
                  validationState={errors.Permanentcity !== '' ? 'error' : null}
                  help={
                    errors.Permanentcity !== '' ? errors.Permanentcity : null
                  }
                  options={this.getCitiesForPermanentAddress(cities)}
                />
                <FieldGroup
                  id="Permanentpincode"
                  type="number"
                  label="Pincode"
                  placeholder="Enter pincode"
                  onChange={this.onChangeText('Permanentpincode')}
                  value={form.Permanentpincode}
                  validationState={
                    errors.Permanentpincode !== '' ? 'error' : null
                  }
                  help={
                    errors.Permanentpincode !== ''
                      ? errors.Permanentpincode
                      : null
                  }
                />
              </Col>
            </Col>
          </Row>
        </form>
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
  addressInformation: state.admissions.admission.addressInformation
});

export default connect(mapStateToProps)(Address);
