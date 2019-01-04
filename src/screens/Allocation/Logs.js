import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PaginatedTable } from '../../components/Table';
import { fetchLogsById } from '../../actions/AdmissionAction';

const columns = [
  {
    Header: 'Response Type',
    accessor: 'responseType'
  },
  {
    Header: 'Remarks',
    accessor: 'remarks'
  },
  {
    Header: 'User',
    accessor: 'userId'
  },
  {
    Header: 'Inserted Date',
    accessor: 'insertedDate'
  }
];
class Logs extends Component {
  state = {
    logs: {
      logs: []
    }
  };
  componentDidMount() {
    this.props.dispatch(fetchLogsById(this.props.rowId)).then(result => {
      if (result.error !== undefined && !result.error) {
        this.setState({ logs: result.result });
      }
    });
  }
  render() {
    const { logs } = this.state;
    return <PaginatedTable rows={logs.logs} columns={columns} />;
  }
}

export default connect()(Logs);
