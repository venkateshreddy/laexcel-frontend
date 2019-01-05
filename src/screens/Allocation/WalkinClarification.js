import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import EnquiriesTable from './EnquiriesTable';
import { SnackBar } from '../../components/SnackBar';
import { FieldGroup, FieldSelect } from '../../components/Form';
import { LargeModal } from '../../components/Modals/';
import { DayPickerInput } from '../../components/DatePicker';
import './Telecaller.scss';
import {
  fetchEnquiresByStudent,
  updateResponseAndEnquiredOn
} from '../../actions/AdmissionAction';
import { fetchResponseTypes } from '../../actions/ResponseTypeActions';

const initialState = {
  name: '',
  email: '',
  number: ''
};

class WalkinClarification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: initialState,
      selectAll: false,
      selection: [],
      showTable: false,
      showFeedback: false,
      feedback: '',
      selectedRow: {},
      showModal: false,
      responseType: '',
      enquiredOn: ''
    };
  }

  componentDidMount() {
    const { currentOrganisation, currentAcademicYear } = this.props;
    if (!currentOrganisation.id || !currentAcademicYear) {
      this.props.router.push('/error');
    }
  }

  onSearchClick = () => {
    const { name, email, number } = this.state.form;
    if (name !== '' || email !== '' || number !== '') {
      this.props
        .dispatch(fetchEnquiresByStudent({ name, email, number }))
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
      alert('Please fill at least on field to continue!');
    }
  };

  setResponseTypeAndEnquiredOn = () => {
    const { responseType, enquiredOn, selectedRow } = this.state;
    if (responseType === '') {
      alert('Please select a response type to continue!');
    } else if (enquiredOn === '') {
      alert('Please select an enquiry date to continue!');
    } else {
      this.props
        .dispatch(
          updateResponseAndEnquiredOn(selectedRow.id, {
            responseType,
            dateOfEnquiry: enquiredOn
          })
        )
        .then(result => {
          if (result.error !== undefined && !result.error) {
            this.showFeedback(
              'Response type and enquiry date captured successfully!'
            );
            setTimeout(this.hideSnackBar, 2000);
            this.resetForm();
          }
        });
    }
  };

  getOptions = (array, label, value) =>
    array.map(data => (
      <option key={data.id} value={data[value]}>
        {data[label]}
      </option>
    ));

  openResponseTypeModal = row => {
    const { responseTypes } = this.props;
    if (responseTypes.length === 0) this.props.dispatch(fetchResponseTypes());
    this.setState({ showModal: true, selectedRow: row });
  };

  closeResponseModal = () => this.setState({ showModal: false });

  handleChange = name => ({ target: { value } }) => {
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });
  };

  handleChangeModal = name => value => {
    if (name === 'responseType') {
      this.setState({ [name]: value.target.value });
    } else {
      this.setState({ [name]: value });
    }
  };

  resetForm = () => {
    this.setState({
      form: { email: '', name: '', number: '' },
      selectAll: false,
      selection: [],
      showTable: false,
      selectedRow: {},
      showModal: false
    });
    this.resetModalForm();
  };

  resetModalForm = () => this.setState({ enquiredOn: '', responseType: '' });

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
      showModal,
      responseType,
      enquiredOn
    } = this.state;
    const { responseTypes } = this.props;
    return (
      <div className="browse-wrap padding">
        <Row>
          <Col lg={6} md={6} sm={6}>
            <FieldGroup
              id="name"
              type="text"
              label="Name of Student"
              placeholder="Enter name"
              onChange={this.handleChange('name')}
              value={form.name}
              validationState={null}
              help={null}
            />
          </Col>
          <Col lg={6} md={6} sm={6}>
            <FieldGroup
              id="number"
              type="text"
              label="Contact Number"
              placeholder="Enter number"
              onChange={this.handleChange('number')}
              value={form.number}
              validationState={null}
              help={null}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6} sm={6}>
            <FieldGroup
              id="email"
              type="text"
              label="Email ID"
              placeholder="Enter number"
              onChange={this.handleChange('email')}
              value={form.email}
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
            onClick={this.onSearchClick}
            bsStyle="primary"
          >
            Search
          </Button>
        </Row>
        {showTable && (
          <Row className="margin-top">
            <Col lg={12} md={12} sm={12} xs={12}>
              <EnquiriesTable
                selection={this.state.selection}
                selectAll={this.state.selectAll}
                data={this.props.admissions}
                toggleAll={this.toggleAll}
                toggleSelection={this.toggleSelection}
                onEnquiryNumberClick={this.openResponseTypeModal}
                showResponseRemarks
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
          <React.Fragment>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <label>Enquired on</label>
                <br />
                <DayPickerInput
                  style={{ width: '100%' }}
                  value={enquiredOn}
                  key={enquiredOn}
                  onDayChange={this.handleChangeModal('enquiredOn')}
                />
              </Col>
              <Col lg={12} md={12} sm={12}>
                <FieldSelect
                  id="responseType"
                  label="Response Type"
                  onChange={this.handleChangeModal('responseType')}
                  value={responseType}
                  validationState={null}
                  help={null}
                  options={this.getOptions(responseTypes, 'responseName', 'id')}
                  style={{ height: 'calc(35px - 0.375rem)' }}
                />
              </Col>
            </Row>
            <Row className="text-right">
              <Button
                style={{ marginRight: '15px' }}
                onClick={this.resetModalForm}
                bsStyle="primary"
              >
                Reset
              </Button>
              <Button
                style={{ marginRight: '15px' }}
                onClick={this.setResponseTypeAndEnquiredOn}
                bsStyle="primary"
              >
                Save
              </Button>
            </Row>
          </React.Fragment>
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
  admissions: state.preAdmissions.admissions,
  responseTypes: state.responseType.responseTypes,
  currentOrganisation: state.organisations.currentOrganisation,
  currentAcademicYear: state.academicYears.currentAcademicYear
});

export default connect(mapStateToProps)(WalkinClarification);
