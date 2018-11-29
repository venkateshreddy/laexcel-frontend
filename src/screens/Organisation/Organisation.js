import React, { Component } from 'react';
import CheckBoxTable from '../../components/Table/CheckboxTable';

class Organisation extends Component {
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
      </div>
    );
  }
}

export default Organisation;
