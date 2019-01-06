import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import DefineFeeStructure from './DefineFeeStructure';
import { LargeModal } from '../../components/Modals';
import { fetchBatch } from '../../actions/batchactions';
import { fetchCourse } from '../../actions/courseactions';
import { fetchBranches } from '../../actions/BranchActions';
import { fetchFeeStructure, deleteFeeStructure } from '../../actions/feeStructureActions';
import { fetchFeeCode } from '../../actions/definefeecodeactions';
import './AdminView.scss';

const CheckboxTable = checkboxHOC(ReactTable);

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      columns: [{ Header: 'Academic Year', accessor: 'academicYear' },
      { Header: 'Branch', accessor: 'branch', Cell: (e) => <span>{this.renderBranch(e.original.branch)}</span> },
      { Header: 'Course Name', accessor: 'courseName', Cell: (e) => <span>{this.renderCourse(e.original.courseName)}</span> },
      { Header: 'Fee Details', accessor: 'feeStructure', className: 'adminview-cell-height', Cell: (e) => <span>{this.renderFeeStructure(e.original.feeStructure)}</span> }
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
    this.props.dispatch(fetchBatch());
    this.props.dispatch(fetchCourse());
    this.props.dispatch(fetchFeeStructure());
    this.props.dispatch(fetchBranches());
    this.props.dispatch(fetchFeeCode());
  }

  closeModal = () => {
    this.setState({ show: false });
  }

  openRegisterForm = () => {
    this.setState({ show: true });
  }

  openEditFeeStructure = () => {
    const key = '_id';
    this.props.feeStructure.map((data) => {
      if (data[key].toString() === this.state.selection[0].toString()) {
        this.setState({ formData: data });
      }
      return null;
    });
    this.setState({ show: true });
  }

  deleteFeeStructure = () => {
    this.props.dispatch(deleteFeeStructure(this.state.selection[0]));
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

  renderCourse = (courseId) => {
    const key = '_id';
    let name = '';
    this.props.course.map((course) => {
      if (course[key].toString() === courseId.toString()) {
        name = course.name;
      }
      return null;
    });
    return name;
  }

  renderBranch = (courseId) => {
    let name = '';
    this.props.branches.map((course) => {
      if (course.id.toString() === courseId.toString()) {
        name = course.name;
      }
      return null;
    });
    return name;
  }

  renderFeeStructure = (feeStructure) => {
    const feeString = feeStructure.map((fee) => {
      console.log(fee);
      return <Col lg={6} sm={6} md={6}>{fee.type} {fee.amount}</Col>;
    });
    return feeString;
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
          <Panel.Title componentClass="h3">Fee Structure</Panel.Title>
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
                  onClick={this.openEditFeeStructure}
                />
              )}
              {selection.length === 1 && (
                <i
                  className="fas fa-trash"
                  title="Delete branch"
                  onClick={this.deleteFeeStructure}
                />
              )}
            </div>
            <LargeModal
              show={this.state.show}
              header="Create Course Duration"
              onHide={this.closeModal}
              onSave={this.onSubmit}
              saveText="Submit"
              closeText="Close"
              resetText="Reset"
              showFooter={false}
              onReset={this.resetForm}
              style={{ margin: '0 auto' }}
            >
              <DefineFeeStructure formData={this.state.formData} closeModal={this.closeModal} />
            </LargeModal>
            <CheckboxTable
              ref={r => {
                this.checkboxTable = r;
              }} // TABLE
              data={this.props.feeStructure}
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
  return {
    feeStructure: state.feeStructure.feeStructure,
    course: state.course.course,
    batch: state.batch.batch,
    branches: state.branch.branches
  };
}
export default connect(mapStateToProps)(AdminView);
