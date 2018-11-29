import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import PreviewModal from './PreviewModal';
import {
  downloadBusinessCards,
  downloadPdfBusinessCards,
  // updateProcessData,
  updateMultipleProcessData
} from '../../actions/ProcessActions';

class ActionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  getActionButtons = () => {
    const { showPDF, showPPT, showPreview, showFinalize } = this.props;
    return (
      <React.Fragment>
        {showPPT && (
          <li>
            <i
              className="far fa-file-powerpoint"
              onClick={this.downloadOrFinalizeRecord('PPT')}
              title="Download PPT"
            />
          </li>
        )}
        {showPDF && (
          <li>
            <i
              className="far fa-file-pdf"
              title="Download PDF"
              onClick={this.downloadOrFinalizeRecord('PDF')}
            />
          </li>
        )}
        {showPreview && (
          <li>
            <i className="fa fa-eye" title="Preview" onClick={this.openModal} />
          </li>
        )}
        {showFinalize && (
          <li>
            <i
              className="fas fa-check"
              title="Finalize"
              onClick={this.downloadOrFinalizeRecord('FINALIZE')}
            />
          </li>
        )}
      </React.Fragment>
    );
  };

  dispatcher = (data, action) => this.props.dispatch(action(data));

  downloadOrFinalizeRecord = type => () => {
    const { template, processes, isEditorRole } = this.props;
    if (template && processes.length > 0) {
      const data = {
        templateId: template,
        ids: processes,
        type
      };
      if (type === 'PPT') {
        this.dispatcher(data, downloadBusinessCards);
      }
      if (type === 'PDF') {
        this.dispatcher(data, downloadPdfBusinessCards);
      }
      if (type === 'FINALIZE') {
        const updateData = {
          id: processes,
          data: { status: 'Finalized' },
          isEditorRole
        };
        this.dispatcher(updateData, updateMultipleProcessData);
      }
    } else {
      alert('Please select data and respective template to proceed further.');
    }
  };

  openModal = () => {
    const { template, processes } = this.props;
    if (template && processes.length > 0) {
      this.setState({ open: true });
    } else {
      alert('Please select data and respective template to proceed further.');
    }
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { isEditorRole } = this.props;
    return (
      <div className="test">
        {isEditorRole ? (
          <ul className="action-buttons">{this.getActionButtons()}</ul>
        ) : (
          this.getActionButtons()
        )}
        <Modal open={open} onClose={this.closeModal} center>
          <h2 className="modal-header">Preview</h2>
          <PreviewModal
            template={this.props.template}
            processes={this.props.processes}
          />
        </Modal>
      </div>
    );
  }
}

ActionButtons.defaultProps = {
  showPDF: true,
  showPPT: true,
  showPreview: true,
  showFinalize: true,
  isEditorRole: true
};

// const mapStateToProps = state => ({
// });

export default connect()(ActionButtons);
