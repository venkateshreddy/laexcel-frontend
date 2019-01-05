import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import './LandingPage.scss';
import './LandingPageHover.css';
// import { navbarOptions } from '../NavBar/navBarOptions';
import Organizations from './Organizations';
import AcademicYears from './AcademicYears';

class LandingPage extends Component {
  render() {
    return (
      <Row>
        <Col lg={8} md={8} sm={8}>
          <Organizations />
        </Col>
        <Col lg={4} md={4} sm={4}>
          <AcademicYears />
        </Col>
        {/* <div className="landing-page-wrapper">

      </div> */}
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  menu: state.login.menu
});

export default connect(mapStateToProps)(LandingPage);
