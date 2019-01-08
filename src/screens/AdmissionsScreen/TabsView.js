import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Address from './tabs/Address';
import EducationalInformation from './tabs/EducationalInformation';
import AdmissionInfo from './tabs/AdmissionInfo';
import GeneralInfo from './tabs/GeneralInfo';

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
          <Tab eventKey={1} title="Admission Information">
            <AdmissionInfo
              previousTab={null}
              currentTab={1}
              nextTab={2}
              onChange={this.handleTabChange}
            />
          </Tab>
          <Tab eventKey={2} title="General Information">
            <GeneralInfo
              previousTab={1}
              currentTab={2}
              nextTab={3}
              onChange={this.handleTabChange}
            />
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
