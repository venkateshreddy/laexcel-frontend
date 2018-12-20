import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
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
    // alert(
    //   `emai: ${this.state.email}, pass: ${
    //     this.state.password
    //   }:: testing-Pls click OK`
    // );
    const loginObj = { email: this.state.email, password: this.state.password };
    this.props.dispatch(submitLogin(loginObj, this.loginFailed));
  };
  loginFailed = result => {
    this.setState({
      // open: true,
      // snackbarMsg: 'Oops.. verification failed, Pls contact your admin'
      diplayMsg: result.message
    });
  };
  render() {
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
            La Excel
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
          <input
            type="button"
            value="Login"
            disabled={state.disabled}
            onClick={this.submitLogin}
          />
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
