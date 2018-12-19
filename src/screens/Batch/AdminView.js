import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import Batch from './batch';
import { LargeModal } from '../../components/Modals';
import { fetchBatch } from '../../actions/batchactions';
import { fetchProgram } from '../../actions/programactions';
import { fetchCourse } from '../../actions/courseactions';

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      columns: [{ Header: 'Program', accessor: 'program', Cell: (e) => <span>{this.renderProgram(e.original.program)}</span> },
      { Header: 'Course', accessor: 'course', Cell: (e) => <span>{this.renderCourse(e.original.course)}</span> },
      { Header: 'Batch Name', accessor: 'name' },
      { Header: 'Batch Code', accessor: 'code' }
      ],
      form: {},
      errors: {}
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchBatch());
    this.props.dispatch(fetchProgram());
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
        <Batch closeModal={this.closeModal} />
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
