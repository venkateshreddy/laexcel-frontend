import React, { Component } from 'react';
import CheckBoxTable from '../../components/Table/CheckboxTable';

class Student extends Component {
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
            { _id: 0, name: 'Robert', email: 'robert@gmail.com' },
            { _id: 1, name: 'Lucy', email: 'lucy@gmail.com' }
          ]}
          columns={[
            { Header: 'Student Name', accessor: 'name' },
            { Header: 'Student Email', accessor: 'email' }
          ]}
          filterable={this.state.filterable}
        />
      </div>
    );
  }
}

export default Student;
