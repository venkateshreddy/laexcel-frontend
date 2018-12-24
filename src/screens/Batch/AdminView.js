import React from 'react';
import ReactTable from 'react-table';
import { Row } from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import { connect } from 'react-redux';
import Batch from './batch';
import { LargeModal } from '../../components/Modals';
import { fetchBatch } from '../../actions/batchactions';
import { fetchProgram } from '../../actions/programactions';
import { fetchCourse } from '../../actions/courseactions';

const CheckboxTable = checkboxHOC(ReactTable);

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
      errors: {},
      selectAll: [],
      selection: []
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
          <Panel.Title componentClass="h3">Batch</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div>
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
                // onClick={this.openModal(EDIT)}
                />
              )}
              {selection.length >= 1 && (
                <i
                  className="fas fa-trash"
                  title="Delete branch"
                // onClick={this.deleteBranches}
                />
              )}
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
            <Row className="action-wrap">
              <CheckboxTable
                ref={r => {
                  this.checkboxTable = r;
                }} // TABLE
                data={this.props.batch}
                filterable
                columns={columns}
                defaultPageSize={10}
                className="-striped -highlight"
                {...checkboxProps}
              />
            </Row>
          </div></Panel.Body></Panel>);
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
