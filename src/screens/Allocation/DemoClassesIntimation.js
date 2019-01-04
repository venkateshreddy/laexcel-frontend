import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import EnquiriesTable from './EnquiriesTable';
import { SnackBar } from '../../components/SnackBar';
import DateRangeSearch from './DateRangeSearch';
import { FieldSelect } from '../../components/Form';
import { DayPickerInput } from '../../components/DatePicker';
import './Telecaller.scss';
import {
  fetchAssignedAdmissions,
  setDemoClassDate
} from '../../actions/AdmissionAction';
import { fetchResponseTypes } from '../../actions/ResponseTypeActions';

const initialState = {
  from: null,
  to: null,
  program: '',
  responseType: ''
};
class DemoClassesIntimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: initialState,
      selectAll: false,
      selection: [],
      showTable: false,
      showFeedback: false,
      feedback: '',
      showModal: false,
      selectedRow: {},
      demoClassDate: ''
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

  setDemoClassDate = () => {
    const { demoClassDate, selection } = this.state;
    if (selection.length === 0) {
      alert('Please select at least one enquiry to continue!');
    } else if (demoClassDate === '') {
      alert('Please select a date to continue!');
    } else {
      this.props
        .dispatch(setDemoClassDate({ selection, demoClassDate }))
        .then(response => {
          if (response.error !== undefined) {
            this.showFeedback(response.message);
            setTimeout(this.hideSnackBar, 2000);
            this.resetForm();
          }
        });
    }
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
      selectedRow: {},
      demoClassDate: ''
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

  handleDateChange = demoClassDate => this.setState({ demoClassDate });

  render() {
    const {
      showTable,
      form,
      showFeedback,
      feedback,
      demoClassDate,
      selection
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
          programLabel="Program"
          handleChange={this.handleChange}
          onSearchClick={this.onSearchClick}
          resetForm={this.resetForm}
        />
        {showTable && (
          <Row className="margin-top">
            {selection.length > 0 && (
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <label>Demo class date</label>
                  <br />
                  <DayPickerInput
                    style={{ width: '100%' }}
                    value={demoClassDate}
                    key={demoClassDate}
                    onDayChange={this.handleDateChange}
                  />
                </Col>
                <Col lg={6} md={6} sm={6} style={{ marginTop: '18px' }}>
                  <Button
                    style={{ marginRight: '15px' }}
                    onClick={this.setDemoClassDate}
                    bsStyle="primary"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            )}
            <Col lg={12} md={12} sm={12} xs={12}>
              <EnquiriesTable
                selection={this.state.selection}
                selectAll={this.state.selectAll}
                data={this.props.admissions}
                columns={this.columns}
                toggleAll={this.toggleAll}
                toggleSelection={this.toggleSelection}
                enquiryNumberClickable={false}
                showResponseRemarks
              />
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
  currentOrganisation: state.organisations.currentOrganisation,
  responseTypes: state.responseType.responseTypes
});

export default connect(mapStateToProps)(DemoClassesIntimation);
