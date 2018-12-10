import React, { Component } from 'react';
import { startCase, findIndex } from 'lodash';
import { connect } from 'react-redux';

import { SnackBar } from '../../components/SnackBar';
import { FieldGroup, FieldSelect } from '../../components/Form';
import { LargeModal } from '../../components/Modals';
import './Room.scss';
import { createRoom, deleteRooms, updateRoom } from '../../actions/RoomActions';
import { fetchBuildingss } from '../../actions/BuildingActions';

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
const EDIT = 'edit';

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

  componentDidMount() {
    this.props.dispatch(fetchBuildingss());
  }

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

  setEditData = id => {
    const { rooms } = this.props;
    const index = findIndex(rooms, { id });
    if (index >= 0) {
      const form = {
        branchName: rooms[index].parentBranch,
        buildingName: rooms[index].parentBuilding,
        floorNumber: rooms[index].floorNumber,
        roomNumber: rooms[index].roomNumber,
        roomUsage: rooms[index].roomUsage,
        roomCarpetArea: rooms[index].roomCarpetArea
      };
      this.setState({ type: EDIT, showModal: true, form });
    } else {
      this.setState({
        showFeedback: true,
        feedback: 'Unable to edit data at the moment!'
      });
    }
  };

  deleteRooms = () => {
    if (window.confirm('This action will delete all the selected rooms!')) {
      this.props.dispatch(deleteRooms({ ids: this.props.selection }));
    }
  };

  formatDataAndSave = form => {
    const { type } = this.state;
    const { currentOrganisation } = this.props;
    const data = {
      parentBranch: form.branchName,
      parentBuilding: form.buildingName,
      parentOrg: currentOrganisation.id,
      floorNumber: form.floorNumber,
      roomNumber: form.roomNumber,
      roomUsage: form.roomUsage,
      roomCarpetArea: form.roomCarpetArea,
      createdBy: this.props.loggedInUser.id
    };
    if (type === ADD) {
      this.props
        .dispatch(createRoom(data))
        .then(result => this.showFeedback(result, 'added'));
      this.closeModal();
      this.resetForm();
    }
    if (type === EDIT) {
      this.props
        .dispatch(updateRoom(this.props.selection[0], data))
        .then(result => this.showFeedback(result, 'updated'));
      this.closeModal();
      this.resetForm();
    }
  };

  resetForm = () => this.setState({ form: initialForm, errors: initialForm });

  showFeedback = (result, actionType) => {
    if (result.error !== undefined && !result.error) {
      this.setState({
        showFeedback: true,
        feedback: `Branch ${actionType} successfully!`
      });
    }
  };

  hideSnackBar = () => this.setState({ showFeedback: false, feedback: '' });

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

  openModal = type => () => {
    if (type === ADD) {
      this.setState({ type, showModal: true });
    } else {
      const { selection } = this.props;
      if (selection.length === 1) {
        this.setEditData(selection[0]);
      } else if (selection.length === 0) {
        this.setState({
          showFeedback: true,
          feedback: 'Please select a room to edit!'
        });
      }
    }
  };

  closeModal = () => this.setState({ type: '', showModal: false });

  render() {
    const {
      showModal,
      type,
      form,
      errors,
      showFeedback,
      feedback
    } = this.state;
    const { branches, buildings, selection } = this.props;
    return (
      <div>
        <div className="action-icons">
          <i
            className="fas fa-plus"
            title="Add room"
            onClick={this.openModal(ADD)}
          />
          {selection.length <= 1 && (
            <i
              className="fas fa-pencil-alt"
              title="Edit room"
              onClick={this.openModal(EDIT)}
            />
          )}
          {selection.length >= 1 && (
            <i
              className="fas fa-trash"
              title="Delete rooms"
              onClick={this.deleteRooms}
            />
          )}
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
                options={this.getOptions(buildings, 'name', 'id')}
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
        <SnackBar
          open={showFeedback}
          onClose={this.hideSnackBar}
          msg={feedback}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser,
  branches: state.branch.branches,
  buildings: state.building.buildings,
  rooms: state.room.rooms,
  currentOrganisation: state.organisations.currentOrganisation
});

export default connect(mapStateToProps)(RoomForm);
