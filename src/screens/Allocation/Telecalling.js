import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import EnquiriesTable from './EnquiriesTable';
import { SnackBar } from '../../components/SnackBar';
import { LargeModal } from '../../components/Modals/';
import DateRangeSearch from './DateRangeSearch';
import './Telecaller.scss';
import {
  updateResponseTypeAndRemarks,
  fetchAdmissionsByEmp
} from '../../actions/PreAdmissionActions';
import Remarks from './Remarks';

const initialState = {
  from: null,
  to: null,
  program: ''
};
class Telecalling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: initialState,
      selectAll: false,
      selection: [],
      showTable: false,
      showFeedback: false,
      feedback: '',
      showModal: false,
      selectedRow: {}
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
        .dispatch(
          fetchAdmissionsByEmp(loggedInUser.id, {
            from,
            to,
            program,
            isAcceptedByEmp: true
          })
        )
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

  onRemarksSubmit = data => {
    const { selectedRow } = this.state;
    this.props
      .dispatch(updateResponseTypeAndRemarks(selectedRow.id, data))
      .then(response => {
        if (response.error !== undefined && !response.error) {
          this.showFeedback('Response type and remarks captured successfully!');
          setTimeout(this.hideSnackBar, 2000);
          this.resetForm();
        }
      });
  };

  openResponseTypeModal = row => {
    this.setState({ showModal: true, selectedRow: row });
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
      showModal: false,
      selectedRow: {}
    });

  toggleSelection = selection => this.setState({ selection });

  toggleAll = (selectAll, selection) => this.setState({ selectAll, selection });

  showFeedback = feedback => {
    this.setState({
      showFeedback: true,
      feedback
    });
  };

  hideSnackBar = () => this.setState({ showFeedback: false, feedback: '' });

  closeResponseModal = () => this.setState({ showModal: false });

  render() {
    const { showTable, form, showFeedback, feedback, showModal } = this.state;
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
            <Col lg={12} md={12} sm={12} xs={12}>
              <EnquiriesTable
                selection={this.state.selection}
                selectAll={this.state.selectAll}
                data={this.props.admissions}
                toggleAll={this.toggleAll}
                toggleSelection={this.toggleSelection}
                enquiryNumberClickable
                onEnquiryNumberClick={this.openResponseTypeModal}
              />
            </Col>
          </Row>
        )}
        <LargeModal
          show={showModal}
          header="Response Type"
          onHide={this.closeResponseModal}
          showFooter={false}
        >
          <Remarks onSubmit={this.onRemarksSubmit} />
        </LargeModal>
        <SnackBar
          open={showFeedback}
          onClose={this.hideSnackBar}
          msg={feedback}
        />
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

export default connect(mapStateToProps)(Telecalling);
