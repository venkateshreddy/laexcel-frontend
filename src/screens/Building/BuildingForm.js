import React, { Component } from 'react';
import { startCase, cloneDeep } from 'lodash';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
// import { FormGroup, ControlLabel, Radio } from 'react-bootstrap';
import { FieldGroup, FieldSelect } from '../../components/Form';
import { LargeModal } from '../../components/Modals';
import { handleSnackBar } from '../../actions/DashboardAction';
import FieldRadio from '../../components/Form/FieldRadio';
import {
  createBuilding,
  updateBuilding,
  deleteBuilding
} from '../../actions/BuildingActions';
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
const EDIT = 'edit';

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
    const hasNoErrors = Object.keys(errors).every(
      name => (name !== 'floors' ? errors[name] === '' : true)
    );
    console.log(hasNoErrors);
    if (!hasNoErrors) {
      this.setState({ errors });
    } else {
      this.formatDataAndSave(form);
    }
  };

  onRadioSelect = key => ({ target: { name, checked } }) => {
    const form = { ...this.state.form };
    const errors = { ...this.state.errors };
    form[key] = checked ? name : '';
    errors[key] = '';
    this.setState({ form, errors });
  };

  onChangeText = name => ({ target: { value } }) => {
    // console.log(name, value);
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
                    value={floorObj.floorNo}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    onChange={e =>
                      this.buildFloorsJson('floorArea', i, e.target.value)
                    }
                    value={floorObj.floorArea}
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

  getRentedBool = rented => rented === 'Yes';

  buildFloorsJson = (key, index, value) => {
    const floorsStr = 'floors';
    const form = { ...this.state.form };

    const floorsClone = cloneDeep(form[floorsStr]);
    floorsClone.map((floor, i) => {
      if (index === i) {
        // eslint-disable-next-line
        floor[key] = Number(value);
      }
      return null;
    });
    form[floorsStr] = floorsClone;
    this.setState({ form });
  };

  formatDataAndSave = form => {
    const { type } = this.state;
    const data = {
      name: form.name,
      code: form.code,
      campus: form.campus,
      rented: this.getRentedBool(form.rented),
      totalArea: Number(form.totalArea),
      floorArea: Number(form.floorArea),
      carpetArea: Number(form.carpetArea),
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
    // console.log(data);
    if (type === ADD) {
      this.props.dispatch(createBuilding(data, this.callBack));
    }
    if (type === EDIT) {
      this.props.dispatch(
        updateBuilding(this.props.selectedTableRow.id, data, this.callBack)
      );
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

  editForm = () => ({
    name: this.props.selectedTableRow.name,
    code: this.props.selectedTableRow.code,
    campus: this.props.selectedTableRow.campus,
    rented: this.props.selectedTableRow.rented ? 'Yes' : 'No',
    totalArea: this.props.selectedTableRow.totalArea,
    floorArea: this.props.selectedTableRow.floorArea,
    carpetArea: this.props.selectedTableRow.carpetArea,
    floorsQty: this.props.selectedTableRow.floors.length,
    floors: this.props.selectedTableRow.floors
  });
  openModal = type => () => {
    if (type === EDIT) {
      const form = this.editForm();
      this.setState({ type, form, showModal: true });
    } else {
      this.setState({ type, showModal: true });
    }
  };

  closeModal = () => this.setState({ type: '', showModal: false });

  deleteBuildings = () => {
    this.props.dispatch(
      deleteBuilding(this.props.selectedOrganisations, this.callBack)
    );
  };
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
                title="Create Building"
              />
            </li>
            {this.props.selectedOrganisations.length === 1 ? (
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
                  title="Edit Building"
                  onClick={this.openModal(EDIT)}
                />
              </li>
            ) : (
              ''
            )}
            {this.props.selectedOrganisations.length > 0 ? (
              <li
                style={{
                  display: 'inline',
                  padding: '5px',
                  color: '#0073a8'
                }}
              >
                <i
                  className="fa fa-trash"
                  aria-hidden="true"
                  title="Delete Building"
                  onClick={this.deleteBuildings}
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
              <Row>
                <Col lg={6} md={6} sm={6}>
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
                </Col>
                <Col lg={6} md={6} sm={6}>
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
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={6}>
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
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <FieldRadio
                    id="rented"
                    checked={form.rented}
                    values={['Yes', 'No']}
                    onChange={this.onRadioSelect('rented')}
                    validationState={errors.rented !== '' ? 'error' : null}
                    help={errors.rented !== '' ? errors.rented : null}
                  />
                </Col>
              </Row>
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
              {/* <FormGroup onChange={this.onChangeText('rented')}>
                <ControlLabel>Rented Premises</ControlLabel>
                <br />
                <Radio name="radioGroup" inline>
                  Yes
                </Radio>{' '}
                <Radio name="radioGroup" inline>
                  No
                </Radio>
              </FormGroup> */}
              <Row>
                <Col lg={6} md={6} sm={6}>
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
                </Col>
                <Col lg={6} md={6} sm={6}>
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
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={6}>
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
                </Col>
                <Col lg={6} md={6} sm={6}>
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
                </Col>
              </Row>
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
