import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

class Error extends Component {
  redirectToHome = () => this.props.router.push('/');
  render() {
    return (
      <Row style={{ margin: '25% 28%' }}>
        <Col lg={12} md={12} sm={12}>
          <h4>
            <strong>
              <span style={{ marginRight: '9px' }}>
                <i className="fas fa-exclamation-triangle" />
              </span>
              Please select an organisation and academic year to continue!
            </strong>
          </h4>
        </Col>
        <Col lg={12} md={12} sm={12} className="text-center margin-top">
          <Button bsStyle="success" onClick={this.redirectToHome}>
            Home
          </Button>
        </Col>
      </Row>
    );
  }
}

export default Error;
