import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CheckBoxTable } from '../../components/Table';
import RoomForm from './RoomForm';
import { fetchBranches } from '../../actions/BranchActions';
import { fetchRooms } from '../../actions/RoomActions';

const columns = [
  { Header: 'Branch Name', accessor: 'branchName' },
  { Header: 'Building Name', accessor: 'buildingName' },
  { Header: 'Floor Number', accessor: 'floorNumber' },
  { Header: 'Room Number', accessor: 'roomNumber' },
  { Header: 'Room Usage', accessor: 'roomUsage' },
  { Header: 'Room Carpet Area', accessor: 'roomCarpetArea' }
];

class Campus extends Component {
  state = {
    selection: [],
    filterable: false,
    selectAll: false
  };

  componentDidMount() {
    this.props.dispatch(fetchBranches());
    this.props.dispatch(fetchRooms());
  }

  toggleAll = (selectAll, selection) => this.setState({ selectAll, selection });

  toggleSelection = selection => this.setState({ selection });

  render() {
    const { selection, filterable, selectAll } = this.state;
    const { rooms } = this.props;
    return (
      <div>
        <RoomForm />
        <CheckBoxTable
          enableMultiSelect={false}
          enableSelectAll={false}
          selection={selection}
          selectAll={selectAll}
          toggleAll={this.toggleAll}
          toggleSelection={this.toggleSelection}
          data={rooms}
          columns={columns}
          filterable={filterable}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.room.rooms
});

export default connect(mapStateToProps)(Campus);