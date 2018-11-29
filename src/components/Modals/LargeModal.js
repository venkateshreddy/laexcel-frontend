import React, { Component } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import ActionButtons from '../ActionButtons/ActionButtons';
// import PopupToggleView from '../../screens/Dashboard/popupToggleView';

class MyLargeModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        bsSize="large"
        dialogClassName="custom-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            {this.props.header}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
        <Modal.Footer>
          <Row>
            <Col lg={5} md={5}>
              {/* <Row>
                <Col lg={3} md={3} className="action-wrap text-left no-padding">
                  <PopupToggleView />
                </Col>
                <Col lg={9} md={9} className="action-wrap text-left no-padding">
                  <ActionButtons
                    template={this.props.actionbuttontemplate}
                    processes={this.props.actionbuttonselection}
                    isEditorRole
                    showPPT
                    showPDF
                    showPreview={false}f
                    showFinalize={false}
                  />
                </Col>
              </Row> */}
            </Col>
            <Col lg={7} md={7} className="action-wrap text-right">
              <Button onClick={this.props.onHide}>Close</Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    );
  }
}

MyLargeModal.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onHide: PropTypes.func.isRequired
};

export default MyLargeModal;
