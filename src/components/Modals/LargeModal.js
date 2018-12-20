import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Modal.css';

class MyLargeModal extends React.Component {
  onHide = () => this.props.onHide();
  render() {
    const {
      header,
      children,
      onSave,
      saveText,
      closeText,
      onReset,
      resetText,
      showFooter,
      ...rest
    } = this.props;
    return (
      <Modal
        {...rest}
        bsSize="large"
        dialogClassName="custom-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {showFooter && (
          <Modal.Footer>
            <div className="text-right">
              <Button onClick={onReset}>{resetText}</Button>
              <Button onClick={this.onHide}>{closeText}</Button>
              <Button onClick={onSave} bsStyle="primary">
                {saveText}
              </Button>
            </div>
          </Modal.Footer>
        )}
      </Modal>
    );
  }
}

MyLargeModal.defaultProps = {
  saveText: 'Save Changes',
  closeText: 'Close',
  resetText: 'Reset',
  showFooter: true,
  onSave: () => null,
  onReset: () => null
};

MyLargeModal.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onHide: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  saveText: PropTypes.string,
  closeText: PropTypes.string,
  resetText: PropTypes.string,
  onReset: PropTypes.func,
  showFooter: PropTypes.bool
};

export default MyLargeModal;
