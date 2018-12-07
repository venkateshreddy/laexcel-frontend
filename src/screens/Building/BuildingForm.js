import React, { Component } from 'react';
import { startCase, cloneDeep } from 'lodash';
import { connect } from 'react-redux';

import { FormGroup, ControlLabel, Radio } from 'react-bootstrap';
import { FieldGroup, FieldSelect } from '../../components/Form';
import { LargeModal } from '../../components/Modals';
import { handleSnackBar } from '../../actions/DashboardAction';
// import { createOrg } from '../../actions/OrganisationActions';

const initialForm = {
  name: '',
  code: '',
  campus: '',
  // line1: '',
  // line2: '',
  // line3: '',
  // city: '',
  // pincode: '',
  rented: '',
  totalArea: '',
  floorArea: '',
  carpetArea: '',
  floorsQty: '',
  floors: []
};

// const objectId = '_id';
const ADD = 'add';
// const EDIT = 'edit';

class BuildingForm extends Component {
  state = {
    type: '',
    form: initialForm,
    errors: initialForm,
    showModal: false
  };

  onSubmit = () => {
    console.log('state on submit', this.state);
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
    } else {
      this.formatDataAndSave(form);
    }
  };

  onChangeText = name => ({ target: { value } }) => {
    console.log(name, value);
    const form = { ...this.state.form };
    const errors = { ...this.state.errors };
    form[name] = value;
    this.validateInput(name, value).then(newErrors =>
      this.setState({ errors: newErrors })
    );
    this.setState({ form, errors });
    if (name === 'floorsQty') {
      const floorsStr = 'floors';
      const tempArr = [];
      if (Number(value) > 0) {
        for (let i = 0; i < Number(value); i += 1) {
          const tempObj = { rowId: i, floorNo: '', floorArea: '' };
          tempArr.push(tempObj);
        }
        form[floorsStr] = tempArr;
        this.setState({ form });
      } else {
        form[floorsStr] = tempArr;
        this.setState({ form });
      }
    }
  };

  getLegalStatuses = () => {
    const LegalStatusesArray = [
      { id: 0, name: 'Company' },
      { id: 1, name: 'Partnership' },
      { id: 2, name: 'Proprietory Concern' }
    ];
    return LegalStatusesArray.map(legalStatus => (
      <option key={legalStatus.id} value={legalStatus.name}>
        {legalStatus.name}
      </option>
    ));
  };

  getCampuses = campuses =>
    campuses.map(campus => (
      <option key={campus.id} value={campus.id}>
        {campus.campusName}
      </option>
    ));
  getCities = cities =>
    cities.map(city => (
      <option key={city.id} value={city.id}>
        {city.cityName}
      </option>
    ));

  getFloorNumberAndAreaForm = floors => {
    if (floors.length > 0) {
      return (
        <table>
          <thead>
            <tr>
              <td>Floor No.</td>
              <td>Floor Area</td>
            </tr>
          </thead>
          <tbody>
            {floors.map((floorObj, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="number"
                    onChange={e =>
                      this.buildFloorsJson('floorNo', i, e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    onChange={e =>
                      this.buildFloorsJson('floorArea', i, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return null;
  };

  buildFloorsJson = (key, index, value) => {
    const floorsStr = 'floors';
    const form = { ...this.state.form };

    const floorsClone = cloneDeep(form[floorsStr]);
    floorsClone.map((floor, i) => {
      if (index === i) {
        // eslint-disable-next-line
        floor[key] = value;
      }
      return null;
    });
    form[floorsStr] = floorsClone;
    this.setState({ form });
  };

  formatDataAndSave = form => {
    console.log('form on submit', form);
    const { type } = this.state;
    const data = {
      name: form.name,
      code: form.code,
      campus: form.campus,
      rented: form.rented,
      totalArea: form.totalArea,
      floorArea: form.floorArea,
      carpetArea: form.carpetArea,
      floors: form.floors,
      // city: form.city,
      // floorsQty: form.floorsQty,
      // floorAreaByNumber: form.floorAreaByNumber,
      // campusAddress: {
      //   line1: form.line1,
      //   line2: form.line2,
      //   line3: form.line3
      // },
      // pincode: form.pincode,
      createdBy: this.props.loggedInUser.id
    };
    console.log(data);
    if (type === ADD) {
      // this.props.dispatch(createOrg(data, this.callBack));
    }
  };

  callBack = APIresponse => {
    this.props.dispatch(
      handleSnackBar({ snackBarOpen: true, snackBarMsg: APIresponse.message })
    );
    if (!APIresponse.error) {
      this.closeModal();
      this.resetForm();
    }
  };

  resetForm = () => this.setState({ form: initialForm, errors: initialForm });

  validateInput = (name, value) =>
    new Promise(resolve => {
      const errors = { ...this.state.errors };
      if (value === '') {
        errors[name] = `${startCase(name)} cannot be empty!`;
      } else if (value !== '') {
        const splCharsAllowed = ['line1', 'line2', 'line3', 'orgPan'];
        // eslint-disable-next-line
        const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (!splCharsAllowed.includes(name) && format.test(value)) {
          errors[name] = 'Special characters are not allowed!';
        } else if (name === 'pincode' && value.length !== 6) {
          errors[name] = 'Pincode must be 6 digits long!';
        } else if (name === 'orgPan' && value.length !== 10) {
          errors[name] = 'PAN must be 10 digits long!';
        } else {
          errors[name] = '';
        }
      }
      resolve(errors);
    });

  openModal = type => () => this.setState({ type, showModal: true });

  closeModal = () => this.setState({ type: '', showModal: false });

  render() {
    const { showModal, type, form, errors } = this.state;
    const { campuses } = this.props;
    return (
      <div>
        <div>
          <ul
            style={{
              marginLeft: '-40px'
            }}
          >
            <li
              style={{
                display: 'inline',
                padding: '5px',
                color: '#0073a8'
              }}
            >
              <i
                className="fas fa-plus"
                aria-hidden="true"
                onClick={this.openModal(ADD)}
                title="Create Organisation"
              />
            </li>
            {this.props.selectedOrganisations.length > 0 ? (
              <li
                style={{
                  display: 'inline',
                  padding: '5px',
                  color: '#0073a8'
                }}
              >
                <i
                  className="far fa-edit"
                  aria-hidden="true"
                  title="Edit Organisation"
                />
              </li>
            ) : (
              ''
            )}
            <li
              style={{
                display: 'inline',
                padding: '5px',
                color: '#0073a8'
              }}
            >
              <i
                className="fas fa-filter"
                title="Filter Table"
                onClick={this.props.toggleTableFilter}
              />
            </li>
          </ul>
        </div>
        {showModal && (
          <LargeModal
            show={showModal}
            header={`${startCase(type)} Building`}
            onHide={this.closeModal}
            onSave={this.onSubmit}
            saveText="Submit"
            closeText="Close"
            resetText="Reset"
            onReset={this.resetForm}
            style={{ width: '450px', margin: '0 auto' }}
          >
            <form>
              <FieldGroup
                id="name"
                type="text"
                label="Building Name"
                placeholder="Enter building name"
                onChange={this.onChangeText('name')}
                value={form.name}
                validationState={errors.name !== '' ? 'error' : null}
                help={errors.name !== '' ? errors.name : null}
              />
              <FieldGroup
                id="code"
                type="text"
                label="Building Code"
                placeholder="Building code 3 - 4 digits"
                onChange={this.onChangeText('code')}
                value={form.code}
                validationState={errors.code !== '' ? 'error' : null}
                help={errors.code !== '' ? errors.code : null}
              />
              <FieldSelect
                id="campus"
                type="text"
                label="Campus"
                placeholder="Select Campus"
                onChange={this.onChangeText('campus')}
                value={form.campus}
                validationState={errors.campus !== '' ? 'error' : null}
                help={errors.campus !== '' ? errors.campus : null}
                options={this.getCampuses(campuses)}
              />
              {/* <label>Campus Address</label> */}
              {/* <FieldGroup
                id="line1"
                type="text"
                label="Line 1"
                placeholder="Enter address"
                onChange={this.onChangeText('line1')}
                value={form.line1}
                validationState={errors.line1 !== '' ? 'error' : null}
                help={errors.line1 !== '' ? errors.line1 : null}
              />
              <FieldGroup
                id="line2"
                type="text"
                label="Line 2"
                placeholder="Enter address"
                onChange={this.onChangeText('line2')}
                value={form.line2}
                validationState={errors.line2 !== '' ? 'error' : null}
                help={errors.line2 !== '' ? errors.line2 : null}
              />
              <FieldGroup
                id="line3"
                type="text"
                label="Line 3"
                placeholder="Enter address"
                onChange={this.onChangeText('line3')}
                value={form.line3}
                validationState={errors.line3 !== '' ? 'error' : null}
                help={errors.line3 !== '' ? errors.line3 : null}
              />
              <FieldSelect
                id="city"
                type="text"
                label="City"
                placeholder="Select City"
                onChange={this.onChangeText('city')}
                value={form.city}
                validationState={errors.city !== '' ? 'error' : null}
                help={errors.city !== '' ? errors.city : null}
                options={this.getCities(cities)}
              />
              <FieldGroup
                id="pincode"
                type="number"
                label="Pincode"
                placeholder="Enter pincode"
                onChange={this.onChangeText('pincode')}
                value={form.pincode}
                validationState={errors.pincode !== '' ? 'error' : null}
                help={errors.pincode !== '' ? errors.pincode : null}
              /> */}
              <FormGroup onChange={this.onChangeText('rented')}>
                <ControlLabel>Rented Premises</ControlLabel>
                <br />
                <Radio name="radioGroup" inline>
                  Yes
                </Radio>{' '}
                <Radio name="radioGroup" inline>
                  No
                </Radio>
              </FormGroup>
              <FieldGroup
                id="totalArea"
                type="number"
                label="Total Area(in Sft)"
                placeholder="Enter Total Area"
                onChange={this.onChangeText('totalArea')}
                value={form.totalArea}
                validationState={errors.totalArea !== '' ? 'error' : null}
                help={errors.totalArea !== '' ? errors.totalArea : null}
              />
              <FieldGroup
                id="floorArea"
                type="number"
                label="Floor Area(in Sft)"
                placeholder="Enter Floor Area"
                onChange={this.onChangeText('floorArea')}
                value={form.floorArea}
                validationState={errors.floorArea !== '' ? 'error' : null}
                help={errors.floorArea !== '' ? errors.floorArea : null}
              />
              <FieldGroup
                id="carpetArea"
                type="number"
                label="Carpet Area(in Sft)"
                placeholder="Enter Carpet Area"
                onChange={this.onChangeText('carpetArea')}
                value={form.carpetArea}
                validationState={errors.carpetArea !== '' ? 'error' : null}
                help={errors.carpetArea !== '' ? errors.carpetArea : null}
              />
              <FieldGroup
                id="floorsQty"
                type="number"
                label="Number of Floors"
                placeholder="Enter Number of Floors"
                onChange={this.onChangeText('floorsQty')}
                value={form.floorsQty}
                validationState={errors.floorsQty !== '' ? 'error' : null}
                help={errors.floorsQty !== '' ? errors.floorsQty : null}
              />
              {this.getFloorNumberAndAreaForm(form.floors)}
            </form>
          </LargeModal>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser,
  campuses: state.campus.campuses
  // cities: state.cities.cities
});

export default connect(mapStateToProps)(BuildingForm);
