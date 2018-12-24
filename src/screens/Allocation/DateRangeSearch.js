import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { FieldSelect } from '../../components/Form';

const ProgramOptions = [
  { name: 'Program 1', id: 'Program 1' },
  { name: 'Program 2', id: 'Program 2' },
  { name: 'Program 3', id: 'Program 3' }
];

const getOptions = (array, label, value) =>
  array.map(data => (
    <option key={data.id} value={data[value]}>
      {data[label]}
    </option>
  ));

class DateRangeSearch extends Component {
  onChangeText = name => ({ target: { value } }) =>
    this.props.handleChange(name)(value);
  render() {
    const { form } = this.props;
    return (
      <Row>
        <Col lg={6} md={6} sm={6}>
          <label>From</label>
          <br />
          <DayPickerInput
            style={{ width: '100%' }}
            value={form.from}
            key={form.from}
            onDayChange={this.props.handleChange('from')}
          />
        </Col>
        <Col lg={6} md={6} sm={6}>
          <label>To</label>
          <br />
          <DayPickerInput
            style={{ width: '100%' }}
            value={form.to}
            key={form.to}
            onDayChange={this.props.handleChange('to')}
          />
        </Col>
        <Row>
          <Col lg={6} md={6} sm={12}>
            <FieldSelect
              id="Program"
              label="Enquiry for Program"
              placeholder="Select a program"
              onChange={this.onChangeText('program')}
              value={form.program}
              validationState={null}
              help={null}
              options={getOptions(ProgramOptions, 'name', 'id')}
              style={{ height: 'calc(35px - 0.375rem)' }}
            />
          </Col>
        </Row>
        <Row className="text-right">
          <Button
            style={{ marginRight: '15px' }}
            onClick={this.props.resetForm}
            bsStyle="primary"
          >
            Reset
          </Button>
          <Button
            style={{ marginRight: '15px' }}
            onClick={this.props.onSearchClick}
            bsStyle="primary"
          >
            Search
          </Button>
        </Row>
      </Row>
    );
  }
}

export default DateRangeSearch;
