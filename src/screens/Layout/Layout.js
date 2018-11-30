import React from 'react';
import { connect } from 'react-redux';
import SideNavBar from '../NavBar/SideNavBar';
import './Layout.scss';
import ErrorPage from './error';

class Layout extends React.Component {
  render() {
    if (this.props.loggedInUser !== null) {
      return (
        <div>
          <main className="app">
            <div className="app-wrapper">
              <SideNavBar />
              <div
                className="app-container"
                style={{
                  width: '85%',
                  marginLeft: '15vh'
                }}
              >
                {this.props.children}
              </div>
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
