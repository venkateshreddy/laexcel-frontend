import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { PropagateLoader } from 'react-spinners';
import { css } from '@emotion/core';
// import { Link } from 'react-router';
// import TextField from '../../components/TextField/TextField';
// import Button from '../../components/Button/Button';
import { submitLogin } from '../../actions/LoginAction';
import './Login.scss';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
      showLoader: false,
      diplayMsg: ''
    };
  }

  checkDisabled = name => e => {
    this.setState({ [name]: e.target.value });
    if (e.target.value === '') {
      this.setState({ disabled: true });
    }
  };

  submitLogin = () => {
    const loginObj = { email: this.state.email, password: this.state.password };
    this.setState({ showLoader: true });
    this.props.dispatch(submitLogin(loginObj, this.loginFailed));
  };
  loginFailed = result => {
    if (result.error) {
      this.setState({
        diplayMsg: result.message
      });
    }
    this.setState({ showLoader: false });
  };
  render() {
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    position: relative;
    left: 47%;
    top: 48%;
    z-index: 999;
    `;
    const state = { ...this.state };
    if (state.email !== '' && state.password !== '') {
      state.disabled = false;
    }
    const props = { ...this.props };
    if (props.loggedInUser !== null) {
      this.props.router.push('/');
    }

    return (
      <div className="login-wrapBG">
        <div className="body" />
        <div className="grad" />
        <div className="header">
          <div>
            La Excellence
            <span>Application</span>
          </div>
          <span style={{ color: 'white' }}>(beta)</span>
        </div>
        <br />
        <div className="login">
          <input
            type="text"
            placeholder="email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <br />
          {/* <input type="button" value="Login" disabled={state.disabled} /> */}
          { this.state.showLoader && <PropagateLoader
            css={override}
            sizeUnit={'px'}
            size={20}
            color={'#2DBE4E'}
            loading={this.state.showLoader}
          /> }
          { !this.state.showLoader && <Button
            bsStyle="success"
            disabled={state.disabled}
            onClick={this.submitLogin}
            style={{
              marginTop: '10px',
              width: '76%'
            }}
          >
            Login
          </Button> }
          <br />
          {this.state.diplayMsg !== '' ? (
            <Button
              bsStyle="warning"
              disabled
              style={{ marginTop: '2vh', marginLeft: '-1vh' }}
            >
              <i className="fas fa-exclamation-circle" /> {this.state.diplayMsg}
            </Button>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInUser: state.login.loggedInUser
  };
}

export default connect(mapStateToProps)(Login);
