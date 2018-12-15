import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { CheckBoxTable } from '../../components/Table';
import { fetchPreAdmissionData, fetchStudentsBasedOnFilter } from '../../actions/AdmissionAction';
import { FieldGroup } from '../../components/Form';

const columns = [
  { Header: 'Program', accessor: 'Program' },
  { Header: 'StudentName', accessor: 'StudentName' },
  { Header: 'ContactNumber', accessor: 'ContactNumber' },
  { Header: 'Email', accessor: 'Email' }
];

class TelecallerAllocation extends Component {
  constructor(props) {
    super(props);
    const initialState = {
      from: null,
      to: null
    };
    this.state = {
      form: initialState,
      errors: initialState,
      selectedRecords: [],
      showTable: false
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchPreAdmissionData());
  }
  onClick = () => {
    console.log(this.state);
    const { from, to } = this.state.form;
    this.props.dispatch(fetchStudentsBasedOnFilter({ from, to })).then(() => {
      this.setState({ showTable: true });
    });
  };

  onChangeText = name => ({ target: { value } }) => {
    const form = { ...this.state.form };
    const errors = { ...this.state.errors };
    form[name] = value;
    this.validateInput(name, value).then(newErrors =>
      this.setState({ errors: newErrors })
    );
    this.setState({ form, errors });
  };

  onDayChange = name => (date) => {
    const { form } = this.state;
    form[name] = date;
    this.setState({ form });
  }

  onAllocate = () => alert('Allocating');
  render() {
    const { showTable, form } = this.state;
    return (
      <div className="browse-wrap padding">
        <Row>
          <Col lg={6} md={6} sm={6}>
            <label>From</label>
            <br />
            <DayPickerInput
              style={{ width: '100%' }}
              value={form.dateOfEnquiry}
              onDayChange={this.onDayChange('from')}
            />
          </Col>
          <Col lg={6} md={6} sm={6}>
            <label>To</label>
            <br />
            <DayPickerInput
              style={{ width: '100%' }}
              value={form.dateOfEnquiry}
              onDayChange={this.onDayChange('to')}
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
              <FieldGroup
                id="employee"
                type="text"
                label="Allocate to Employee"
                placeholder="Enter employee name"
                // onChange={this.onChangeText('Email')}
                // value={form.Email}
                // validationState={errors.Email !== '' ? 'error' : null}
                // help={errors.Email !== '' ? errors.Email : null}
              />
              <CheckBoxTable
                enableMultiSelect
                enableSelectAll={false}
                selection={this.state.selectedRecords}
                selectAll={false}
                data={this.props.students}
                columns={columns}
                filterable
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  admissions: state.preAdmissions.admissions,
  students: state.preAdmissions.students
});

export default connect(mapStateToProps)(TelecallerAllocation);
