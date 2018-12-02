import React, { Component } from 'react';
import { startCase, findIndex } from 'lodash';
import { connect } from 'react-redux';

import { FieldGroup, FieldSelect } from '../../components/Form';
import { LargeModal } from '../../components/Modals';
import './Room.scss';
import { createRoom } from '../../actions/RoomActions';

const initialForm = {
  branchName: '',
  buildingName: '',
  floorNumber: '',
  // parentOrg: null,
  roomNumber: '',
  roomUsage: '',
  roomCarpetArea: ''
};

const ADD = 'add';
// const EDIT = 'edit';

const roomUsageOptions = [
  <option key={1} value={'Class Room'}>
    Class Room
  </option>,
  <option key={2} value={'Front Office'}>
    Front Office
  </option>,
  <option key={3} value={'Admin Room'}>
    Admin Room
  </option>
];

const buildNameOptions = [
  <option key="5c02ba7b70a1c3277ac948fa" value="5c02ba7b70a1c3277ac948fa">
    Building 1
  </option>,
  <option key="5c02ba7b80a2c3277ac948fb" value="5c02ba7b80a2c3277ac948fb">
    Building 2
  </option>,
  <option key="5c02ba7b90a3c3277ac948fc" value="5c02ba7b90a3c3277ac948fc">
    Building 3
  </option>
];

const floorNumberOptions = [
  <option key="1" value="1">
    1
  </option>,
  <option key="2" value="2">
    2
  </option>,
  <option key="3" value="3">
    3
  </option>
];

class RoomForm extends Component {
  state = {
    type: '',
    form: initialForm,
    errors: initialForm,
    showModal: false
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
    } else {
      this.formatDataAndSave(form);
    }
  };

  onChangeText = name => ({ target: { value } }) => {
    const form = { ...this.state.form };
    const errors = { ...this.state.errors };
    form[name] = value;
    this.validateInput(name, value).then(newErrors =>
      this.setState({ errors: newErrors })
    );
    this.setState({ form, errors });
  };

  getOptions = (array, label, value) =>
    array.map(data => (
      <option key={data.id} value={data[value]}>
        {data[label]}
      </option>
    ));

  getState = city => {
    const { cities } = this.props;
    const index = findIndex(cities, { id: city });
    return index >= 0 ? cities[index].state : null;
  };

  formatDataAndSave = form => {
    const { type } = this.state;
    const data = {
      parentBranch: form.branchName,
      parentBuilding: form.buildingName,
      parentOrg: null,
      floorNumber: form.floorNumber,
      roomNumber: form.roomNumber,
      roomUsage: form.roomUsage,
      roomCarpetArea: form.roomCarpetArea,
      createdBy: null
    };
    if (type === ADD) {
      this.props.dispatch(createRoom(data));
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
      } else if (value !== '' && name === 'roomCarpetArea') {
        const format = /((\d+)(\.\d{2}))$/;
        if (!format.test(value)) {
          errors[name] = 'Invalid format!';
        } else {
          errors[name] = '';
        }
      } else if (value !== '') {
        errors[name] = '';
      }
      resolve(errors);
    });

  openModal = type => () => this.setState({ type, showModal: true });

  closeModal = () => this.setState({ type: '', showModal: false });

  render() {
    const { showModal, type, form, errors } = this.state;
    const { branches } = this.props;
    return (
      <div>
        <div className="action-icons">
          <i className="fas fa-plus" onClick={this.openModal(ADD)} />
          {/* <i className="fas fa-pencil-alt" onClick={this.openModal(EDIT)} /> */}
        </div>
        {showModal && (
          <LargeModal
            show={showModal}
            header={`${startCase(type)} Room`}
            onHide={this.closeModal}
            onSave={this.onSubmit}
            onReset={this.resetForm}
            saveText="Submit"
            closeText="Close"
            style={{ width: '450px', margin: '0 auto' }}
          >
            <form>
              <FieldSelect
                id="parentBranch"
                label="Branch Name"
                placeholder="Enter branch name"
                onChange={this.onChangeText('branchName')}
                value={form.branchName}
                validationState={errors.branchName !== '' ? 'error' : null}
                help={errors.branchName !== '' ? errors.branchName : null}
                options={this.getOptions(branches, 'name', 'id')}
              />
              <FieldSelect
                id="buildingName"
                label="Building Name"
                placeholder="Enter building name"
                onChange={this.onChangeText('buildingName')}
                value={form.buildingName}
                validationState={errors.buildingName !== '' ? 'error' : null}
                help={errors.buildingName !== '' ? errors.buildingName : null}
                options={buildNameOptions}
              />
              <FieldSelect
                id="floorNumber"
                label="Floor Number"
                placeholder="Enter floor number"
                onChange={this.onChangeText('floorNumber')}
                value={form.floorNumber}
                validationState={errors.floorNumber !== '' ? 'error' : null}
                help={errors.floorNumber !== '' ? errors.floorNumber : null}
                options={floorNumberOptions}
              />
              <FieldGroup
                id="roomNumber"
                type="number"
                label="Room Number"
                placeholder="Enter room number"
                onChange={this.onChangeText('roomNumber')}
                value={form.roomNumber}
                validationState={errors.roomNumber !== '' ? 'error' : null}
                help={errors.roomNumber !== '' ? errors.roomNumber : null}
              />
              <FieldSelect
                id="roomUsage"
                label="Room Usage"
                placeholder="Enter room usage"
                onChange={this.onChangeText('roomUsage')}
                value={form.roomUsage}
                validationState={errors.roomUsage !== '' ? 'error' : null}
                help={errors.roomUsage !== '' ? errors.roomUsage : null}
                options={roomUsageOptions}
              />
              <FieldGroup
                id="roomCarpetArea"
                type="number"
                label="Room Carpet Area"
                placeholder="Enter room carpet area"
                onChange={this.onChangeText('roomCarpetArea')}
                value={form.roomCarpetArea}
                validationState={errors.roomCarpetArea !== '' ? 'error' : null}
                help={
                  errors.roomCarpetArea !== ''
                    ? errors.roomCarpetArea
                    : 'Example format 11.00'
                }
                step="0.01"
              />
            </form>
          </LargeModal>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  branches: state.branch.branches
});

export default connect(mapStateToProps)(RoomForm);
