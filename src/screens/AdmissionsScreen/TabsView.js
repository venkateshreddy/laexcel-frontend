import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import Address from './tabs/Address';
import EducationalInformation from './tabs/EducationalInformation';
import OtherInformation from './tabs/OtherInformation';
import ProgramParticulars from './tabs/programparticulars';
import AdmissionInfo from './tabs/AdmissionInfo';
import GeneralInfo from './tabs/GeneralInfo';
import { fetchStates } from '../../actions/StateAction';
import { fetchCities } from '../../actions/CityActions';

class TabsView extends Component {
  constructor() {
    super();
    this.state = {
      key: 1
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchStates());
    this.props.dispatch(fetchCities());
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
            <Address
              previousTab={2}
              currentTab={3}
              nextTab={4}
              onChange={this.handleTabChange}
            />
          </Tab>
          <Tab eventKey={4} title="Educational Information">
            <EducationalInformation
              previousTab={3}
              currentTab={4}
              nextTab={5}
              onChange={this.handleTabChange}
            />
          </Tab>
          <Tab eventKey={5} title="Other Information">
            <OtherInformation />
          </Tab>
          <Tab eventKey={6} title="Program Particulars">
            <ProgramParticulars />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default connect()(TabsView);
