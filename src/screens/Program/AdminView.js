import React from 'react';
import ReactTable from 'react-table';
import Panel from 'react-bootstrap/lib/Panel';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import { connect } from 'react-redux';
import Program from './Program';
import { LargeModal } from '../../components/Modals';
import { fetchProgram, deleteProgram } from '../../actions/programactions';
import { fetchMasterGstRates } from '../../actions/mastergstrateactions';

const CheckboxTable = checkboxHOC(ReactTable);

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      columns: [{ Header: 'Name', accessor: 'name' },
        { Header: 'Code', accessor: 'code' },
        { Header: 'GST Applicable', accessor: 'gstApplicable' },
        { Header: 'Rate of GST', accessor: 'rateOfGst', Cell: (e) => <span>{this.renderGstRate(e.original.rateOfGst)}</span> }
      ],
      form: {},
      errors: {},
      filterable: false,
      selectAll: [],
      selection: [],
      formData: {}
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchProgram());
    this.props.dispatch(fetchMasterGstRates());
  }
  closeModal = () => {
    this.setState({ show: false, formData: {} });
  }
  openRegisterForm = () => {
    this.setState({ show: true });
  }
  openEditProgram = () => {
    const key = '_id';
    this.props.program.map((data) => {
      if (data[key].toString() === this.state.selection[0].toString()) {
        this.setState({ formData: data });
      }
      return null;
    });
    this.setState({ show: true });
  }
  deleteProgram = () => {
    this.props.dispatch(deleteProgram(this.state.selection[0]));
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

  renderGstRate = (rateId) => {
    let name = '';
    const key = '_id';
    this.props.masterGstRates.map((each) => {
      if (each[key].toString() === rateId.toString()) {
        name = each.rateOfGst;
      }
      return null;
    });
    return name;
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
          <Panel.Title componentClass="h3">Program</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div>
            <div className="action-icons">
              <i
                className="fas fa-plus"
                title="add program"
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
                  title="edit program"
                  onClick={this.openEditProgram}
                />
              )}
              {selection.length === 1 && (
                <i
                  className="fas fa-trash"
                  title="delete program"
                  onClick={this.deleteProgram}
                />
              )}
            </div>
            <LargeModal
              show={this.state.show}
              header="Create Program"
              onHide={this.closeModal}
              onSave={this.onSubmit}
              saveText="Submit"
              closeText="Close"
              resetText="Reset"
              showFooter={false}
              onReset={this.resetForm}
              style={{ margin: '0 auto' }}
            >
              <Program closeModal={this.closeModal} formData={this.state.formData} />
            </LargeModal>
            <CheckboxTable
              ref={r => {
                this.checkboxTable = r;
              }} // TABLE
              data={this.props.program}
              filterable={this.state.filterable}
              columns={columns}
              defaultPageSize={10}
              className="-striped -highlight"
              {...checkboxProps}
            />
          </div></Panel.Body>
      </Panel>);
  }
}
function mapStateToProps(state) {
  return {
    program: state.program.program,
    masterGstRates: state.masterGstRates.masterGstRates
  };
}
export default connect(mapStateToProps)(AdminView);
