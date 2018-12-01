import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Modal.css';

const MyLargeModal = ({
  header,
  children,
  onSave,
  onHide,
  saveText,
  closeText,
  resetText,
  onReset,
  ...rest
}) => (
  <Modal
    {...rest}
    bsSize="large"
    dialogClassName="custom-modal"
    aria-labelledby="contained-modal-title-lg"
  >
    <Modal.Header>
      <i className="fa fa-times closeIcon" title="close" onClick={onHide} />
      <Modal.Title id="contained-modal-title-lg">{header}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <div className="text-right">
        <Button onClick={onReset}>{resetText}</Button>
        <Button onClick={onHide}>{closeText}</Button>
        <Button onClick={onSave} bsStyle="primary">
          {saveText}
        </Button>
      </div>
    </Modal.Footer>
  </Modal>
);

MyLargeModal.defaultProps = {
  saveText: 'Save Changes',
  closeText: 'Close'
};

MyLargeModal.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onHide: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  saveText: PropTypes.string,
  closeText: PropTypes.string
};

export default MyLargeModal;
