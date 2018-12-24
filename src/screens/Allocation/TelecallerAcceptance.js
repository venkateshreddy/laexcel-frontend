import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Switch from 'react-switch';

import { CheckBoxTable } from '../../components/Table';
import { SnackBar } from '../../components/SnackBar';
import DateRangeSearch from './DateRangeSearch';
import './Telecaller.scss';

import {
  fetchAdmissionsByEmp,
  acceptOrRejectEnquiry
} from '../../actions/AdmissionAction';

const columns = [
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
          <label className="simulate-link">
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
  {
    Header: 'Status',
    accessor: 'isAcceptedByEmp',
    Cell: row => (row.value ? <div>Accepted</div> : <div>Pending</div>)
  }
];

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
      isAccepted: false
    };
  }

  componentDidMount() {
    const { currentOrganisation } = this.props;
    if (!currentOrganisation.id) {
      this.props.router.push('/');
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
    } else if (
      !isAccepted &&
      window.confirm('This action will return enquiries to admin')
    ) {
      this.acceptOrRejectEnquiry(selection, 'return');
    } else if (isAccepted) {
      this.acceptOrRejectEnquiry(selection, 'accept');
    }
  };

  acceptOrRejectEnquiry = (selection, actionType) => {
    this.props
      .dispatch(acceptOrRejectEnquiry({ selection, status: actionType }))
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
      isAccepted: false
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

  render() {
    const { showTable, form, showFeedback, feedback } = this.state;
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
                uncheckedIcon={<div className="return-toggle">Return</div>}
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
              <CheckBoxTable
                enableMultiSelect
                enableSelectAll
                selection={this.state.selection}
                selectAll={this.state.selectAll}
                data={this.props.admissions}
                columns={columns}
                filterable
                toggleAll={this.toggleAll}
                toggleSelection={this.toggleSelection}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser,
  admissions: state.preAdmissions.admissions,
  currentOrganisation: state.organisations.currentOrganisation
});

export default connect(mapStateToProps)(TelecallerAcceptance);
