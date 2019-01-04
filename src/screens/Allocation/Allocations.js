import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import UnassignedEnquiries from './TelecallerAllocation';
import AssignedEnquiries from './AssignedEnquiries';

class Allocations extends Component {
  state = {
    activeTab: 'ASSIGNED'
  };

  componentDidMount() {
    const { currentOrganisation } = this.props;
    if (!currentOrganisation.id) {
      // this.props.router.push('/');
    }
  }

  handleSelect = activeTab => {
    this.setState({ activeTab });
  };

  render() {
    return (
      <div>
        <Tabs
          activeKey={this.state.activeTab}
          onSelect={this.handleSelect}
          id="noanim-tab-example"
          mountOnEnter
        >
          <Tab eventKey={'UNASSIGNED'} title="Unassigned enquiries">
            <UnassignedEnquiries />
          </Tab>
          <Tab eventKey={'ASSIGNED'} title="Assigned enquiries">
            <AssignedEnquiries />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentOrganisation: state.organisations.currentOrganisation
});

export default connect(mapStateToProps)(Allocations);
