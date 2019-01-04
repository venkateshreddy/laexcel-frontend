import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './Telecaller.scss';

class MoreInfo extends Component {
  render() {
    const { data } = this.props;
    let status = '';
    status = data.isAcceptedByEmp ? 'Accepted' : 'Rejected';
    if (data.isAcceptedByEmp === null) {
      status = 'Pending';
    }
    return (
      <Row>
        <Col lg={6} md={6} sm={6} style={{ borderRight: '1px solid' }}>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Date of Enquiry
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.createdAt}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Source Type
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.sourceType}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Agency Code
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.agencyCode}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Type
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.type}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Program
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.Program}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Student Name
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.StudentName}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Email
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.Email}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Contact Number
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.ContactNumber}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Status
            </Col>
            <Col lg={6} md={6} sm={6}>
              {status}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Response Type
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.responseType}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Remarks
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.remarks}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Demo Class Date
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.demoClassDate}
            </Col>
          </Row>
        </Col>
        <Col lg={6} md={6} sm={6}>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Age or DoB
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.others.ageOrDoB}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Address Line 1
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.others.line1}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Address Line 2
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.others.line2}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Address Line 3
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.others.line3}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              City
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.others.city}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              State
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.others.state}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Pincode
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.others.pincode}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Wether In Employment
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.others.wetherInEmployment}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Employer Particulars
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.others.employerParticulars}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Referred By
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.others.referredBy}
            </Col>
          </Row>
          <Row className="margin-5">
            <Col lg={6} md={6} sm={6} className="text-strong">
              Admission Number
            </Col>
            <Col lg={6} md={6} sm={6}>
              {data.others.admissionNumber}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default MoreInfo;
