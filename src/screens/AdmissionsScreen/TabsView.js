import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Address from './tabs/Address';
import EducationalInformation from './tabs/EducationalInformation';

class TabsView extends Component {
  constructor() {
    super();
    this.state = {
      key: 1
    };
  }

  handleTabChange = key => {
    this.setState({ key });
  };

  render() {
    return (
      <div>
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleTabChange}
          id="controlled-tab-example"
        >
          <Tab eventKey={1} title="Tab 1">
            this is tab 1
          </Tab>
          <Tab eventKey={2} title="Tab 2">
            this is tab 2
          </Tab>
          <Tab eventKey={3} title="Address">
            <Address />
          </Tab>
          <Tab eventKey={4} title="Educational Information">
            <EducationalInformation />
          </Tab>
          <Tab eventKey={5} title="Tab 5">
            this is tab 5
          </Tab>
          <Tab eventKey={6} title="Tab 6">
            this is tab 6
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default TabsView;
