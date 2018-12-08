import React, { Component } from 'react';
// import { Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import './LandingPage.scss';
import './LandingPageHover.css';
// import { navbarOptions } from '../NavBar/navBarOptions';
import Organizations from './Organizations';

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page-wrapper">
        <Organizations />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menu: state.login.menu
});

export default connect(mapStateToProps)(LandingPage);
