import React, { Component } from 'react';
import { Link } from 'react-router';
import { SplitButton, MenuItem } from 'react-bootstrap';
import ChangePassword from './changePassword';

class HomeOptions extends Component {
  state = {
    openChangePass: false
  };
  toggleChangePass = () =>
    this.setState({ openChangePass: !this.state.openChangePass });
  render() {
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
        />
      </div>
    );
  }
}

export default HomeOptions;
