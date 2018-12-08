import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { SnackBar } from '../../components/SnackBar';
import { handleSnackBar } from '../../actions/DashboardAction';
import CheckBoxTable from '../../components/Table/CheckboxTable';
import { fetchCities } from '../../actions/CityActions';
import BuildingForm from './BuildingForm';
import { fetchCampuses } from '../../actions/CampusActions';
import { fetchBuildingss } from '../../actions/BuildingActions';

class Building extends Component {
  constructor() {
    super();
    this.state = {
      selectedOrganisations: [],
      filterable: false,
      selectAll: false
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchCampuses());
    this.props.dispatch(fetchCities());
    this.props.dispatch(fetchBuildingss());
  }

  getTableData = buildings =>
    buildings.map(buildingObj => ({
      _id: buildingObj.id,
      ...buildingObj
    }));

  toggleSelectionOrganisationsTable = (selected, tableData) => {
    const objectId = '_id';
    let selectedObj = {};
    tableData.map(row => {
      if (selected.indexOf(row[objectId]) >= 0) {
        selectedObj = { ...row };
      }
      return null;
    });
    this.setState({
      selectedOrganisations: selected,
      selectedTableRow: selectedObj
    });
  };

  toggleTableFilter = () =>
    this.setState({ filterable: !this.state.filterable });

  render() {
    const { buildings } = this.props;
    const buildingTableData = this.getTableData(buildings);

    let { selectAll } = this.state;
    if (this.state.selectedOrganisations.length === buildingTableData.length) {
      selectAll = true;
    } else {
      selectAll = false;
    }
    return (
      <div className="browse-wrap padding">
        <Row>
          <Col lg={6} md={6} sm={6}>
            <BuildingForm
              selectedOrganisations={this.state.selectedOrganisations}
              toggleTableFilter={this.toggleTableFilter}
              selectedTableRow={this.state.selectedTableRow}
            />
          </Col>
        </Row>
        <CheckBoxTable
          enableMultiSelect
          enableSelectAll
          selection={this.state.selectedOrganisations}
          selectAll={selectAll}
          toggleAll={(selectall, selection) =>
            this.setState({
              selectAll: selectall,
              selectedOrganisations: selection
            })
          }
          toggleSelection={selection =>
            this.toggleSelectionOrganisationsTable(selection, buildingTableData)
          }
          data={buildingTableData}
          columns={[
            { Header: 'Building Name', accessor: 'name' },
            { Header: 'Building Code', accessor: 'code' },
            { Header: 'Campus', accessor: 'campusName' },
            {
              Header: 'Campus Address',
              accessor: 'campusAddress',
              Cell: row => (
                <div>
                  {row.original.campusAddress.line1},{' '}
                  {row.original.campusAddress.line2},{' '}
                  {row.original.campusAddress.line3}
                </div>
              )
            },
            {
              Header: 'Rented Premises',
              accessor: 'rented',
              Cell: row => <div>{row.original.rented ? 'Yes' : 'No'}</div>
            },
            { Header: 'Total Area(in Sft)', accessor: 'totalArea' },
            { Header: 'Floor Area(in Sft)', accessor: 'floorArea' },
            { Header: 'Carpet Area', accessor: 'carpetArea' },
            {
              Header: 'Number of Floors',
              accessor: 'floorsQty',
              Cell: row => <div>{row.original.floors.length}</div>
            }
          ]}
          filterable={this.state.filterable}
        />

        {/* Snackbar written below */}

        <div>
          <SnackBar
            open={this.props.snackBarOpen}
            onClose={() =>
              this.props.dispatch(
                handleSnackBar({ snackBarOpen: false, snackBarMsg: '' })
              )
            }
            msg={this.props.snackBarMsg}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  snackBarOpen: state.dashboard.snackBarOpen,
  snackBarMsg: state.dashboard.snackBarMsg,
  buildings: state.building.buildings
});

export default connect(mapStateToProps)(Building);
