import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, SplitButton, MenuItem } from 'react-bootstrap';
import SideNav from 'react-simple-sidenav';
import Menu from '@material-ui/icons/Menu';
import { Link } from 'react-router';
import './NavBar.scss';
import './sideNavBar.css';
import { logOutClicked } from '../../actions/LoginAction';

class SideNavBar extends Component {
  constructor() {
    super();
    this.state = {
      showNav: false
    };
  }

  getOrganisation = e => {
    console.log('e.target', e.target.value);
  };
  logOut = () => {
    this.props.dispatch(logOutClicked());
  };

  hideNave = () => this.setState({ showNav: false });

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
            <Col lg={2} md={2} sm={2} className="header-logo np-left">
              <Link className="sidebar-logo" to="/">
                <img
                  className="sidebar-logo-image"
                  src="../../assets/images/navbar/student-portal-logo.png"
                  alt="Go to index"
                  title="Go to index"
                />
              </Link>
            </Col>
            <Col
              lg={4}
              md={4}
              sm={4}
              style={{
                marginTop: '15px',
                padding: '0px',
                color: 'white',
                textAlign: 'right'
              }}
            >
              {this.props.loggedInUser
                ? `Welcome ${this.props.loggedInUser.email}`
                : ''}
            </Col>
            <Col
              lg={2}
              md={2}
              sm={2}
              style={{
                marginTop: '15px',
                padding: '0px',
                textAlign: 'right'
              }}
            >
              <select onChange={this.getOrganisation}>
                <option value="">Select Organisation</option>
                <option value="ABC University">ABC University</option>
                <option value="XYZ Organisation">XYZ Organisation</option>
              </select>
            </Col>
            <Col
              lg={2}
              md={2}
              sm={2}
              style={{
                marginTop: '15px',
                padding: '0px',
                textAlign: 'center'
              }}
            >
              <select onChange={this.academicyear}>
                <option value="">Academic Year</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
              </select>
            </Col>
            <Col
              lg={1}
              md={1}
              sm={1}
              style={{
                marginTop: '8px',
                padding: '0px'
              }}
            >
              <SplitButton
                bsStyle="default"
                title={'Home'}
                // key={i}
                // id={`dropdown-basic-${i}`}
                style={{
                  backgroundColor: 'white'
                }}
                onClick={() => this.props.router.push('/')}
              >
                {/* <MenuItem eventKey="1"></MenuItem>
                  <MenuItem eventKey="2">Another action</MenuItem>
                  <MenuItem eventKey="3" active>
                    Active Item
                  </MenuItem> */}
                <MenuItem divider />
                <MenuItem eventKey="1">
                  <Link to="/login" onClick={this.logOut}>
                    Logout
                  </Link>
                </MenuItem>
              </SplitButton>
            </Col>
          </Row>
          <div>
            <SideNav
              showNav={this.state.showNav}
              onHideNav={this.hideNave}
              title="LaExcel Application"
              items={[
                <Link
                  to={'student'}
                  onClick={this.hideNave}
                  style={{
                    margin: '0px',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    padding: '22px'
                  }}
                >
                  Student
                </Link>,
                <Link
                  to={'organisation'}
                  onClick={this.hideNave}
                  style={{
                    margin: '0px',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    padding: '22px'
                  }}
                >
                  Organisation
                </Link>,
                <Link
                  to={'stateandcity'}
                  onClick={this.hideNave}
                  style={{
                    margin: '0px',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    padding: '22px'
                  }}
                >
                  State & City
                </Link>,
                <Link
                  to="branch"
                  onClick={this.hideNave}
                  style={{
                    margin: '0px',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    padding: '22px'
                  }}
                >
                  Branch
                </Link>,
                <Link
                  to="campus"
                  onClick={this.hideNave}
                  style={{
                    margin: '0px',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    padding: '22px'
                  }}
                >
                  Campus
                </Link>,
                <Link
                  to={'configuration'}
                  onClick={this.hideNave}
                  style={{
                    margin: '0px',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    padding: '22px'
                  }}
                >
                  Admin Configuration
                </Link>
              ]}
              navStyle={{
                maxWidth: '300px'
              }}
              titleStyle={{
                backgroundColor: '#0073a8',
                padding: '10px',
                fontSize: '30px',
                lineHeight: '50px'
              }}
              itemStyle={{
                backgroundColor: '#fff',
                marginLeft: '-40px',
                padding: '0px'
              }}
              itemHoverStyle={{ backgroundColor: '#ccd9ff' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser
});

export default connect(mapStateToProps)(SideNavBar);
