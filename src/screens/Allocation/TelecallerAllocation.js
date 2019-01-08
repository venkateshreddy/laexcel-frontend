import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import EnquiriesTable from './EnquiriesTable';
import { SnackBar } from '../../components/SnackBar';
import { Select } from '../../components/Dropdown';
import DateRangeSearch from './DateRangeSearch';

import {
  fetchStudentsBasedOnFilter,
  allocateEmployeeToEnquires
} from '../../actions/PreAdmissionActions';
import { fetchEmployeesByRole } from '../../actions/employee';

const initialState = {
  from: null,
  to: null,
  program: ''
};
class TelecallerAllocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: initialState,
      employees: [],
      employee: {},
      selectAll: false,
      selection: [],
      showTable: false,
      showFeedback: false,
      feedback: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchEmployeesByRole('Tele caller')).then(result => {
      if (result.error !== undefined && !result.error) {
        this.setState({ employees: result.payload });
      }
    });
  }

  onSearchClick = () => {
    const { from, to, program } = this.state.form;
    if (from !== null && to !== null && program !== '') {
      this.props
        .dispatch(fetchStudentsBasedOnFilter({ from, to, program }))
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

  onAllocate = () => {
    const { selection, employee } = this.state;
    if (selection.length === 0) {
      alert('Please select at least one enqiry to continue!');
    } else if (!employee.value) {
      alert('Please select an employee to continue!');
    } else {
      this.props
        .dispatch(
          allocateEmployeeToEnquires({ selection, employee: employee.value })
        )
        .then(result => {
          if (result.error !== undefined && !result.error) {
            this.showFeedback(
              `Enquires assigned to ${employee.label} successfully!`
            );
            setTimeout(this.hideSnackBar, 2000);
            this.resetForm();
          }
        });
    }
  };

  getOptions = employees =>
    employees.map(employee => ({ label: employee.name, value: employee.id }));

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
      // employees: [],
      employee: {},
      selectAll: false,
      selection: []
      // showTable: false
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
    const {
      showTable,
      form,
      employees,
      employee,
      showFeedback,
      feedback
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
            <Col lg={12} md={12} sm={12} xs={12}>
              <Select
                id="employee"
                className="custom-select"
                placeholder="Choose employee"
                label="Allocate to employee"
                onChange={this.handleChange('employee')}
                options={this.getOptions(employees)}
                value={employee}
                multi={false}
              />
              <EnquiriesTable
                selection={this.state.selection}
                selectAll={this.state.selectAll}
                data={this.props.admissions}
                toggleAll={this.toggleAll}
                toggleSelection={this.toggleSelection}
                showLogs
                showMore
                enquiryNumberClickable={false}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={12} className="margin text-right">
              <Button
                style={{ marginRight: '15px' }}
                onClick={this.onAllocate}
                bsStyle="primary"
              >
                Allocate
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
  admissions: state.preAdmissions.admissions,
  currentOrganisation: state.organisations.currentOrganisation
});

export default connect(mapStateToProps)(TelecallerAllocation);
