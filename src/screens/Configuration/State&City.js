import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import CheckBoxTable from '../../components/Table/CheckboxTable';
import ReactBootstrapModal from '../../components/Modals/ReactBootstrapModal';
import CreateState from './CreateState';
import CreateCity from './CreateCity';

class StateAndCity extends Component {
  constructor() {
    super();
    this.state = {
      selectedStates: [],
      selectedCities: [],
      enableFilter_stateTable: false,

      openCreateState: false,
      stateName: '',
      stateCode: '',

      openCreateCity: false,
      cityName: '',
      cityCode: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleSelectionStateTable = (selected, tableData) => {
    const objectId = '_id';
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
    const objectId = '_id';
    let selectedObj = {};
    tableData.map(row => {
      if (selected.indexOf(row[objectId]) >= 0) {
        selectedObj = { ...row };
      }
      return null;
    });
    this.setState({ selectedCities: selected, selectedCityRow: selectedObj });
  };

  render() {
    return (
      <div className="browse-wrap padding">
        <Row>
          <Col lg={6} md={6} sm={6}>
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
                  onClick={() => this.setState({ openCreateState: true })}
                  title="Create State"
                />
              </li>
              {this.state.selectedStates.length > 0 ? (
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
                    // onClick={() =>
                    //   // this.setState({ openCreateAnnouncement: true })
                    //   )
                    // }
                    title="Edit State"
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
                  onClick={() =>
                    this.setState({
                      enableFilter_stateTable: !this.state
                        .enableFilter_stateTable
                    })
                  }
                />
              </li>
            </ul>
          </Col>
          <Col lg={6} md={6} sm={6}>
            <ul
              style={{
                marginLeft: '-39px'
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
                  onClick={() => this.setState({ openCreateCity: true })}
                  title="Create City"
                />
              </li>
              {this.state.selectedCities.length > 0 ? (
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
                    // onClick={() =>
                    //   // this.setState({ openCreateAnnouncement: true })
                    //   this.getSelectedAnnouncementData(
                    //     this.state.selection[0],
                    //     announcements
                    //   )
                    // }
                    title="Edit State"
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
                  onClick={() =>
                    this.setState({
                      enableFilter_citiesTable: !this.state
                        .enableFilter_citiesTable
                    })
                  }
                />
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6} sm={6}>
            <CheckBoxTable
              enableMultiSelect={false}
              enableSelectAll={false}
              selection={this.state.selectedStates}
              selectAll={false}
              toggleAll={(selectAll, selection) =>
                this.setState({ selectAll, selectedStates: selection })
              }
              toggleSelection={selection =>
                this.toggleSelectionStateTable(selection, [
                  {
                    _id: 0,
                    name: 'New York',
                    code: 'NY'
                  },
                  {
                    _id: 1,
                    name: 'Victoria',
                    code: 'VI'
                  }
                ])
              }
              data={[
                {
                  _id: 0,
                  name: 'New York',
                  code: 'NY'
                },
                {
                  _id: 1,
                  name: 'Victoria',
                  code: 'VI'
                }
              ]}
              columns={[
                { Header: 'State Name', accessor: 'name' },
                { Header: 'State Code', accessor: 'code' }
              ]}
              filterable={this.state.enableFilter_stateTable}
            />
          </Col>
          <Col lg={6} md={6} sm={6}>
            <CheckBoxTable
              enableMultiSelect={false}
              enableSelectAll={false}
              selection={this.state.selectedCities}
              selectAll={false}
              toggleAll={(selectAll, selection) =>
                this.setState({ selectAll, selectedCities: selection })
              }
              toggleSelection={selection =>
                this.toggleSelectionCityTable(selection, [
                  {
                    _id: 0,
                    name: 'Buffalo',
                    code: 'Buf',
                    stateName: 'New York'
                  },
                  {
                    _id: 1,
                    name: 'Melbourne',
                    code: 'MEL',
                    stateName: 'Victoria'
                  }
                ])
              }
              data={[
                {
                  _id: 0,
                  name: 'Buffalo',
                  code: 'Buf',
                  stateName: 'New York'
                },
                {
                  _id: 1,
                  name: 'Melbourne',
                  code: 'MEL',
                  stateName: 'Victoria'
                }
              ]}
              columns={[
                { Header: 'City Name', accessor: 'name' },
                { Header: 'City Code', accessor: 'code' },
                { Header: 'State Name', accessor: 'stateName' }
              ]}
              filterable={this.state.enableFilter_citiesTable}
            />
          </Col>
        </Row>

        {/* Forms are written below */}

        <div>
          <ReactBootstrapModal
            show={this.state.openCreateState}
            onHide={() => this.setState({ openCreateState: false })}
            title={'Create State'}
            body={
              <CreateState
                formData={{
                  stateName: this.state.stateName,
                  stateCode: this.state.stateCode
                }}
                handleChange={e => this.handleChange(e)}
              />
            }
            submitText={'Create State'}
          />

          <ReactBootstrapModal
            show={this.state.openCreateCity}
            onHide={() => this.setState({ openCreateCity: false })}
            title={'Create City'}
            body={
              <CreateCity
                formData={{
                  cityName: this.state.cityName,
                  cityCode: this.state.cityCode
                }}
                handleChange={e => this.handleChange(e)}
              />
            }
            submitText={'Create City'}
          />
        </div>
      </div>
    );
  }
}

export default StateAndCity;
