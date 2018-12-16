import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
// import SideNav from 'react-simple-sidenav';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// import Menu from '@material-ui/icons/Menu';
import { Link } from 'react-router';
import './NavBar.scss';
import './react-sidenav.css';
import './sideNavBar.css';
import { logOutClicked } from '../../actions/LoginAction';
import HomeOptions from './homeOptions';

class SideNavBar extends Component {
  constructor() {
    super();
    this.state = {
      showNav: false
    };
  }

  onToggleNave = () =>
    this.setState(prevState => ({ showNav: !prevState.showNav }));
  getOrganisation = e => {
    console.log('e.target', e.target.value);
  };
  logOut = () => {
    this.props.dispatch(logOutClicked());
  };

  hideNave = () => this.setState({ showNav: false });

  render() {
    const { currentOrganisation } = this.props;
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
              {/* <Menu
                onClick={() => this.setState({ showNav: true })}
                title="Open Menu"
              /> */}
            </Col>
            <Col lg={2} md={2} sm={2} className="header-logo np-left">
              <Link className="sidebar-logo" to="/">
                <img
                  className="sidebar-logo-image"
                  src="../../assets/images/navbar/student-portal-logo.png"
                  alt="Go to index"
                  title="Go to index"
                />
                <span
                  style={{
                    color: 'white',
                    position: 'relative',
                    top: '-8px'
                  }}
                >
                  (beta)
                </span>
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
                textAlign: 'center',
                color: 'white'
              }}
            >
              {currentOrganisation.orgName ? (
                <Fragment>
                  <label>{currentOrganisation.orgName}</label>
                  <Link
                    to="/"
                    style={{
                      padding: '0px 5px',
                      color: 'white'
                    }}
                  >
                    <i className="fas fa-exchange-alt" />
                  </Link>
                </Fragment>
              ) : (
                <label>None</label>
              )}
            </Col>
            {/* <Col
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
            </Col> */}
            <Col
              lg={1}
              md={1}
              sm={1}
              style={{
                marginTop: '8px',
                padding: '0px'
              }}
            >
              <HomeOptions logOut={this.logOut} />
            </Col>
          </Row>
          <div>
            <SideNav
              // showNav={this.state.showNav}
              // onHideNav={this.hideNave}
              expanded={this.state.showNav}
              onSelect={this.hideNave}
              onToggle={this.onToggleNave}
              // title="LaExcel Application"
              // items={[
              //   <Link
              //     to={'student'}
              //     onClick={this.hideNave}
              //     style={{
              //       margin: '0px',
              //       display: 'block',
              //       width: '100%',
              //       height: '100%',
              //       padding: '22px'
              //     }}
              //   >
              //     Student
              //   </Link>,
              //   <Link
              //     to={'organisation'}
              //     onClick={this.hideNave}
              //     style={{
              //       margin: '0px',
              //       display: 'block',
              //       width: '100%',
              //       height: '100%',
              //       padding: '22px'
              //     }}
              //   >
              //     Organisation
              //   </Link>,
              //   <Link
              //     to={'stateandcity'}
              //     onClick={this.hideNave}
              //     style={{
              //       margin: '0px',
              //       display: 'block',
              //       width: '100%',
              //       height: '100%',
              //       padding: '22px'
              //     }}
              //   >
              //     State & City
              //   </Link>,
              //   <Link
              //     to="branch"
              //     onClick={this.hideNave}
              //     style={{
              //       margin: '0px',
              //       display: 'block',
              //       width: '100%',
              //       height: '100%',
              //       padding: '22px'
              //     }}
              //   >
              //     Branch
              //   </Link>,
              //   <Link
              //     to="campus"
              //     onClick={this.hideNave}
              //     style={{
              //       margin: '0px',
              //       display: 'block',
              //       width: '100%',
              //       height: '100%',
              //       padding: '22px'
              //     }}
              //   >
              //     Campus
              //   </Link>,
              //   <Link
              //     to="room"
              //     onClick={this.hideNave}
              //     style={{
              //       margin: '0px',
              //       display: 'block',
              //       width: '100%',
              //       height: '100%',
              //       padding: '22px'
              //     }}
              //   >
              //     Room
              //   </Link>,
              //   <Link
              //     to="building"
              //     onClick={this.hideNave}
              //     style={{
              //       margin: '0px',
              //       display: 'block',
              //       width: '100%',
              //       height: '100%',
              //       padding: '22px'
              //     }}
              //   >
              //     Building
              //   </Link>,
              //   <Link
              //     to={'configuration'}
              //     onClick={this.hideNave}
              //     style={{
              //       margin: '0px',
              //       display: 'block',
              //       width: '100%',
              //       height: '100%',
              //       padding: '22px'
              //     }}
              //   >
              //     Admin Configuration
              //   </Link>
              // ]}
              // navStyle={{
              //   maxWidth: '300px'
              // }}
              // titleStyle={{
              //   backgroundColor: '#0073a8',
              //   padding: '10px',
              //   fontSize: '30px',
              //   lineHeight: '50px'
              // }}
              // itemStyle={{
              //   backgroundColor: '#fff',
              //   marginLeft: '-40px',
              //   padding: '0px'
              // }}
              // itemHoverStyle={{ backgroundColor: '#ccd9ff' }}
            >
              <SideNav.Toggle />
              <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                  <NavIcon>
                    <Link to="/">
                      <i className="fas fa-home fa-fw" />
                    </Link>
                  </NavIcon>
                  <NavText>
                    <Link to="/" className="margin-left10">
                      Home
                    </Link>
                  </NavText>
                </NavItem>
                <NavItem eventKey="masterDBMaintenance">
                  <NavIcon>
                    <i className="fa fa-database" />
                  </NavIcon>
                  <NavText>
                    Master DB Maintenance
                    <i className="fas fa-sort-down dropdown-arrow cntrl-arrow" />
                    <i className="fas fa-sort-up dropup-arrow cntrl-arrow" />
                  </NavText>
                  <NavItem eventKey="EmployeeRegister">
                    <NavText>
                      <Link to={'/EmployeeRegister'} className="margin-left10">
                        Employee
                      </Link>
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="organisation">
                    <NavText>
                      <Link to={'organisation'} className="margin-left10">
                        Organisation
                      </Link>
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="program">
                    <NavText>
                      <Link to={'/program'} className="margin-left10">
                        Program
                      </Link>
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="course">
                    <NavText>
                      <Link to={'/course'} className="margin-left10">
                        Course
                      </Link>
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="batch">
                    <NavText>
                      <Link to={'/batch'} className="margin-left10">
                        Batch
                      </Link>
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="courseduration">
                    <NavText>
                      <Link to={'/CourseDuration'} className="margin-left10">
                        Course Duration
                      </Link>
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="definefeecode">
                    <NavText>
                      <Link to={'/DefineFeeCode'} className="margin-left10">
                        Define Fee Code
                      </Link>
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="definefeestructure">
                    <NavText>
                      <Link to={'/DefineFeeStructure'} className="margin-left10">
                        Define Fee Structure
                      </Link>
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="stateandcity">
                    <NavText>
                      <Link to={'stateandcity'} className="margin-left10">
                        State & City
                      </Link>
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="branch">
                    <NavText>
                      <Link to={'branch'} className="margin-left10">
                        Branch
                      </Link>
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="campus">
                    <NavText>
                      <Link to={'campus'} className="margin-left10">
                        Campus
                      </Link>
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="room">
                    <NavText>
                      <Link to={'room'} className="margin-left10">
                        Room
                      </Link>
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="building">
                    <NavText>
                      <Link to={'building'} className="margin-left10">
                        Building
                      </Link>
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="sourceandagency">
                    <NavText>
                      <Link to={'sourceandagency'} className="margin-left10">
                        Source & Agency
                      </Link>
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="telecallerAllocation">
                    <NavText>
                      <Link
                        to={'telecallerAllocation'}
                        className="margin-left10"
                      >
                        Telecaller Allocation
                      </Link>
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="telecallerAcceptance">
                    <NavText>
                      <Link
                        to={'telecallerAcceptance'}
                        className="margin-left10"
                      >
                        Telecaller Acceptance
                      </Link>
                    </NavText>
                  </NavItem>
                </NavItem>
                <NavItem eventKey="configuration">
                  <NavIcon>
                    <i className="fa fa-lock" />
                  </NavIcon>
                  <NavText>
                    <Link to={'configuration'} className="margin-left10">
                      Admin Configuration
                    </Link>
                  </NavText>
                </NavItem>
                <NavItem eventKey="preAdmission">
                  <NavIcon>
                    <i className="fa fa-edit" />
                  </NavIcon>
                  <NavText>
                    <Link to={'preAdmission'} className="margin-left10">
                      Pre Admission
                    </Link>
                  </NavText>
                </NavItem>
              </SideNav.Nav>
            </SideNav>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser,
  currentOrganisation: state.organisations.currentOrganisation
});

export default connect(mapStateToProps)(SideNavBar);
