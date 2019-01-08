import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';
import { SnackBar } from '../../components/SnackBar';
import { handleSnackBar } from '../../actions/DashboardAction';
import CheckBoxTable from '../../components/Table/CheckboxTable';
import StateForm from './StateForm';
import { fetchStates } from '../../actions/StateAction';
import CityForm from './CityForm';
import { fetchCities } from '../../actions/CityActions';

const objectId = '_id';

class StateAndCity extends Component {
  constructor() {
    super();
    this.state = {
      selectedStates: [],
      selectedCities: [],
      selectAllState: false,
      selectAllCity: false
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchStates());
    this.props.dispatch(fetchCities());
  }

  getStatesTableData = states =>
    states.map(stateObj => ({
      _id: stateObj.id,
      stateName: stateObj.stateName,
      stateShortCode: stateObj.stateShortCode
    }));
  getCitiesTableData = cities =>
    cities.map(city => ({
      _id: city.id,
      cityName: city.cityName,
      cityShortCode: city.cityShortCode,
      stateName: city.state.stateName,
      state: city.state[objectId]
    }));

  toggleSelectionStateTable = (selected, tableData) => {
    let selectedObj = {};
    tableData.map(row => {
      if (selected.indexOf(row[objectId]) >= 0) {
        selectedObj = { ...row };
      }
      return null;
    });
    this.setState({ selectedStates: selected, selectedStateRow: selectedObj });
  };
  toggleSelectionCityTable = (selected, tableData) => {
    let selectedObj = {};
    tableData.map(row => {
      if (selected.indexOf(row[objectId]) >= 0) {
        selectedObj = { ...row };
      }
      return null;
    });
    this.setState({ selectedCities: selected, selectedCityRow: selectedObj });
  };

  toggleStateTableFilter = () =>
    this.setState({
      enableFilter_stateTable: !this.state.enableFilter_stateTable
    });
  toggleCitiesTableFilter = () =>
    this.setState({
      enableFilter_citiesTable: !this.state.enableFilter_citiesTable
    });

  changeParentState = () =>
    this.setState({
      selectedStates: [],
      selectedCities: [],
      selectAllState: false,
      selectAllCity: false
    });

  render() {
    const statesTableData = this.getStatesTableData(this.props.states);
    const citiesTableData = this.getCitiesTableData(this.props.cities);

    let { selectAllState } = this.state;
    if (this.state.selectedStates.length === statesTableData.length) {
      selectAllState = true;
    } else {
      selectAllState = false;
    }

    let { selectAllCity } = this.state;
    if (this.state.selectedCities.length === citiesTableData.length) {
      selectAllCity = true;
    } else {
      selectAllCity = false;
    }

    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">State and City</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div className="browse-wrap padding">
            <Row>
              <Col lg={6} md={6} sm={6}>
                <StateForm
                  selectedStates={this.state.selectedStates}
                  toggleStateTableFilter={this.toggleStateTableFilter}
                  changeParentState={this.changeParentState}
                  selectedStateTableRow={this.state.selectedStateRow}
                />
              </Col>
              <Col lg={6} md={6} sm={6}>
                <CityForm
                  selectedCities={this.state.selectedCities}
                  toggleCitiesTableFilter={this.toggleCitiesTableFilter}
                  changeParentState={this.changeParentState}
                  selectedCityTableRow={this.state.selectedCityRow}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={6}>
                <CheckBoxTable
                  enableMultiSelect
                  enableSelectAll
                  selection={this.state.selectedStates}
                  selectAll={selectAllState}
                  toggleAll={(selectAll, selection) =>
                    this.setState({
                      selectAllState: selectAll,
                      selectedStates: selection
                    })
                  }
                  toggleSelection={selection =>
                    this.toggleSelectionStateTable(selection, statesTableData)
                  }
                  data={statesTableData}
                  columns={[
                    { Header: 'State Name', accessor: 'stateName' },
                    { Header: 'State Code', accessor: 'stateShortCode' }
                  ]}
                  filterable={this.state.enableFilter_stateTable}
                />
              </Col>
              <Col lg={6} md={6} sm={6}>
                <CheckBoxTable
                  enableMultiSelect
                  enableSelectAll
                  selection={this.state.selectedCities}
                  selectAll={selectAllCity}
                  toggleAll={(selectAll, selection) =>
                    this.setState({
                      selectAllCity: selectAll,
                      selectedCities: selection
                    })
                  }
                  toggleSelection={selection =>
                    this.toggleSelectionCityTable(selection, citiesTableData)
                  }
                  data={citiesTableData}
                  columns={[
                    { Header: 'City Name', accessor: 'cityName' },
                    { Header: 'City Code', accessor: 'cityShortCode' },
                    { Header: 'State Name', accessor: 'stateName' }
                  ]}
                  filterable={this.state.enableFilter_citiesTable}
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
        </Panel.Body>
      </Panel >
    );
  }
}

const mapStateToProps = state => ({
  snackBarOpen: state.dashboard.snackBarOpen,
  snackBarMsg: state.dashboard.snackBarMsg,
  states: state.states.states,
  cities: state.cities.cities
});

export default connect(mapStateToProps)(StateAndCity);
