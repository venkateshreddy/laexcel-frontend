import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import CheckBoxTable from '../../components/Table/CheckboxTable';

class StateAndCity extends Component {
  constructor() {
    super();
    this.state = {
      selection: [],
      filterable: false
    };
  }
  render() {
    return (
      <div className="browse-wrap padding">
        <Row>
          <Col lg={1} md={1} sm={1} />
          <Col lg={5} md={5} sm={5}>
            <CheckBoxTable
              enableMultiSelect={false}
              enableSelectAll={false}
              selection={this.state.selection}
              selectAll={false}
              toggleAll={(selectAll, selection) =>
                this.toggleAll(selectAll, selection)
              }
              toggleSelection={selection => this.toggleSelection(selection)}
              data={[
                {
                  _id: 0,
                  name: 'New York',
                  code: 'NY'
                },
                {
                  _id: 1,
                  name: 'Victoria',
                  code: 'VIC'
                }
              ]}
              columns={[
                { Header: 'State Name', accessor: 'name' },
                { Header: 'State Code', accessor: 'code' }
              ]}
              filterable={this.state.filterable}
            />
          </Col>
          <Col lg={5} md={5} sm={5}>
            <CheckBoxTable
              enableMultiSelect={false}
              enableSelectAll={false}
              selection={this.state.selection}
              selectAll={false}
              toggleAll={(selectAll, selection) =>
                this.toggleAll(selectAll, selection)
              }
              toggleSelection={selection => this.toggleSelection(selection)}
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
              filterable={this.state.filterable}
            />
          </Col>
          <Col lg={1} md={1} sm={1} />
        </Row>
      </div>
    );
  }
}

export default StateAndCity;
