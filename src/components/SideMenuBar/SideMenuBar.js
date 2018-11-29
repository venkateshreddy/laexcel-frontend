import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router';
import './SideMenuBar.scss';

class SideMenuBar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-menu" >
          <ul>
            <li>
              <Link className="transition sidebar-item  sidebar-item--active " to="/">
                <div className="sidebar-item-icon sidebar-icon-home" />
                <span className="sidebar-title">Home</span>
              </Link>
            </li>
          </ul>
          <div className="sidebar-toggler js-sidebar-toggle">
            <svg enableBackground="new 0 0 32 32" height="32px" version="1.1" viewBox="0 0 32 32" width="32px" space="preserve" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"><path d="M24.291,14.276L14.705,4.69c-0.878-0.878-2.317-0.878-3.195,0l-0.8,0.8c-0.878,0.877-0.878,2.316,0,3.194  L18.024,16l-7.315,7.315c-0.878,0.878-0.878,2.317,0,3.194l0.8,0.8c0.878,0.879,2.317,0.879,3.195,0l9.586-9.587  c0.472-0.471,0.682-1.103,0.647-1.723C24.973,15.38,24.763,14.748,24.291,14.276z" fill="#175d9d" /></svg>
          </div>

        </nav>
      </div>
    );
  }
}

export default SideMenuBar;
