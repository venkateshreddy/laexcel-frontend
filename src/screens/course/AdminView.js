import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import Course from './course';
import { LargeModal } from '../../components/Modals';
import { fetchProgram } from '../../actions/programactions';
import { fetchCourse } from '../../actions/courseactions';

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      columns: [{ Header: 'Program', accessor: 'program', Cell: (e) => <span>{this.renderProgram(e.original.program)}</span> },
      { Header: 'Course Name', accessor: 'name' },
      { Header: 'Course Code', accessor: 'code' }
      ],
      form: {},
      errors: {}
    };
  }
  componentWillMount() {
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
    this.props.program.map((program) => {
      if (program[key].toString() === programId.toString()) {
        name = program.name;
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
        header="Create Course"
        onHide={this.closeModal}
        onSave={this.onSubmit}
        saveText="Submit"
        closeText="Close"
        resetText="Reset"
        showFooter={false}
        onReset={this.resetForm}
        style={{ margin: '0 auto' }}
      >
        <Course closeModal={this.closeModal} />
      </LargeModal>
      <ReactTable
        data={this.props.course}
        columns={columns}
        defaultPageSize={10}
      />
    </div>);
  }
}
function mapStateToProps(state) {
  return { course: state.course.course, program: state.program.program };
}
export default connect(mapStateToProps)(AdminView);
