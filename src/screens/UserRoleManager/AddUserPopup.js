import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
// import Select from 'react-select';
import roles from '../../data/roles.json';
import { TextInput } from '../../components/Input';
import { Select } from '../../components/Dropdown';
import Button from '../../components/Button/Button';
import { createUser } from '../../actions/UserActions';

class AddUserPopup extends Component {
  constructor() {
    super();
    this.state = {
      typedName: '',
      typedEmail: '',
      typedPass: '',
      confirmPassword: '',
      selectedOption: [],
      otherOptions: []
    };
    this.submitAddForm = this.submitAddForm.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }
  componentWillMount() {
    const otherOptions = [];
    let otherOptionsObj = {};
    roles.roles.map(r => {
      // staticOptionObj = {};
      if (r.value === 'Reader') {
        // do nothing
      } else {
        otherOptionsObj = r;
        otherOptions.push(otherOptionsObj);
      }
      return null;
    });
    this.setState({ otherOptions });
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  closePopup(result) {
    if (result.error) {
      alert(result.message);
    } else {
      this.props.closePopup();
    }
  }
  submitAddForm() {
    let isValid = true;
    let message = 'All fields are mandatory';
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
    if (this.state.typedName === '') {
      isValid = false;
    } else if (this.state.typedEmail === '') {
      isValid = false;
    } else if (!re.test(String(this.state.typedEmail).toLowerCase())) {
      isValid = false;
      message = 'Email is invalid';
    } else if (this.state.typedPass === '') {
      isValid = false;
    } else if (this.state.typedPass !== '' && this.state.typedPass.length < 6) {
      isValid = false;
      message = 'Password should be at least 6 characters long.';
    } else if (this.state.confirmPassword === '') {
      isValid = false;
    } else if (this.state.typedPass !== this.state.confirmPassword) {
      isValid = false;
      message = 'Please re-enter the password correctly';
    } else if (this.state.selectedOption.length === 0) {
      isValid = false;
    }
    if (!isValid) {
      alert(message);
    } else {
      const rolesArr = [];
      rolesArr.push(this.state.selectedOption.value);
      this.props.dispatch(
        createUser(
          {
            name: this.state.typedName,
            email: this.state.typedEmail,
            password: this.state.typedPass,
            roles: rolesArr
          },
          this.closePopup
        )
      );
    }
  }
  render() {
    const { selectedOption } = this.state;
    return (
      <div className="padding">
        <Row>
          <Col lg={12} md={12} sm={12} xs={12} className="np-right">
            <TextInput
              placeholder="Full Name"
              label="Full Name:"
              onChange={e => {
                this.setState({ typedName: e.target.value });
              }}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={12} className="np-right">
            <TextInput
              placeholder="email"
              label="Email:"
              onChange={e => {
                this.setState({ typedEmail: e.target.value });
              }}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={12} className="np-right">
            <TextInput
              placeholder="Password"
              type="password"
              label="Password:"
              onChange={e => {
                this.setState({ typedPass: e.target.value });
              }}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={12} className="np-right">
            <TextInput
              placeholder="Confirm Password"
              type="password"
              label="Confirm Password:"
              onChange={e => {
                this.setState({ confirmPassword: e.target.value });
              }}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={12} className="np-right">
            <Select
              id="design"
              className="custom-select"
              placeholder="Choose Role"
              label="Roles:"
              onChange={this.handleChange}
              options={this.state.otherOptions}
              value={selectedOption}
              multi={false}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={12} className="text-center">
            <Button
              bsStyle="primary"
              bsSize="small"
              className="custom-button"
              onClick={this.submitAddForm}
              variant="contained"
              value="Submit"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect()(AddUserPopup);
