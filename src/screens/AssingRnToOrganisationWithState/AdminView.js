import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import GstRates from './gstRates';
import { LargeModal } from '../../components/Modals';
import { fetchStates } from '../../actions/StateAction';
import { fetchOrganisations } from '../../actions/OrganisationActions';
import { fetchGstRate } from '../../actions/gstRatesActions';

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      columns: [{ Header: 'Organization', accessor: 'organization', Cell: (e) => <span>{this.renderOrganisation(e.original.organization)}</span> },
      { Header: 'State', accessor: 'state', Cell: (e) => <span>{this.renderState(e.original.state)}</span> },
      { Header: 'Gst Registeration Number', accessor: 'gstRegisterationNumber' }
      ],
      form: {},
      errors: {}
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchGstRate());
    this.props.dispatch(fetchStates());
    this.props.dispatch(fetchOrganisations());
  }
  closeModal = () => {
    this.setState({ show: false });
  }
  openRegisterForm = () => {
    this.setState({ show: true });
  }

  renderOrganisation = (id) => {
    let name = '';
    this.props.organisations.map((organisation) => {
      if (organisation.id.toString() === id.toString()) {
        name = organisation.orgName;
      }
      return null;
    });
    return name;
  }

  renderState = (id) => {
    let name = '';
    this.props.states.map((state) => {
      if (state.id.toString() === id.toString()) {
        name = state.stateName;
      }
      return null;
    });
    return name;
  }
  render() {
    const { columns } = this.state;
    return (<div>
      <div className="action-icons">
        <i
          className="fas fa-plus"
          title="Register Employee"
          onClick={this.openRegisterForm}
        />
        {/* {selection.length <= 1 && (
          <i
            className="fas fa-pencil-alt"
            title="Edit branch"
            onClick={this.openModal(EDIT)}
          />
        )} */}
        {/* {selection.length >= 1 && (
          <i
            className="fas fa-trash"
            title="Delete branch"
            onClick={this.deleteBranches}
          />
        )} */}
      </div>
      <LargeModal
        show={this.state.show}
        header="Define Fee Code"
        onHide={this.closeModal}
        onSave={this.onSubmit}
        saveText="Submit"
        closeText="Close"
        resetText="Reset"
        showFooter={false}
        onReset={this.resetForm}
        style={{ margin: '0 auto' }}
      >
        <GstRates closeModal={this.closeModal} />
      </LargeModal>
      <ReactTable
        data={this.props.gstRates}
        columns={columns}
        defaultPageSize={10}
      />
    </div>);
  }
}
function mapStateToProps(state) {
  return { gstRates: state.gstRates.gstRates, states: state.states.states, organisations: state.organisations.organisations };
}
export default connect(mapStateToProps)(AdminView);
