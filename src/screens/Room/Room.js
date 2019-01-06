import React, { Component } from 'react';
import { connect } from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';
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
    const { currentOrganisation, currentAcademicYear } = this.props;
    if (currentOrganisation.id && currentAcademicYear.id) {
      this.props.dispatch(fetchBranches());
      this.props.dispatch(fetchRooms());
    } else {
      this.props.router.push('/error');
    }
  }

  toggleAll = (selectAll, selection) => this.setState({ selectAll, selection });

  toggleSelection = selection => this.setState({ selection });

  render() {
    const { selection, filterable, selectAll } = this.state;
    const { rooms } = this.props;
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Room</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div>
            <RoomForm selection={selection} />
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
        </Panel.Body>
      </Panel >
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.room.rooms,
  currentOrganisation: state.organisations.currentOrganisation,
  currentAcademicYear: state.academicYears.currentAcademicYear
});

export default connect(mapStateToProps)(Campus);
