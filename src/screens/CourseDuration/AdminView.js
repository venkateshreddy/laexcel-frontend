import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row } from 'react-bootstrap';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import CourseDuration from './CourseDuration';
import { LargeModal } from '../../components/Modals';
import { fetchBatch } from '../../actions/batchactions';
import { fetchCourse } from '../../actions/courseactions';
import { fetchCourseDuration } from '../../actions/courseDurationActions';

const CheckboxTable = checkboxHOC(ReactTable);

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
      errors: {},
      selectAll: [],
      selection: [],
      formData: {}
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

  openEditCourseDuration = () => {
    const key = '_id';
    this.props.courseDuration.map((data) => {
      if (data[key].toString() === this.state.selection[0].toString()) {
        this.setState({ formData: data });
      }
      return null;
    });
    this.setState({ show: true });
  }

  formatHireDateUserFriendly(inputDate) {
    const formattedHireDateDay =
      inputDate && inputDate !== null
        ? moment(inputDate).format('MM/DD/YYYY')
        : null;
    return formattedHireDateDay;
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
    return (<div>
      <div className="action-icons">
        <i
          className="fas fa-plus"
          title="Register Employee"
          onClick={this.openRegisterForm}
        />
        {selection.length <= 1 && (
          <i
            className="fas fa-pencil-alt"
            title="Edit branch"
            onClick={this.openEditCourseDuration}
          />
        )}
        {selection.length >= 1 && (
          <i
            className="fas fa-trash"
            title="Delete branch"
            onClick={this.deleteBranches}
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
        <CourseDuration closeModal={this.closeModal} formData={this.state.formData} />
      </LargeModal>
      <Row className="action-wrap">
        <CheckboxTable
          ref={r => {
            this.checkboxTable = r;
          }} // TABLE
          data={this.props.courseDuration}
          filterable={this.state.filterable}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
          {...checkboxProps}
        />
      </Row>
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
