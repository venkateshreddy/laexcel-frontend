import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import GstRate from './GstRate';
import { LargeModal } from '../../components/Modals';
import { fetchMasterGstRates, deleteGstRates } from '../../actions/mastergstrateactions';
import { fetchOrganisations } from '../../actions/OrganisationActions';

const CheckboxTable = checkboxHOC(ReactTable);

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      columns: [{ Header: 'Rate of Gst', accessor: 'rateOfGst' },
        { Header: 'CGST', accessor: 'cgst' },
        { Header: 'SGST', accessor: 'sgst' },
        { Header: 'IGST', accessor: 'igst' }
      ],
      form: {},
      formData: {},
      errors: {},
      selectAll: [],
      selection: [],
      filterable: false
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchMasterGstRates());
    this.props.dispatch(fetchOrganisations());
  }
  closeModal = () => {
    this.setState({ show: false });
  }
  openRegisterForm = () => {
    this.setState({ show: true });
  }

  openMasterGstRates = () => {
    const key = '_id';
    this.props.masterGstRates.map((data) => {
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

  render() {
    const { toggleSelection, toggleAll, isSelected } = this;
    const { selectAll, selection } = this.state;
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
    const { columns } = this.state;
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">GST Rate Configuration</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div>
            <div className="action-icons">
              <i
                className="fas fa-plus"
                title="Register Employee"
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
                  title="Edit branch"
                  onClick={this.openMasterGstRates}
                />
              )}
              {selection.length === 1 && (
                <i
                  className="fas fa-trash"
                  title="Delete branch"
                  onClick={this.deleteGstRates}
                />
              )}
            </div>
            <LargeModal
              show={this.state.show}
              header="Define GST Rate"
              onHide={this.closeModal}
              onSave={this.onSubmit}
              saveText="Submit"
              closeText="Close"
              resetText="Reset"
              showFooter={false}
              onReset={this.resetForm}
              style={{ margin: '0 auto' }}
            >
              <GstRate closeModal={this.closeModal} formData={this.state.formData} />
            </LargeModal>
            <CheckboxTable
              ref={r => {
                this.checkboxTable = r;
              }} // TABLE
              data={this.props.masterGstRates}
              filterable={this.state.filterable}
              columns={columns}
              defaultPageSize={10}
              className="-striped -highlight"
              {...checkboxProps}
            />
          </div></Panel.Body></Panel>);
  }
}
function mapStateToProps(state) {
  return {
    masterGstRates: state.masterGstRates.masterGstRates,
    organisations: state.organisations.organisations
  };
}
export default connect(mapStateToProps)(AdminView);
