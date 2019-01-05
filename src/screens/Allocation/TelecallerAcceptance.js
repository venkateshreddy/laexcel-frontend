import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Switch from 'react-switch';

import EnquiriesTable from './EnquiriesTable';
import { SnackBar } from '../../components/SnackBar';
import { LargeModal } from '../../components/Modals/';
import { FieldGroup } from '../../components/Form';
import DateRangeSearch from './DateRangeSearch';
import './Telecaller.scss';

import {
  fetchAdmissionsByEmp,
  acceptOrRejectEnquiry
} from '../../actions/AdmissionAction';

const initialState = {
  from: null,
  to: null,
  program: ''
};

class TelecallerAcceptance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: initialState,
      selectAll: false,
      selection: [],
      showTable: false,
      showFeedback: false,
      feedback: '',
      isAccepted: true,
      showModal: false,
      comment: '',
      commentError: ''
    };
  }

  componentDidMount() {
    const { currentOrganisation, currentAcademicYear } = this.props;
    if (!currentOrganisation.id || !currentAcademicYear) {
      this.props.router.push('/error');
    }
  }

  onSearchClick = () => {
    const { loggedInUser } = this.props;
    const { from, to, program } = this.state.form;
    if (from !== null && to !== null && program !== '') {
      this.props
        .dispatch(fetchAdmissionsByEmp(loggedInUser.id, { from, to, program }))
        .then(response => {
          if (response.error !== undefined) {
            if (!response.error) {
              this.setState({ showTable: true });
            }
            this.showFeedback(response.message);
            setTimeout(this.hideSnackBar, 2000);
          }
        });
    } else {
      alert('Please select all the fields to continue!');
    }
  };

  onSubmit = () => {
    const { selection, isAccepted } = this.state;
    if (selection.length === 0) {
      alert('Please select at least one enqiry to continue!');
    } else if (!isAccepted) {
      this.askForRejectionReason();
      // this.acceptOrRejectEnquiry(selection, 'reject');
    } else if (isAccepted) {
      this.acceptOrRejectEnquiry(selection, 'accept');
    }
  };

  askForRejectionReason = () => this.setState({ showModal: true });

  acceptOrRejectEnquiry = (selection, actionType) => {
    this.props
      .dispatch(
        acceptOrRejectEnquiry({
          selection,
          status: actionType,
          comment: this.state.comment
        })
      )
      .then(result => {
        if (result.error !== undefined && !result.error) {
          this.showFeedback(`Enquires ${actionType}ed successfully!`);
          setTimeout(this.hideSnackBar, 2000);
          this.resetForm();
        }
      });
  };

  handleChange = name => value => {
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });
  };

  resetForm = () =>
    this.setState({
      form: { from: null, to: null, program: '' },
      selectAll: false,
      selection: [],
      // showTable: false,
      showFeedback: false,
      feedback: '',
      isAccepted: false,
      showModal: false,
      comment: '',
      commentError: ''
    });

  toggleSelection = selection => this.setState({ selection });

  toggleAll = (selectAll, selection) => this.setState({ selectAll, selection });

  showFeedback = feedback => {
    this.setState({
      showFeedback: true,
      feedback
    });
  };

  submitRejectedEnquiries = () => {
    const { comment, selection } = this.state;
    if (comment === '') {
      this.setState({ commentError: 'Reason for rejection is required!' });
    } else {
      this.acceptOrRejectEnquiry(selection, 'reject');
    }
  };

  resetModalForm = () => this.setState({ comment: '', commentError: '' });

  hideSnackBar = () => this.setState({ showFeedback: false, feedback: '' });

  resetModalForm = () => this.setState({ comment: '', commentError: '' });

  closeModalForm = () =>
    this.setState({ comment: '', showModal: false, commentError: '' });

  render() {
    const {
      showTable,
      form,
      showFeedback,
      feedback,
      showModal,
      comment,
      commentError
    } = this.state;
    return (
      <div className="browse-wrap padding">
        <DateRangeSearch
          form={form}
          handleChange={this.handleChange}
          onSearchClick={this.onSearchClick}
          resetForm={this.resetForm}
        />
        {showTable && (
          <Row className="margin-top">
            <Row style={{ margin: '0px 0px 2px 13px' }}>
              <Switch
                checkedIcon={<div className="accept-toggle">Accept</div>}
                uncheckedIcon={<div className="return-toggle">Reject</div>}
                onChange={value => {
                  this.setState({
                    isAccepted: value
                  });
                }}
                height={30}
                width={80}
                onColor="#0073a8"
                checked={this.state.isAccepted}
                id="accept-return"
              />
            </Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <EnquiriesTable
                selection={this.state.selection}
                selectAll={this.state.selectAll}
                data={this.props.admissions}
                toggleAll={this.toggleAll}
                toggleSelection={this.toggleSelection}
                enquiryNumberClickable={false}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={12} className="margin text-right">
              <Button
                style={{ marginRight: '15px' }}
                onClick={this.onSubmit}
                bsStyle="primary"
              >
                Submit
              </Button>
            </Col>
          </Row>
        )}
        <SnackBar
          open={showFeedback}
          onClose={this.hideSnackBar}
          msg={feedback}
        />
        <LargeModal
          show={showModal}
          header="Comments"
          onHide={this.closeModalForm}
          onSave={this.submitRejectedEnquiries}
          saveText="Submit"
          closeText="Close"
          resetText="Reset"
          onReset={this.resetModalForm}
          style={{ margin: '0 auto', width: '50%' }}
        >
          <FieldGroup
            id="comment"
            type="textarea"
            label="Reason for rejection"
            placeholder="Please enter a reason for rejection..."
            onChange={e => this.setState({ comment: e.target.value })}
            value={comment}
            validationState={commentError !== '' ? 'error' : null}
            help={commentError !== '' ? commentError : null}
          />
        </LargeModal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser,
  admissions: state.preAdmissions.admissions,
  currentOrganisation: state.organisations.currentOrganisation,
  currentAcademicYear: state.academicYears.currentAcademicYear
});

export default connect(mapStateToProps)(TelecallerAcceptance);
