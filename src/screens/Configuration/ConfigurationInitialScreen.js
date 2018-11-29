import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { SnackBar } from '../../components/SnackBar';
import { handleSnackBar } from '../../actions/DashboardAction';
import StateAndCity from './State&City';

class ConfigurationInitialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 1
    };
  }

  handleSelect = key => {
    this.setState({ key });
  };

  render() {
    return (
      <div className="position-search-wrap">
        <div className="padding">
          <Tabs
            activeKey={this.state.key}
            onSelect={this.handleSelect}
            id="controlled-tab-example"
          >
            <Tab eventKey={1} title="State &amp; City">
              <StateAndCity />
            </Tab>
            {/* <Tab eventKey={2} title="Devices">
              <div className="browse-wrap padding">
                <Devices />
              </div>
            </Tab>
            <Tab eventKey={3} title="Materials">
              <div className="browse-wrap padding">
                <Materials />
              </div>
            </Tab> */}
          </Tabs>
        </div>
        <SnackBar
          open={this.props.snackBarOpen}
          onClose={() =>
            this.props.dispatch(
              handleSnackBar({ snackBarOpen: false, snackBarMsg: '' })
            )
          }
          msg={this.props.snackBarMsg}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  snackBarOpen: state.dashboard.snackBarOpen,
  snackBarMsg: state.dashboard.snackBarMsg
});
export default connect(mapStateToProps)(ConfigurationInitialScreen);
