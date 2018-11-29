import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';

const PaginatedTable = ({ rows, columns }) => (
  <ReactTable
    data={rows}
    columns={columns}
    showPagination
    showPaginationTop={false}
    defaultPageSize={10}
    sortable={false}
    className="-striped -highlight"
  />
);

PaginatedTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PaginatedTable;
