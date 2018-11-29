import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CustomizedTable = ({ headers, data }) => (
  <Table id="escalation" striped bordered hover responsive pagination>
    <thead>
      <tr>{headers.map(head => <th>{head}</th>)}</tr>
    </thead>
    <tbody>
      {data.map(n => (
        <tr key={n.id}>
          <td>{n.name}</td>
          <td>{n.calories}</td>
          <td>{n.fat}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

CustomizedTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CustomizedTable;
