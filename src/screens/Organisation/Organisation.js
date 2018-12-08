import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { SnackBar } from '../../components/SnackBar';
import { handleSnackBar } from '../../actions/DashboardAction';
import CheckBoxTable from '../../components/Table/CheckboxTable';
import OrganisationForm from './OrganisationForm';
import { fetchOrganisations } from '../../actions/OrganisationActions';
import { fetchStates } from '../../actions/StateAction';
import { fetchCities } from '../../actions/CityActions';

class Organisation extends Component {
  constructor() {
    super();
    this.state = {
      selectedOrganisations: [],
      filterable: false,
      selectAll: false
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchOrganisations());
    this.props.dispatch(fetchStates());
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

  changeParentState = () =>
    this.setState({ selectAll: false, selectedOrganisations: [] });
  render() {
    const organisationTableData = this.getOrganisationTableData(
      this.props.organisations
    );
    let { selectAll } = this.state;
    if (
      this.state.selectedOrganisations.length === organisationTableData.length
    ) {
      selectAll = true;
    } else {
      selectAll = false;
    }
    return (
      <div className="browse-wrap padding">
        <Row>
          <Col lg={6} md={6} sm={6}>
            <OrganisationForm
              selectedOrganisations={this.state.selectedOrganisations}
              toggleTableFilter={this.toggleTableFilter}
              changeParentState={this.changeParentState}
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
            this.toggleSelectionOrganisationsTable(
              selection,
              organisationTableData
            )
          }
          data={organisationTableData}
          columns={[
            { Header: 'Legal Status', accessor: 'legalStatus' },
            { Header: 'Organisation Name', accessor: 'orgName' },
            { Header: 'Short Name', accessor: 'orgShortName' },
            { Header: 'Address', accessor: 'orgAddress' },
            { Header: 'State', accessor: 'state' },
            { Header: 'City', accessor: 'city' },
            { Header: 'PAN', accessor: 'orgPAN' },
            { Header: 'PIN', accessor: 'orgPin' }
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
  organisations: state.organisations.organisations
});

export default connect(mapStateToProps)(Organisation);
