import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import DefineFeeStructure from './DefineFeeStructure';
import { LargeModal } from '../../components/Modals';
import { fetchBatch } from '../../actions/batchactions';
import { fetchCourse } from '../../actions/courseactions';
import { fetchBranches } from '../../actions/BranchActions';
import { fetchFeeStructure } from '../../actions/feeStructureActions';
import { fetchFeeCode } from '../../actions/definefeecodeactions';
import './AdminView.scss';

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
      errors: {}
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
        <DefineFeeStructure closeModal={this.closeModal} />
      </LargeModal>
      <ReactTable
        data={this.props.feeStructure}
        columns={columns}
        defaultPageSize={10}
      />
    </div>);
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
