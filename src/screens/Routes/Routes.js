import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Layout from '../Layout/Layout';
// import Home from '../Home/Home';
import LandingPage from '../LadingPage/LandingPage';
import Login from '../Login/Login';
import UserRoleManager from '../UserRoleManager/UserRoleManager';
import Registration from '../Registration/Registration';

import Student from '../Student/Student';
import Organisation from '../Organisation/Organisation';
import PreAdmission from '../admission/PreAdmission';
import ConfigurationInitialScreen from '../Configuration/ConfigurationInitialScreen';
import StateAndCity from '../StateAndCity/State&City';
import Branch from '../Branch/Branch';
import Campus from '../Campus/Campus';
import Room from '../Room/Room';
import Building from '../Building/Building';

class Routes extends React.Component {
  render() {
    // console.log('routesMenu', this.props);
    return (
      <Router history={hashHistory}>
        <Route path="/login" name="login" component={Login} />
        <Route
          path="/registration"
          name="registration"
          component={Registration}
        />
        <Route path="/" component={Layout}>
          <IndexRoute component={LandingPage} />

          <Route path="/student" name="student" component={Student} />
          <Route
            path="/organisation"
            name="organisation"
            component={Organisation}
          />
          <Route
            path="/stateandcity"
            name="stateandcity"
            component={StateAndCity}
          />
          <Route
            path="/configuration"
            name="configuration"
            component={ConfigurationInitialScreen}
          />
          <Route
            path="/preAdmission"
            name="preAdmission"
            component={PreAdmission}
          />
          <Route
            path="/user/management"
            name="usermanagement"
            component={UserRoleManager}
          />
          <Route path="/branch" name="Branch" component={Branch} />
          <Route path="/campus" name="Campus" component={Campus} />
          <Route path="/room" name="Room" component={Room} />
          <Route path="/building" name="Building" component={Building} />
        </Route>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  routesMenu: state.login.routesMenu
});

export default connect(mapStateToProps)(Routes);
