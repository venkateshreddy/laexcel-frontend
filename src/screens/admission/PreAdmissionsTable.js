import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { PaginatedTable } from '../../components/Table';
import { fetchPreAdmissionData } from '../../actions/AdmissionAction';

const columns = [
  { Header: 'Program', accessor: 'Program' },
  { Header: 'StudentName', accessor: 'StudentName' },
  { Header: 'ContactNumber', accessor: 'ContactNumber' },
  { Header: 'Email', accessor: 'Email' }
];

class PreAdmissionsTable extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPreAdmissionData());
  }
  render() {
    const { admissions } = this.props;
    console.log('admissions', admissions);
    return (
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <div className="browse-wrap padding">
            <Col lg={12} md={12} sm={12} xs={12}>
              <PaginatedTable rows={admissions} columns={columns} />
            </Col>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  admissions: state.preAdmissions.admissions
});

export default connect(mapStateToProps)(PreAdmissionsTable);
