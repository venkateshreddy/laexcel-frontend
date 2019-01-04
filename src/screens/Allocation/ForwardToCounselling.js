import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import EnquiriesTable from './EnquiriesTable';
import { SnackBar } from '../../components/SnackBar';
import DateRangeSearch from './DateRangeSearch';
import { FieldSelect } from '../../components/Form';
import { Select } from '../../components/Dropdown';
import './Telecaller.scss';
import {
  fetchAssignedAdmissions,
  allocateEmployeeToEnquires
} from '../../actions/AdmissionAction';
import { fetchResponseTypes } from '../../actions/ResponseTypeActions';
import { fetchEmployeesByRole } from '../../actions/employee';

const initialState = {
  from: null,
  to: null,
  program: '',
  responseType: ''
};

class ForwardToCounselling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: initialState,
      selectAll: false,
      selection: [],
      employees: [],
      employee: {},
      showTable: false,
      showFeedback: false,
      feedback: '',
      selectedRow: {}
    };
  }

  componentDidMount() {
    const { currentOrganisation } = this.props;
    if (!currentOrganisation.id) {
      this.props.router.push('/');
    } else {
      const { responseTypes } = this.props;
      if (responseTypes.length === 0) {
        this.props.dispatch(fetchResponseTypes());
      }
      this.props.dispatch(fetchEmployeesByRole('Tele caller')).then(result => {
        if (result.error !== undefined && !result.error) {
          this.setState({ employees: result.payload });
        }
      });
    }
  }

  onSearchClick = () => {
    const { from, to, program, responseType } = this.state.form;
    if (from !== null && to !== null && program !== '' && responseType !== '') {
      this.props
        .dispatch(
          fetchAssignedAdmissions({
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

  getOptions = (array, label, value) =>
    array.map(data => (
      <option key={data.id} value={data[value]}>
        {data[label]}
      </option>
    ));

  getEmployeesList = employees =>
    employees.map(employee => ({ label: employee.name, value: employee.id }));

  forwardToCounselling = () => {
    const { selection, employee } = this.state;
    if (selection.length === 0) {
      alert('Please select at least one eqnuiry to continue!');
    } else if (employee === '') {
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

  handleChange = name => value => {
    const { form } = this.state;
    if (name === 'employee') {
      this.setState({ [name]: value });
    } else {
      form[name] = value.target ? value.target.value : value;
      this.setState({ form });
    }
  };

  resetForm = () =>
    this.setState({
      form: { from: null, to: null, program: '', responseType: '' },
      selectAll: false,
      selection: [],
      employee: {},
      // showTable: false,
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

  render() {
    const {
      showTable,
      form,
      showFeedback,
      feedback,
      employees,
      employee
    } = this.state;
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
              <Select
                id="employee"
                className="custom-select"
                placeholder="Choose employee"
                label="Forward to employee"
                onChange={this.handleChange('employee')}
                options={this.getEmployeesList(employees)}
                value={employee}
                multi={false}
              />
              <EnquiriesTable
                selection={this.state.selection}
                selectAll={this.state.selectAll}
                data={this.props.admissions}
                toggleAll={this.toggleAll}
                toggleSelection={this.toggleSelection}
                showResponseRemarks
                enquiryNumberClickable={false}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={12} className="margin text-right">
              <Button
                style={{ marginRight: '15px' }}
                onClick={this.forwardToCounselling}
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
  admissions: state.preAdmissions.admissions,
  currentOrganisation: state.organisations.currentOrganisation,
  responseTypes: state.responseType.responseTypes
});

export default connect(mapStateToProps)(ForwardToCounselling);
