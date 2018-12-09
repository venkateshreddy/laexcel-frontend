import React, { Component } from 'react';
import { Link } from 'react-router';
import { SplitButton, MenuItem } from 'react-bootstrap';
import ChangePassword from './changePassword';
import { SnackBar } from '../../components/SnackBar';

class HomeOptions extends Component {
  state = {
    openChangePass: false,
    showFeedback: false,
    feedback: ''
  };
  toggleChangePass = () =>
    this.setState({ openChangePass: !this.state.openChangePass });

  resetFeedbackState = () =>
    this.setState({
      showFeedback: false,
      feedback: ''
    });

  showFeedback = () => {
    this.setState({
      showFeedback: true,
      feedback: 'Password updated successfully'
    });
    setTimeout(() => {
      this.resetFeedbackState();
    }, 2000);
  };

  hideSnackBar = () => this.setState({ showFeedback: false, feedback: '' });

  render() {
    const { showFeedback, feedback } = this.state;
    return (
      <div>
        <SplitButton
          bsStyle="default"
          title={'Home'}
          // key={i}
          // id={`dropdown-basic-${i}`}
          style={{
            backgroundColor: 'white'
          }}
          onClick={() => this.props.router.push('/')}
        >
          <MenuItem eventKey="1" onClick={this.toggleChangePass}>
            Change Password
          </MenuItem>
          {/* <MenuItem eventKey="2">Another action</MenuItem>
                  <MenuItem eventKey="3" active>
                    Active Item
                  </MenuItem> */}
          <MenuItem divider />
          <MenuItem eventKey="2">
            <Link to="/login" onClick={this.props.logOut}>
              Logout
            </Link>
          </MenuItem>
        </SplitButton>
        <ChangePassword
          show={this.state.openChangePass}
          onHide={this.toggleChangePass}
          showFeedback={this.showFeedback}
        />
        <SnackBar
          open={showFeedback}
          onClose={this.hideSnackBar}
          msg={feedback}
        />
      </div>
    );
  }
}

export default HomeOptions;
