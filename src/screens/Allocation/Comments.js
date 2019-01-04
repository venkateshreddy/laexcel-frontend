import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

class Comments extends Component {
  render() {
    const { data } = this.props;
    console.log(data, 'comments');
    if (data.comments.length) {
      return data.comments.map(comment => (
        <Row>
          <Row>
            <strong>Inserted By:</strong>{' '}
          </Row>
          <Row style={{ margin: '5px 0px' }}>
            <strong>Comment:</strong>
            <label style={{ fontStyle: 'italic' }}>{comment.comment}</label>
          </Row>
        </Row>
      ));
    }
    return <Row>No comments found!</Row>;
  }
}

export default Comments;
