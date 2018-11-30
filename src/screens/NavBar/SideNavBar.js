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
    return (
      <div className="navbar HeaderBar" style={{ backgroundColor: '#0073a8' }}>
        <div className="header-top-wrap row">
          <Row className="full-width">
            <Col
              lg={1}
              md={1}
              sm={1}
              style={{
                marginTop: '14px',
                padding: '0px',
                color: 'white'
              }}
            >
              <Menu
                onClick={() => this.setState({ showNav: true })}
                title="Open Menu"
              />
            </Col>
            <Col lg={8} md={8} sm={8} className="header-logo np-left">
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
                  style={{ color: 'white', float: 'right' }}
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
                <Link
                  to={'student'}
                  onClick={() => this.setState({ showNav: false })}
                >
                  Student
                </Link>,
                <Link
                  to={'organisation'}
                  onClick={() => this.setState({ showNav: false })}
                >
                  Organisation
                </Link>,
                <Link
                  to={'configuration'}
                  onClick={() => this.setState({ showNav: false })}
                >
                  Admin Configuration
                </Link>
              ]}
              titleStyle={{ backgroundColor: '#0073a8' }}
              itemStyle={{
                backgroundColor: '#fff',
                marginLeft: '-40px'
              }}
              itemHoverStyle={{ backgroundColor: '#ccd9ff' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SideNavBar;
