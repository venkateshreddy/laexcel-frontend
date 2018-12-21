import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FieldGroup, FieldSelect } from '../../components/Form';
import { fetchResponseTypes } from '../../actions/ResponseTypeActions';

const initialForm = {
  responseType: '',
  remarks: ''
};

class Remarks extends Component {
  state = {
    form: initialForm
  };

  componentDidMount() {
    this.props.dispatch(fetchResponseTypes());
  }

  onSubmit = () => {
    const { form } = this.state;
    if (form.responseType.length > 0 && form.remarks.length > 0) {
      this.props.onSubmit(form);
    }
  };

  getOptions = (array, label, value) =>
    array.map(data => (
      <option key={data.id} value={data[value]}>
        {data[label]}
      </option>
    ));

  handleChange = name => ({ target: { value } }) => {
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });
  };

  resetForm = () => {
    this.setState({
      form: {
        responseType: '',
        remarks: ''
      }
    });
  };

  render() {
    const { form } = this.state;
    const { responseTypes } = this.props;
    return (
      <div>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <FieldSelect
              id="responseType"
              label="Response Type"
              onChange={this.handleChange('responseType')}
              value={form.responseType}
              validationState={null}
              help={null}
              options={this.getOptions(responseTypes, 'responseName', 'id')}
            />
          </Col>
          <Col lg={12} md={12} sm={12}>
            <FieldGroup
              id="remarks"
              type="text"
              label="Remarks"
              placeholder="Enter remarks"
              onChange={this.handleChange('remarks')}
              value={form.remarks}
              validationState={null}
              help={null}
            />
          </Col>
        </Row>
        <Row className="text-right">
          <Button
            style={{ marginRight: '15px' }}
            onClick={this.resetForm}
            bsStyle="primary"
          >
            Reset
          </Button>
          <Button
            style={{ marginRight: '15px' }}
            onClick={this.onSubmit}
            bsStyle="primary"
          >
            Submit
          </Button>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  responseTypes: state.responseType.responseTypes
});

export default connect(mapStateToProps)(Remarks);