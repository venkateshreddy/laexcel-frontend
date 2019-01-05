import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import UnassignedEnquiries from './TelecallerAllocation';
import AssignedEnquiries from './AssignedEnquiries';

class Allocations extends Component {
  state = {
    activeTab: 'UNASSIGNED'
  };

  componentDidMount() {
    const { currentOrganisation, currentAcademicYear } = this.props;
    if (!currentOrganisation.id || !currentAcademicYear) {
      this.props.router.push('/error');
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
  currentOrganisation: state.organisations.currentOrganisation,
  currentAcademicYear: state.academicYears.currentAcademicYear
});

export default connect(mapStateToProps)(Allocations);
