import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import moment from 'moment';
import CourseDuration from './CourseDuration';
import { LargeModal } from '../../components/Modals';
import { fetchBatch } from '../../actions/batchactions';
import { fetchCourse } from '../../actions/courseactions';
import { fetchCourseDuration } from '../../actions/courseDurationActions';

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      columns: [{ Header: 'Academic Year', accessor: 'academicYear' },
      { Header: 'Course Name', accessor: 'courseName', Cell: (e) => <span>{this.renderCourse(e.original.courseName)}</span> },
      { Header: 'Batch', accessor: 'batch', Cell: (e) => <span>{this.renderBatch(e.original.batch)}</span> },
      { Header: 'Course Duration', accessor: 'courseDuration' },
      { Header: 'Months', accessor: 'months' },
      { Header: 'From Date', accessor: 'fromDate', Cell: (e) => <span>{this.formatHireDateUserFriendly(e.original.fromDate)}</span> },
      { Header: 'To Date', accessor: 'toDate', Cell: (e) => <span>{this.formatHireDateUserFriendly(e.original.toDate)}</span> }
      ],
      form: {},
      errors: {}
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchBatch());
    this.props.dispatch(fetchCourse());
    this.props.dispatch(fetchCourseDuration());
  }

  closeModal = () => {
    this.setState({ show: false });
  }
  openRegisterForm = () => {
    this.setState({ show: true });
  }

  formatHireDateUserFriendly(inputDate) {
    const formattedHireDateDay =
      inputDate && inputDate !== null
        ? moment(inputDate).format('MM/DD/YYYY')
        : null;
    return formattedHireDateDay;
  }

  renderBatch = (programId) => {
    const key = '_id';
    let name = '';
    this.props.batch.map((program) => {
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
        <CourseDuration closeModal={this.closeModal} />
      </LargeModal>
      <ReactTable
        data={this.props.courseDuration}
        columns={columns}
        defaultPageSize={10}
      />
    </div>);
  }
}
function mapStateToProps(state) {
  return {
    courseDuration: state.courseDuration.courseDuration,
    course: state.course.course,
    batch: state.batch.batch
  };
}
export default connect(mapStateToProps)(AdminView);
