import React from 'react';
import { connect } from 'react-redux';
import Dashboard from '../Dashboard/Dashboard';
import './Home.scss';
import ErrorPage from '../../components/Layout/error';

class Home extends React.Component {
  render() {
    const { loggedInUser } = this.props;
    if (loggedInUser !== null) {
      return (
        <div className="landing-wrapper">
          <div className="landing-col col-lg-12 col-md-12 no-padding">
            <Dashboard />
          </div>
        </div>
      );
    }
    return <ErrorPage router={this.props.router} />;
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser
});

export default connect(mapStateToProps)(Home);
