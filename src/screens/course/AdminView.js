import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import Panel from 'react-bootstrap/lib/Panel';
import Course from './course';
import { LargeModal } from '../../components/Modals';
import { fetchProgram } from '../../actions/programactions';
import { fetchCourse, deleteCourse } from '../../actions/courseactions';

const CheckboxTable = checkboxHOC(ReactTable);

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      columns: [{ Header: 'Program', accessor: 'program', Cell: (e) => <span>{this.renderProgram(e.original.program)}</span> },
        { Header: 'Course Name', accessor: 'name' },
        { Header: 'Course Code', accessor: 'code' }
      ],
      selectAll: [],
      selection: [],
      filterable: false,
      form: {},
      errors: {},
      formData: {}
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchProgram());
    this.props.dispatch(fetchCourse());
  }

  closeModal = () => {
    this.setState({ show: false, formData: {} });
  }

  deleteCourse = () => {
    this.props.dispatch(deleteCourse(this.state.selection[0])).then(() => {
      this.setState({ selection: [] });
    });
  }

  openRegisterForm = () => {
    this.setState({ show: true });
  }
  openCourseEditForm = () => {
    const key = '_id';
    this.props.course.map((data) => {
      if (data[key].toString() === this.state.selection[0].toString()) {
        this.setState({ formData: data });
      }
      return null;
    });
    this.setState({ show: true });
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
          <Panel.Title componentClass="h3">Course</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div>
            <div className="action-icons">
              <i
                className="fas fa-plus"
                title="add course"
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
                  title="edit course"
                  onClick={this.openCourseEditForm}
                />
              )}
              {selection.length === 1 && (
                <i
                  className="fas fa-trash"
                  title="delete course"
                  onClick={this.deleteCourse}
                />
              )}
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
              <Course closeModal={this.closeModal} formData={this.state.formData} />
            </LargeModal>
            <Row className="action-wrap">
              <CheckboxTable
                ref={r => {
                  this.checkboxTable = r;
                }} // TABLE
                data={this.props.course}
                filterable={this.state.filterable}
                columns={columns}
                defaultPageSize={10}
                className="-striped -highlight"
                {...checkboxProps}
              />
            </Row>
          </div>
        </Panel.Body>
      </Panel>);
  }
}
function mapStateToProps(state) {
  return { course: state.course.course, program: state.program.program };
}
export default connect(mapStateToProps)(AdminView);
