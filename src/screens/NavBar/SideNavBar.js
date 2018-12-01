import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import SideNav from 'react-simple-sidenav';
import Menu from '@material-ui/icons/Menu';
import { Link } from 'react-router';
import './NavBar.scss';
import './sideNavBar.css';

class SideNavBar extends Component {
  constructor() {
    super();
    this.state = {
      showNav: false
    };
  }
  render() {
    console.log('this.state', this.state);
    return (
      <div className="navbar HeaderBar">
        <div className="header-top-wrap row">
          <Row className="full-width">
            <Col lg={1} md={1} sm={1} className="header-logo np-left">
              <Menu
                onClick={() => this.setState({ showNav: true })}
                title="Open Menu"
              />
            </Col>
            <Col lg={3} md={3} sm={3} className="header-logo np-left">
              <Link className="sidebar-logo" to="/">
                <img
                  className="sidebar-logo-image"
                  src="../../assets/images/navbar/student-portal-logo.png"
                  alt="Go to index"
                  title="Go to index"
                />
              </Link>
            </Col>
            <Col lg={3} md={3} sm={3} style={{ float: 'right' }}>
              <Link to="/" className="help-wrap">
                <i
                  className="fas fa-home"
                  title="Home"
                  style={{ color: '#0073a8' }}
                />
              </Link>
            </Col>
          </Row>
          <div>
            <SideNav
              showNav={this.state.showNav}
              onHideNav={() => this.setState({ showNav: false })}
              title="Student Portal"
              items={[
                <Link to={'student'}>Student</Link>,
                <Link to={'organisation'}>Organisation</Link>,
                <Link to={'configuration'}>Admin Configuration</Link>,
                <Link to="branch">Branch</Link>,
                <Link to="campus">Campus</Link>
              ]}
              titleStyle={{ backgroundColor: '#0073a8' }}
              itemStyle={{
                backgroundColor: '#fff',
                marginLeft: '-40px'
              }}
              itemHoverStyle={{ backgroundColor: '#ccd9ff' }}
              // navStyle={{
              //   padding: '0px',
              //   margin: '0px auto',
              //   lineHeight: 'normal',
              //   textAlign: 'center',
              //   width: '85%',
              //   display: '-ms-flexbox',
              //   overflow: 'hidden',
              //   WebkitBoxFlex: '0',
              //   MsFlex: '0 0 100%',
              //   flex: '0 0 100%',
              //   WebkitBoxPack: 'justify',
              //   MsFlexPack: 'justify',
              //   justifyContent: 'space-between'
              // }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SideNavBar;
