import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import './NavBar.scss';
import DashboardSearchBar from '../Dashboard/dashboardSearchbar';
import {
  // sendSearchResult,
  toggleGridView
} from '../../actions/DashboardAction';
import { logOutClicked } from '../../actions/LoginAction';
// import { navbarOptions } from './navBarOptions';
// import DashboardToggleView from '../Dashboard/dashboardToggleView';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStr: ''
    };
    this.setGlobalSearch = this.setGlobalSearch.bind(this);
    this.redirect = this.redirect.bind(this);
  }
  setGlobalSearch(evt) {
    this.setState({ searchStr: evt.target.value });
  }
  redirect(evt) {
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (this.state.searchStr && charCode === 13) {
      this.props.dispatch({
        type: 'SET_GLOBAL_SEARCH',
        string: this.state.searchStr
      });
      hashHistory.push('/browse');
    }
  }
  // searchResult = (data, obj) => {
  //   this.props.dispatch(sendSearchResult(data, obj));
  // };
  toggleGridView = () => {
    console.log('toggleview', this.props.toggleGridView);
    this.props.dispatch(toggleGridView(!this.props.toggleGridView));
  };
  populateNavOptions = MENULIST =>
    MENULIST.map(item => (
      <li key={item.id}>
        <Link to={item.routing}>{item.name}</Link>
      </li>
    ));

  logOut = () => {
    this.props.dispatch(logOutClicked());
  };

  render() {
    // const { animalSpecies } = this.props;
    return (
      <div className="navbar navigation">
        <div className="header-top-wrap row">
          <Row className="full-width">
            <Col lg={3} md={3} sm={3} className="header-logo np-left">
              {' '}
              <Link className="sidebar-logo" to="/">
                <img
                  className="sidebar-logo-image"
                  src="../../assets/images/navbar/animalLab-logo.png"
                  alt="Go to index"
                  title="Go to index"
                />
              </Link>
            </Col>
            <Col
              lg={6}
              md={6}
              sm={6}
              // className="header-right padding-top text-right np-right"
            >
              <div style={{ marginTop: '8px' }}>
                <DashboardSearchBar
                  className="search-box"
                  // animalSpecies={animalSpecies}
                  // searchResult={this.searchResult}
                />
              </div>
            </Col>
            <Col lg={3} md={3} sm={3}>
              <div className="text-right home-logout">
                {/* <DashboardToggleView toggleView={this.toggleGridView} /> */}
                {/* {this.populateNavOptions(navbarOptions)} */}
                <ul>
                  <li>
                    <Link to="/" className="help-wrap">
                      <i className="fas fa-home" title="Home" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      onClick={this.logOut}
                      className="help-wrap"
                    >
                      <i className="fas fa-sign-out-alt" title="Logout" />
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // processData: state.processReducer.processData,
    // animalSpecies: state.animalsReducer.animalSpecies,
    toggleGridView: state.dashboard.toggleGridView
  };
}

export default connect(mapStateToProps)(NavBar);
