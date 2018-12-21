import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { CheckBoxTable } from '../../components/Table';
import { SnackBar } from '../../components/SnackBar';
import { LargeModal } from '../../components/Modals/';
import DateRangeSearch from './DateRangeSearch';
import './Telecaller.scss';
import {
  fetchAssignedAdmissions,
  setResponseAndRemarks
} from '../../actions/AdmissionAction';
import Remarks from './Remarks';

const initialState = {
  from: null,
  to: null,
  program: ''
};
class Telecalling extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        Header: 'Date of Enquiry',
        accessor: 'others',
        Cell: row => row.value.dateOfEnquiry
      },
      {
        Header: 'Enquiry Number',
        accessor: 'id',
        Cell: row => {
          if (row.value) {
            return (
              <label
                className="simulate-link"
                onClick={this.openResponseTypeModal(row.original)}
              >
                {row ? row.value.substring(15) : ''}
              </label>
            );
          }
          return '';
        }
      },
      { Header: 'Name of Student', accessor: 'StudentName' },
      { Header: 'Contact Number', accessor: 'ContactNumber' },
      { Header: 'Email', accessor: 'Email' },
      { Header: 'Program', accessor: 'Program' },
      { Header: 'Branch', accessor: 'others', Cell: () => '' }
    ];
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

  onSearchClick = () => {
    const { from, to, program } = this.state.form;
    if (from !== null && to !== null && program !== '') {
      this.props
        .dispatch(fetchAssignedAdmissions({ from, to, program }))
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
      .dispatch(setResponseAndRemarks(selectedRow.id, data))
      .then(response => {
        if (response.error !== undefined && !response.error) {
          this.showFeedback('Response type and remarks captured successfully!');
          setTimeout(this.hideSnackBar, 2000);
          this.resetForm();
        }
      });
  };

  openResponseTypeModal = row => () => {
    this.setState({ showModal: true, selectedRow: row });
  };

  handleChange = name => value => {
    const { form } = this.state;
    if (name === 'employee') {
      this.setState({ [name]: value });
    } else {
      form[name] = value;
      this.setState({ form });
    }
  };

  resetForm = () =>
    this.setState({
      form: { from: null, to: null, program: '' },
      selectAll: false,
      selection: [],
      showTable: false,
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
        />
        {showTable && (
          <Row className="margin-top">
            <Col lg={12} md={12} sm={12} xs={12}>
              <CheckBoxTable
                enableMultiSelect
                enableSelectAll
                selection={this.state.selection}
                selectAll={this.state.selectAll}
                data={this.props.admissions}
                columns={this.columns}
                filterable
                toggleAll={this.toggleAll}
                toggleSelection={this.toggleSelection}
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
  admissions: state.preAdmissions.admissions
});

export default connect(mapStateToProps)(Telecalling);