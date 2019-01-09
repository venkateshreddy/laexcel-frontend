import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';
import moment from 'moment';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import { LargeModal } from '../../components/Modals';

import './AdminView.scss';
import TabsView from './TabsView';
import { fetchAllAdmissions } from '../../actions/AdmissionActions';

const CheckboxTable = checkboxHOC(ReactTable);

class AdmissionsScreenInitialView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      columns: [
        { Header: 'Organization', accessor: 'organization' },
        { Header: 'Academic Year', accessor: 'academicYear' },
        { Header: 'Admission Number', accessor: 'admissionNumber' },
        {
          Header: 'Branch',
          accessor: 'branch'
        },
        {
          Header: 'Name',
          accessor: 'firstName',
          Cell: row => this.getFullName(row)
        },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Contact Number', accessor: 'contactNumber' },
        {
          Header: 'DoB',
          accessor: 'dob',
          Cell: row => (row.value ? moment(row.value).format('DD-MM-YYYY') : '')
        }
      ],
      form: {},
      errors: {},
      selectAll: [],
      selection: [],
      filterable: false,
      formData: {}
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchAllAdmissions());
  }

  getFullName = row => {
    let fullName = '';
    if (row.original) {
      if (row.original.firstName) {
        fullName += row.original.firstName;
      }
      if (row.original.middleName) {
        fullName += ` ${row.original.middleName}`;
      }
      if (row.original.lastName) {
        fullName += ` ${row.original.lastName}`;
      }
    } else {
      fullName = row.value;
    }
    return fullName;
  };

  closeModal = () => {
    this.setState({ show: false });
  };

  openRegisterForm = () => {
    this.setState({ show: true });
  };

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
    this.setState({ selection }, () => {});
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
  };

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
    const { columns } = this.state;
    const { admissions } = this.props;
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Admissions Screen</Panel.Title>
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
            </div>
            <LargeModal
              show={this.state.show}
              header="Create Admission"
              onHide={this.closeModal}
              onSave={this.onSubmit}
              saveText="Submit"
              closeText="Close"
              resetText="Reset"
              showFooter={false}
              onReset={this.resetForm}
              style={{ margin: '0 auto' }}
            >
              {/* <DefineFeeStructure
                formData={this.state.formData}
                closeModal={this.closeModal}
              /> */}
              <TabsView closeModal={this.closeModal} />
            </LargeModal>
            <CheckboxTable
              ref={r => {
                this.checkboxTable = r;
              }} // TABLE
              data={admissions}
              filterable={this.state.filterable}
              columns={columns}
              defaultPageSize={10}
              className="-striped -highlight"
              {...checkboxProps}
            />
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}
function mapStateToProps(state) {
  return {
    admissions: state.admissions.admissions
  };
}
export default connect(mapStateToProps)(AdmissionsScreenInitialView);
