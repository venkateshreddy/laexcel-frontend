import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class GroupingTable extends React.Component {
  render() {
    const { columns, rows, subComponentColumns } = this.props;
    return (
      <div>
        <ReactTable
          data={rows}
          columns={columns}
          defaultPageSize={10}
          // pivotBy={pivotBy}
          filterable={false}
          SubComponent={row => (
            <div style={{ padding: '20px' }}>
              <ReactTable
                data={row.original.animals}
                columns={subComponentColumns}
                defaultPageSize={3}
                showPagination={false}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default GroupingTable;
