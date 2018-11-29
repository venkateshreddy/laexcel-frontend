import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router';
// import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import './NavBar.scss';

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="sidebar-logo-block">
          <Link className="sidebar-logo" to="/">
            <img
              className="sidebar-logo-image"
              src="../../assets/images/sidebar/ingenesis-logo.png"
              alt="Go to index"
              title="Go to index"
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default NavBar;
