import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import {
  fetchOrganisations,
  setCurrentOrganisation
} from '../../actions/OrganisationActions';

class Organizations extends Component {
  componentDidMount() {
    this.props.dispatch(fetchOrganisations());
  }

  setCurrentOrganisation = ({ id, orgName }) => () => {
    this.props.dispatch(setCurrentOrganisation({ id, orgName }));
  };

  getOrganizationsList = organisations => {
    const { currentOrganisation } = this.props;
    return organisations.map(organisation => (
      <ListGroupItem
        key={organisation.id}
        active={organisation.id === currentOrganisation.id}
        onClick={this.setCurrentOrganisation(organisation)}
      >{`${organisation.orgName}, ${organisation.state.stateName}, ${
          organisation.city.cityName
        }`}</ListGroupItem>
    ));
  };

  render() {
    const { organisations } = this.props;
    return (
      <ListGroup style={{ width: '80%' }}>
        {this.getOrganizationsList(organisations)}
      </ListGroup>
    );
  }
}

const mapStateToProps = state => ({
  organisations: state.organisations.organisations,
  currentOrganisation: state.organisations.currentOrganisation
});

export default connect(mapStateToProps)(Organizations);
