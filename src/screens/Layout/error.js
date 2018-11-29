import React from 'react';

class ErrorPage extends React.Component {
  componentDidMount() {
    this.props.router.push('/login');
  }
  render() {
    return null;
  }
}

export default ErrorPage;
