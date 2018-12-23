import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { CheckBoxTable } from '../../components/Table';
import { SnackBar } from '../../components/SnackBar';
import { LargeModal } from '../../components/Modals/';
import DateRangeSearch from './DateRangeSearch';
import { FieldSelect } from '../../components/Form';
import './Telecaller.scss';
import {
  fetchAdmissionsByEmp,
  setResponseAndRemarks
} from '../../actions/AdmissionAction';
import Remarks from './Remarks';
import { fetchResponseTypes } from '../../actions/ResponseTypeActions';

const initialState = {
  from: null,
  to: null,
  program: '',
  responseType: ''
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
      { Header: 'Branch', accessor: 'others', Cell: () => '' },
      { Header: 'Response Type', accessor: 'responseType' }
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

  componentDidMount() {
    const { currentOrganisation } = this.props;
    if (!currentOrganisation.id) {
      this.props.router.push('/');
    } else {
      const { responseTypes } = this.props;
      if (responseTypes.length === 0) this.props.dispatch(fetchResponseTypes());
    }
  }

  onSearchClick = () => {
    const { loggedInUser } = this.props;
    const { from, to, program, responseType } = this.state.form;
    if (from !== null && to !== null && program !== '' && responseType !== '') {
      this.props
        .dispatch(
          fetchAdmissionsByEmp(loggedInUser.id, {
            from,
            to,
            program,
            responseType
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
      .dispatch(setResponseAndRemarks(selectedRow.id, data))
      .then(response => {
        if (response.error !== undefined && !response.error) {
          this.showFeedback('Response type and remarks captured successfully!');
          setTimeout(this.hideSnackBar, 2000);
          this.resetForm();
        }
      });
  };

  getOptions = (array, label, value) =>
    array.map(data => (
      <option key={data.id} value={data[value]}>
        {data[label]}
      </option>
    ));

  openResponseTypeModal = row => () => {
    this.setState({ showModal: true, selectedRow: row });
  };

  handleChange = name => value => {
    const { form } = this.state;
    form[name] = value.target ? value.target.value : value;
    this.setState({ form });
  };

  resetForm = () =>
    this.setState({
      form: { from: null, to: null, program: '', responseType: '' },
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
    const { responseTypes } = this.props;
    return (
      <div className="browse-wrap padding">
        <Row>
          <Col lg={6} md={6} sm={6}>
            <FieldSelect
              id="responseType"
              label="Response Type"
              onChange={this.handleChange('responseType')}
              value={form.responseType}
              validationState={null}
              help={null}
              options={this.getOptions(responseTypes, 'responseName', 'id')}
              style={{ height: 'calc(35px - 0.375rem)' }}
            />
          </Col>
        </Row>
        <DateRangeSearch
          form={form}
          handleChange={this.handleChange}
          onSearchClick={this.onSearchClick}
          resetForm={this.resetForm}
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
  loggedInUser: state.login.loggedInUser,
  admissions: state.preAdmissions.admissions,
  currentOrganisation: state.organisations.currentOrganisation,
  responseTypes: state.responseType.responseTypes
});

export default connect(mapStateToProps)(Telecalling);
