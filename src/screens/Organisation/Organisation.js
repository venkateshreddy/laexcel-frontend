import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import CheckBoxTable from '../../components/Table/CheckboxTable';
import ReactBootstrapModal from '../../components/Modals/ReactBootstrapModal';
import CreateOrganisation from './CreateOrganisation';

class Organisation extends Component {
  constructor() {
    super();
    this.state = {
      selectedOrganisations: [],
      filterable: false,

      openCreateOrganisation: false,

      organisationName: '',
      shortName: '',
      line1: '',
      line2: '',
      line3: '',
      city: '',
      pinCode: '',
      pan: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
                  onClick={() =>
                    this.setState({ openCreateOrganisation: true })
                  }
                  title="Create Organisation"
                />
              </li>
              {this.state.selectedOrganisations.length > 0 ? (
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
                    title="Edit Organisation"
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
                      filterable: !this.state.filterable
                    })
                  }
                />
              </li>
            </ul>
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
            this.toggleSelectionOrganisationsTable(selection, [
              {
                _id: 0,
                name: 'Abcd University',
                address:
                  'Abcd Universitity, City Name, State Name, Country Name'
              },
              {
                _id: 1,
                name: 'XYZ Organisation',
                address: 'XYZ Organisation, City Name, State Name, Country Name'
              }
            ])
          }
          data={[
            {
              _id: 0,
              name: 'Abcd University',
              address: 'Abcd Universitity, City Name, State Name, Country Name'
            },
            {
              _id: 1,
              name: 'XYZ Organisation',
              address: 'XYZ Organisation, City Name, State Name, Country Name'
            }
          ]}
          columns={[
            { Header: 'Organisation Name', accessor: 'name' },
            { Header: 'Organisation Address', accessor: 'address' }
          ]}
          filterable={this.state.filterable}
        />

        {/* Forms are written below */}

        <div>
          <ReactBootstrapModal
            show={this.state.openCreateOrganisation}
            onHide={() => this.setState({ openCreateOrganisation: false })}
            title={'Create Organisation'}
            body={
              <CreateOrganisation
                formData={{
                  organisationName: this.state.organisationName,
                  shortName: this.state.shortName,
                  line1: this.state.line1,
                  line2: this.state.line2,
                  line3: this.state.line3,
                  city: this.state.city,
                  pinCode: this.state.pinCode,
                  pan: this.state.pan
                }}
                handleChange={e => this.handleChange(e)}
              />
            }
            submitText={'Create Organisation'}
          />
        </div>
      </div>
    );
  }
}

export default Organisation;
