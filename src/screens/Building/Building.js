import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { SnackBar } from '../../components/SnackBar';
import { handleSnackBar } from '../../actions/DashboardAction';
import CheckBoxTable from '../../components/Table/CheckboxTable';
import { fetchCities } from '../../actions/CityActions';
import BuildingForm from './BuildingForm';
import { fetchCampuses } from '../../actions/CampusActions';

class Building extends Component {
  constructor() {
    super();
    this.state = {
      selectedOrganisations: [],
      filterable: false
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchCampuses());
    this.props.dispatch(fetchCities());
  }

  getOrganisationTableData = organisations =>
    organisations.map(orgObj => ({
      _id: orgObj.id,
      legalStatus: orgObj.legalStatus,
      orgName: orgObj.orgName,
      orgShortName: orgObj.orgShortName,
      orgAddress: `${orgObj.orgAddress.line1}, ${orgObj.orgAddress.line2}, ${
        orgObj.orgAddress.line3
      }`,
      state: orgObj.state.stateName,
      city: orgObj.city.cityName,
      orgPAN: orgObj.orgPAN,
      orgPin: orgObj.orgPin
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
      selectedOrganisationRow: selectedObj
    });
  };

  toggleTableFilter = () =>
    this.setState({ filterable: !this.state.filterable });

  render() {
    // const organisationTableData = this.getOrganisationTableData(
    //   this.props.organisations
    // );
    return (
      <div className="browse-wrap padding">
        <Row>
          <Col lg={6} md={6} sm={6}>
            <BuildingForm
              selectedOrganisations={this.state.selectedOrganisations}
              toggleTableFilter={this.toggleTableFilter}
            />
          </Col>
        </Row>
        <CheckBoxTable
          enableMultiSelect={false}
          enableSelectAll={false}
          selection={this.state.selectedOrganisations}
          selectAll={false}
          toggleAll={(selectAll, selection) =>
            this.setState({ selectAll, selectedOrganisations: selection })
          }
          toggleSelection={selection =>
            this.toggleSelectionOrganisationsTable(selection, [])
          }
          data={[]}
          columns={[
            { Header: 'Building Name', accessor: 'name' },
            { Header: 'Building Code', accessor: 'code' },
            { Header: 'Campus', accessor: 'campus' },
            { Header: 'Campus Address', accessor: 'campusAddress' },
            { Header: 'Rented Premises', accessor: 'rented' },
            { Header: 'Total Area(in Sft)', accessor: 'totalArea' },
            { Header: 'Floor Area(in Sft)', accessor: 'floorArea' },
            { Header: 'Carpet Area', accessor: 'carpetArea' },
            { Header: 'Number of Floors', accessor: 'floorsQty' }
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
  snackBarMsg: state.dashboard.snackBarMsg
});

export default connect(mapStateToProps)(Building);
