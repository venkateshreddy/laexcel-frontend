import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { SnackBar } from '../../components/SnackBar';
import { Select } from '../../components/Dropdown';
import EnquiriesTable from './EnquiriesTable';
import { fetchEmployeesByRole } from '../../actions/employee';
import {
  fetchAllAssignedEnquiries,
  allocateEmployeeToEnquires
} from '../../actions/PreAdmissionActions';

class AssignedEnquiries extends Component {
  state = {
    employees: [],
    employee: {},
    selectAll: false,
    selection: [],
    showFeedback: false,
    feedback: ''
  };

  componentDidMount() {
    this.props.dispatch(fetchEmployeesByRole('Tele caller')).then(result => {
      if (result.error !== undefined && !result.error) {
        this.setState({ employees: result.payload });
      }
    });
    this.props.dispatch(fetchAllAssignedEnquiries());
  }

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

  toggleSelection = selection => this.setState({ selection });

  toggleAll = (selectAll, selection) => this.setState({ selectAll, selection });

  showFeedback = feedback => {
    this.setState({
      showFeedback: true,
      feedback
    });
  };

  hideSnackBar = () => this.setState({ showFeedback: false, feedback: '' });

  handleChange = name => value => {
    this.setState({ [name]: value });
  };

  render() {
    const { feedback, employee, employees, showFeedback } = this.state;
    return (
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
            data={this.props.assignedAdmissions}
            toggleAll={this.toggleAll}
            toggleSelection={this.toggleSelection}
            showLogs
            showMore
            showComments
            enquiryNumberClickable={false}
          />
          {/* <CheckBoxTable
            enableMultiSelect
            enableSelectAll
            selection={this.state.selection}
            selectAll={this.state.selectAll}
            data={this.props.assignedAdmissions}
            columns={columns}
            filterable
            toggleAll={this.toggleAll}
            toggleSelection={this.toggleSelection}
          /> */}
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
        <SnackBar
          open={showFeedback}
          onClose={this.hideSnackBar}
          msg={feedback}
        />
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  assignedAdmissions: state.preAdmissions.assignedAdmissions,
  currentOrganisation: state.organisations.currentOrganisation
});

export default connect(mapStateToProps)(AssignedEnquiries);
