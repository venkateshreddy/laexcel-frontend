import React from 'react';
import ReactTable from 'react-table';
import Panel from 'react-bootstrap/lib/Panel';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import { connect } from 'react-redux';
import DefineFeeCode from './DefineFeeCode';
import { LargeModal } from '../../components/Modals';
import { fetchFeeCode, deleteFeeCode } from '../../actions/definefeecodeactions';

const CheckboxTable = checkboxHOC(ReactTable);

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      columns: [{ Header: 'Type', accessor: 'type' },
      { Header: 'Code', accessor: 'code' }],
      form: {},
      selectAll: [],
      selection: [],
      filterable: false,
      formData: {},
      errors: {}
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchFeeCode());
  }
  closeModal = () => {
    this.setState({ show: false });
  }
  openRegisterForm = () => {
    this.setState({ show: true });
  }

  openEditFeeCode = () => {
    const key = '_id';
    this.props.feeCode.map((data) => {
      if (data[key].toString() === this.state.selection[0].toString()) {
        this.setState({ formData: data });
      }
      return null;
    });
    this.setState({ show: true });
  }

  deleteFeeCode = () => {
    this.props.dispatch(deleteFeeCode(this.state.selection[0]));
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
    return (<Panel bsStyle="primary">
      <Panel.Heading>
        <Panel.Title componentClass="h3">Fee Code</Panel.Title>
      </Panel.Heading>
      <Panel.Body><div>
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
              onClick={this.openEditFeeCode}
            />
          )}
          {selection.length === 1 && (
            <i
              className="fas fa-trash"
              title="Delete branch"
              onClick={this.deleteFeeCode}
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
          <DefineFeeCode formData={this.state.formData} closeModal={this.closeModal} />
        </LargeModal>
        <CheckboxTable
          ref={r => {
            this.checkboxTable = r;
          }} // TABLE
          data={this.props.feeCode}
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
  return { feeCode: state.feeCode.feeCode };
}
export default connect(mapStateToProps)(AdminView);
