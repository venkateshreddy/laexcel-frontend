import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { CheckBoxTable } from '../../components/Table';
import { SnackBar } from '../../components/SnackBar';
import { Select } from '../../components/Dropdown';
import {
  fetchStudentsBasedOnFilter,
  allocateEmployeeToEnquires
} from '../../actions/AdmissionAction';
import { fetchEmployeesByRole } from '../../actions/employee';

const columns = [
  { Header: 'Program', accessor: 'Program' },
  { Header: 'StudentName', accessor: 'StudentName' },
  { Header: 'ContactNumber', accessor: 'ContactNumber' },
  { Header: 'Email', accessor: 'Email' }
];

const initialState = {
  from: null,
  to: null
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

  onClick = () => {
    const { from, to } = this.state.form;
    if (from !== null && to !== null) {
      this.props
        .dispatch(fetchStudentsBasedOnFilter({ from, to }))
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
      alert('Please select from and to to continue!');
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
      form: { from: null, to: null },
      employees: [],
      employee: {},
      selectAll: false,
      selection: [],
      showTable: false
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
        <Row>
          <Col lg={6} md={6} sm={6}>
            <label>From</label>
            <br />
            <DayPickerInput
              style={{ width: '100%' }}
              value={form.from}
              key={form.from}
              onDayChange={this.handleChange('from')}
            />
          </Col>
          <Col lg={6} md={6} sm={6}>
            <label>To</label>
            <br />
            <DayPickerInput
              style={{ width: '100%' }}
              value={form.to}
              key={form.to}
              onDayChange={this.handleChange('to')}
            />
          </Col>
          <Row className="text-right">
            <Button
              style={{ marginRight: '15px' }}
              onClick={this.onClick}
              bsStyle="primary"
            >
              Search
            </Button>
          </Row>
        </Row>
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
              <CheckBoxTable
                enableMultiSelect
                enableSelectAll
                selection={this.state.selection}
                selectAll={this.state.selectAll}
                data={this.props.students}
                columns={columns}
                filterable
                toggleAll={this.toggleAll}
                toggleSelection={this.toggleSelection}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={12} className="margin text-right">
              <Button
                style={{ marginRight: '15px' }}
                onClick={this.resetForm}
                bsStyle="primary"
              >
                Reset
              </Button>
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
  students: state.preAdmissions.students
});

export default connect(mapStateToProps)(TelecallerAllocation);
