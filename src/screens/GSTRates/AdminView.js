import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import GstRates from './gstRates';
import { LargeModal } from '../../components/Modals';
import { fetchStates } from '../../actions/StateAction';
import { fetchOrganisations } from '../../actions/OrganisationActions';
import { fetchGstRate, deleteGstRates } from '../../actions/gstRatesActions';

const CheckboxTable = checkboxHOC(ReactTable);

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
      errors: {},
      selectAll: [],
      selection: [],
      filterable: false,
      formData: {}
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

  openEditGstRates = () => {
    const key = '_id';
    this.props.gstRates.map((data) => {
      if (data[key].toString() === this.state.selection[0].toString()) {
        this.setState({ formData: data });
      }
      return null;
    });
    this.setState({ show: true });
  }

  deleteGstRates = () => {
    this.props.dispatch(deleteGstRates(this.state.selection[0]));
  }

  toggleSelection = key => {
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    if (keyIndex >= 0) {
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      selection.push(key);
    }
    this.setState({ selection }, () => { });
  };

  toggleAll = () => {
    const selectAll = !this.state.selectAll;
    const selection = [];
    if (selectAll) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      const key1 = '_original';
      const key2 = '_id';
      currentRecords.forEach(item => {
        selection.push(item[key1][key2]);
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => this.state.selection.includes(key);

  toggleTableFilter = () => {
    this.setState({ filterable: !this.state.filterable });
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
    const { toggleSelection, toggleAll, isSelected } = this;
    const { selectAll } = this.state;
    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: 'checkbox',
      getTrProps: (s, r) => {
        const temp = 'id';
        const selected = r && r.original && this.isSelected(r.original[temp]);
        return {
          style: {
            backgroundColor: selected ? '#ccc' : 'inherit'
            // color: selected ? 'white' : 'inherit',
          }
        };
      }
    };
    const { columns, selection } = this.state;
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Assign GST Registeration Number</Panel.Title>
        </Panel.Heading>
        <Panel.Body><div>
          <div className="action-icons">
            <i
              className="fas fa-plus"
              title="add gst rate"
              onClick={this.openRegisterForm}
            />
            <i
              className="fas fa-filter"
              title="Filter Table"
              onClick={this.toggleTableFilter}
            />
            {selection.length === 1 && (
              <i
                className="fas fa-pencil-alt"
                title="Edit gst rate"
                onClick={this.openEditGstRates}
              />
            )}
            {selection.length === 1 && (
              <i
                className="fas fa-trash"
                title="Delete gst rate"
                onClick={this.deleteGstRates}
              />
            )}
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
            <GstRates formData={this.state.formData} closeModal={this.closeModal} />
          </LargeModal>
          <CheckboxTable
            ref={r => {
              this.checkboxTable = r;
            }} // TABLE
            data={this.props.gstRates}
            filterable={this.state.filterable}
            columns={columns}
            defaultPageSize={10}
            className="-striped -highlight"
            {...checkboxProps}
          />
        </div>
        </Panel.Body>
      </Panel>);
  }
}
function mapStateToProps(state) {
  return { gstRates: state.gstRates.gstRates, states: state.states.states, organisations: state.organisations.organisations };
}
export default connect(mapStateToProps)(AdminView);
