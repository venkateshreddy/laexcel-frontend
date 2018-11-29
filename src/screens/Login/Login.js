import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router';
// import TextField from '../../components/TextField/TextField';
// import Button from '../../components/Button/Button';
import { submitLogin } from '../../actions/LoginAction';
import './Login.scss';

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
    // alert(`in callback: ${result}:: testing-Pls click OK`);
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
        <div className="login-header margin-top">
          <Row>
            <Col lg={4} md={4} sm={4} className="gbs-logo-wrap">
              <Row>
                <Col lg={2} md={2} sm={2} className="no-padding">
                  {/* <img
                    src="./assets/images/navbar/global-business-service-logo.png"
                    className="logo"
                    alt=""
                  /> */}
                </Col>
                <Col lg={10} md={10} sm={10}>
                  <h1>Animal Ware House</h1>
                </Col>
              </Row>
            </Col>
            <Col lg={8} md={8} sm={8} className="text-right clariant-logo">
              {/* <img
                src="./assets/images/Clariant Logo.png"
                className="logo"
                alt=""
              /> */}
            </Col>
          </Row>
          <div className="login-box-wrap">
            <div className="login-form">
              <div className="text-center margin-top clarient-logo contactCards-logo padding-top">
                <h1>PRE-CLINICAL TRIAL</h1>
              </div>
              <div className="login-fields">
                <div className="username position margin-vertical">
                  <input
                    type="text"
                    placeholder="E-mail"
                    className="login-textbox"
                    onChange={this.checkDisabled('email')}
                  />
                </div>
                <div className="password position padding-vertical">
                  <input
                    placeholder="Password"
                    type="Password"
                    className="login-textbox"
                    onChange={this.checkDisabled('password')}
                  />
                </div>
                <div className="margin-top padding-top text-center login-bottom">
                  <input
                    type="button"
                    value="Login"
                    className="loginButton"
                    disabled={state.disabled}
                    onClick={this.submitLogin}
                  />
                  <br />
                  <br />
                  <div>{this.state.diplayMsg}</div>
                </div>
                {/* <form>
                  <span>new here?</span>
                  &nbsp;
                  <Link to={'registration'}>
                    <Button value="Sign up" disabled={false} />
                  </Link>
                </form> */}
              </div>
            </div>
          </div>
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
