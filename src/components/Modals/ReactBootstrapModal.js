import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default props => (
  <div className="static-modal">
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{props.body}</Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button bsStyle="primary">{props.submitText}</Button>
      </Modal.Footer>
    </Modal>
  </div>
);
