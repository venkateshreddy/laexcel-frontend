import React from 'react';
import { connect } from 'react-redux';
// import { Col } from 'react-bootstrap';
// import SideMenuBar from '../SideMenuBar/SideMenuBar';
import NavBar from '../NavBar/NavBar';
import ErrorPage from './error';
import './Layout.scss';

class Layout extends React.Component {
  render() {
    if (this.props.loggedInUser !== null) {
      return (
        <div>
          {/* <SideMenuBar /> */}
          <main className="app">
            <div className="app-wrapper">
              <NavBar router={this.props.router} />
              <div className="app-container">{this.props.children}</div>
            </div>
          </main>
        </div>
      );
    }
    return <ErrorPage router={this.props.router} />;
  }
}
function mapStateToProps(state) {
  return {
    locale: state.locale,
    loggedInUser: state.login.loggedInUser
  };
}

export default connect(mapStateToProps)(Layout);
