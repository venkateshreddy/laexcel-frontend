import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import CourseDuration from './CourseDuration';
import { LargeModal } from '../../components/Modals';
import { fetchBatch } from '../../actions/batchactions';
import { fetchCourse } from '../../actions/courseactions';

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      columns: [{ Header: 'Academic Year', accessor: 'academicYear' },
      { Header: 'Course Name', accessor: 'courseName', Cell: (e) => <span>{this.renderCourse(e.original.course)}</span> },
      { Header: 'Batch', accessor: 'batch' },
      { Header: 'Course Duration', accessor: 'courseDuration' },
      { Header: 'Months', accessor: 'months' },
      { Header: 'From Date', accessor: 'fromDate' },
      { Header: 'To Date', accessor: 'toDate' }
      ],
      form: {},
      errors: {}
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchBatch());
    this.props.dispatch(fetchCourse());
  }

  closeModal = () => {
    this.setState({ show: false });
  }
  openRegisterForm = () => {
    this.setState({ show: true });
  }

  renderProgram = (programId) => {
    const key = '_id';
    let name = '';
    console.log(this.props.program, programId, 'sfsfsfs');
    this.props.program.map((program) => {
      if (program[key].toString() === programId.toString()) {
        name = program.name;
      }
      return null;
    });
    return name;
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
        header="Create Prgoram"
        onHide={this.closeModal}
        onSave={this.onSubmit}
        saveText="Submit"
        closeText="Close"
        resetText="Reset"
        showFooter={false}
        onReset={this.resetForm}
        style={{ margin: '0 auto' }}
      >
        <CourseDuration closeModal={this.closeModal} />
      </LargeModal>
      <ReactTable
        data={this.props.batch}
        columns={columns}
        defaultPageSize={10}
      />
    </div>);
  }
}
function mapStateToProps(state) {
  return {
    program: state.program.program,
    course: state.course.course,
    batch: state.batch.batch
  };
}
export default connect(mapStateToProps)(AdminView);
