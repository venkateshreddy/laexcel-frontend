import React, { Component } from 'react';
// import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './LandingPage.scss';
import './LandingPageHover.css';
// import { navbarOptions } from '../NavBar/navBarOptions';

class LandingPage extends Component {
  renderTiles = MENULIST =>
    MENULIST.map(item => (
      <div className="tile-flext-wrap" key={item.id}>
        <div className="landing-panel landingPageTile-panel">
          <Link to={item.routing}>
            <div className="candidate-pic tile-avatar dfdsf">
              <img
                className="sidebar-logo-image avatar"
                src={item.icon}
                alt=""
              />
            </div>
            <div className="tile-body" style={{ marginTop: '10px' }}>
              <span style={{ color: 'white' }}>{item.name}</span>
            </div>
          </Link>
          <div className="tile-overlay">{item.description}</div>
        </div>
      </div>
    ));
  render() {
    // const { menu } = this.props;
    return (
      <div className="landing-page-wrapper">
        {/* {this.renderTiles(menu)} */}
        <div>
          This is the landing page of the application: use the side navigation
          bar to navigate through pages and run the application
        </div>
        {/* <div className="tile-flext-wrap">
          <div className="landing-panel">
            <Link to="/dashboard">
              <p>
                <img
                  src="./assets/images/dashboard/maintain-contact-cards.svg"
                  alt="Forbidden"
                />
              </p>
              <p>Maintain contact cards</p>
            </Link>
          </div>
        </div>

        <div className="tile-flext-wrap">
          <div className="landing-panel">
            <Link to="/businessprocess">
              <p>
                <img
                  src="./assets/images/dashboard/add-process.svg"
                  alt="Forbidden"
                />
              </p>
              <p>Add process</p>
            </Link>
          </div>
        </div>

        <div className="tile-flext-wrap">
          <div className="landing-panel">
            <Link to="/ppt/upload">
              <p className="text-center">
                <img
                  src="./assets/images/dashboard/upload-template.svg"
                  alt="Forbidden"
                />
              </p>
              <p>Upload template</p>
            </Link>
          </div>
        </div>

        <div className="tile-flext-wrap">
          <div className="landing-panel">
            <Link to="/carddesign">
              <p className="text-center">
                <img
                  src="./assets/images/dashboard/ppt-design.svg"
                  alt="Forbidden"
                />
              </p>
              <p>PPT design</p>
            </Link>
          </div>
        </div>
        <div className="tile-flext-wrap">
          <div className="landing-panel">
            <Link to="/UserRoleManager">
              <p className="text-center">
                <img
                  src="./assets/images/dashboard/user-role-manager.svg"
                  alt="Forbidden"
                />
              </p>
              <p>User role manager</p>
            </Link>
          </div>
        </div>
        <div className="tile-flext-wrap">
          <div className="landing-panel">
            <Link to="/MandatoryFields">
              <p className="text-center">
                <img
                  src="./assets/images/dashboard/mandatory-fields.svg"
                  alt="Forbidden"
                />
              </p>
              <p>Mandatory fields</p>
            </Link>
          </div>
        </div>
        <div className="tile-flext-wrap">
          <div className="landing-panel">
            <Link to="/uploadexcel">
              <p className="text-center">
                <img
                  src="./assets/images/dashboard/upload-excel.svg"
                  alt="Forbidden"
                />
              </p>
              <p>Upload excel</p>
            </Link>
          </div>
        </div>
        <div className="tile-flext-wrap">
          <div className="landing-panel">
            <Link to="/ProcessDataAdd">
              <p className="text-center">
                <img
                  src="./assets/images/dashboard/create-contact-cards.svg"
                  alt="Forbidden"
                />
              </p>
              <p>Create contact cards</p>
            </Link>
          </div>
        </div>
        <div className="tile-flext-wrap">
          <div className="landing-panel">
            <Link to="/EditProcessData">
              <p className="text-center">
                <img
                  src="./assets/images/dashboard/maintain-contact-cards.svg"
                  alt="Forbidden"
                />
              </p>
              <p>Maintain contact cards</p>
            </Link>
          </div>
        </div> */}
        {/* <div className="tile-flext-wrap">
          <div className="landing-panel">
            <a
              // href="https://helpcontactcards.mcbitsstech.com/#/Dashboard/TableView"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => alert('Help Under Development')}
            >
              <p className="text-center">
                <img src="./assets/images/dashboard/help.svg" alt="help" />
              </p>
              <p>Help</p>
            </a>
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menu: state.login.menu
});

export default connect(mapStateToProps)(LandingPage);
