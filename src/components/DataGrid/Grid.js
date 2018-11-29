import React from 'react';
import ReactDataGrid from 'react-data-grid';

class DataGrid extends React.Component {

  rowGetterfunction = (i) => this.props.rows[i];
  render() {
    const { columns } = this.props;
    console.log(this.props);
    return (
      <div>
        <ReactDataGrid
          columns={columns}
          rowGetter={this.rowGetterfunction}
          rowsCount={this.props.rows.length}
          enableRowSelect="single"
          minHeight={(this.props.rows.length + 1) * 40}
          // rowSelection={{
          //   showCheckbox: true,
          //   enableShiftSelect: true,
          //   onRowsSelected: this.onRowsSelected,
          //   onRowsDeselected: this.onRowsDeselected,
          //   selectBy: {
          //     indexes: this.state.selectedSkillRowIndexes
          //   }
          // }}
        />
      </div>
    );
  }
}

export default DataGrid;
