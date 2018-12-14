import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { SnackBar } from '../../components/SnackBar';
import { handleSnackBar } from '../../actions/DashboardAction';
import CheckBoxTable from '../../components/Table/CheckboxTable';
import {
  fetchSourceCodes,
  fetchAgencyCodes
} from '../../actions/CodeAndTypeActions';
import SourceCodeForm from './SourceCodeForm';
import { toggleTableRow, idToObjectId } from '../../helpers/reusableFunctions';
import AgencyCodeForm from './AgencyCodeForm';

class CodesAndTypes extends Component {
  constructor() {
    super();
    this.state = {
      selectedSourceCodes: [],
      selectAllSourceCodes: false,
      selectAllAgencyCodes: false,
      selectedAgencyCodes: []
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchSourceCodes());
    this.props.dispatch(fetchAgencyCodes());
  }

  toggleFilterSourceCodeTable = () =>
    this.setState({
      enableFilter_sourceTable: !this.state.enableFilter_sourceTable
    });
  toggleFilterAgencyTable = () =>
    this.setState({
      enableFilter_agencyTable: !this.state.enableFilter_agencyTable
    });
  changeParentState = () =>
    this.setState({
      selectedSourceCodes: [],
      selectedAgencyCodes: [],
      selectAllSourceCodes: false,
      selectAllAgencyCodes: false
    });
  toggleSelectionSCTable = (selected, tableData) => {
    const { selectedObj } = toggleTableRow(selected, tableData);
    this.setState({
      selectedSourceCodes: selected,
      selectedSourceCodeRow: selectedObj
    });
  };
  toggleSelectionAgencyTable = (selected, tableData) => {
    const { selectedObj } = toggleTableRow(selected, tableData);
    this.setState({
      selectedAgencyCodes: selected,
      selectedAgencyRow: selectedObj
    });
  };
  render() {
    const sourceCodeTableData = idToObjectId(this.props.sourceTypes);
    const agencyCodesTableData = idToObjectId(this.props.agencyCodes);

    let { selectAllSourceCodes } = this.state;
    if (this.state.selectedSourceCodes.length === sourceCodeTableData.length) {
      selectAllSourceCodes = true;
    } else {
      selectAllSourceCodes = false;
    }
    let { selectAllAgencyCodes } = this.state;
    if (this.state.selectedAgencyCodes.length === agencyCodesTableData.length) {
      selectAllAgencyCodes = true;
    } else {
      selectAllAgencyCodes = false;
    }
    return (
      <div className="browse-wrap padding">
        <Row>
          <Col lg={6} md={6} sm={6}>
            <SourceCodeForm
              selectedSourceCodes={this.state.selectedSourceCodes}
              toggleThisTableFilter={this.toggleFilterSourceCodeTable}
              changeParentState={this.changeParentState}
              selectedThisTableRow={this.state.selectedSourceCodeRow}
            />
          </Col>
          <Col lg={6} md={6} sm={6}>
            {/* <CityForm
              selectedCities={this.state.selectedCities}
              toggleCitiesTableFilter={this.toggleCitiesTableFilter}
              changeParentState={this.changeParentState}
              selectedCityTableRow={this.state.selectedCityRow}
            /> */}
            <AgencyCodeForm
              selectedAgencyCodes={this.state.selectedAgencyCodes}
              toggleThisTableFilter={this.toggleFilterAgencyTable}
              changeParentState={this.changeParentState}
              selectedThisTableRow={this.state.selectedAgencyRow}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6} sm={6}>
            <CheckBoxTable
              enableMultiSelect
              enableSelectAll
              selection={this.state.selectedSourceCodes}
              selectAll={selectAllSourceCodes}
              toggleAll={(selectAll, selection) =>
                this.setState({
                  selectAllSourceCodes: selectAll,
                  selectedSourceCodes: selection
                })
              }
              toggleSelection={selection =>
                this.toggleSelectionSCTable(selection, sourceCodeTableData)
              }
              data={sourceCodeTableData}
              columns={[
                { Header: 'Source Name', accessor: 'sourceName' },
                { Header: 'Source Code', accessor: 'sourceCode' }
              ]}
              filterable={this.state.enableFilter_sourceTable}
            />
          </Col>
          <Col lg={6} md={6} sm={6}>
            <CheckBoxTable
              enableMultiSelect
              enableSelectAll
              selection={this.state.selectedAgencyCodes}
              selectAll={selectAllAgencyCodes}
              toggleAll={(selectAll, selection) =>
                this.setState({
                  selectAllAgencyCodes: selectAll,
                  selectedAgencyCodes: selection
                })
              }
              toggleSelection={selection =>
                this.toggleSelectionAgencyTable(selection, agencyCodesTableData)
              }
              data={agencyCodesTableData}
              columns={[
                { Header: 'Agency Name', accessor: 'agencyName' },
                { Header: 'Agency Code', accessor: 'agencyCode' },
                { Header: 'Source Name', accessor: 'sourceName' }
              ]}
              filterable={this.state.enableFilter_agencyTable}
            />
          </Col>
        </Row>

        {/* Snackbar is given below */}
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
  sourceTypes: state.codesAndTypes.sourceTypes,
  agencyCodes: state.codesAndTypes.agencyCodes
});
export default connect(mapStateToProps)(CodesAndTypes);
