import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class EditableTable extends React.Component {
  render() {
    const { dataToEdit } = this.props;
    console.log('dataToEdit', dataToEdit);
    return (
      <div>
        <ReactTable
          data={dataToEdit.animals}
          columns={[
            { Header: 'Animal Name', accessor: 'animalSpecie.name' },
            { Header: 'Color', accessor: 'color' },
            { Header: 'Gender', accessor: 'gender' },
            { Header: 'Quanitiy', accessor: 'quantity' },
            {
              Header: 'Alive Quantity',
              accessor: 'aliveQuantity',
              Cell: cellInfo => this.props.renderEditable(cellInfo)
            },
            { Header: 'Remarks', accessor: 'remarks' }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default EditableTable;
