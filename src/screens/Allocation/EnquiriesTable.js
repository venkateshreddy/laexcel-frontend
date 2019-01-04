import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import { CheckBoxTable } from '../../components/Table';
import { LargeModal } from '../../components/Modals/';
import MoreInfo from './MoreInfo';
import Logs from './Logs';

const MORE_INFO = 'MORE_INFO';
const LOGS = 'LOGS';

class EnquiriesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Date of Enquiry',
          accessor: 'createdAt'
        },
        {
          Header: 'Enquiry Number',
          accessor: 'id',
          Cell: row => {
            if (row.value) {
              const enquiryNumber = row.value.substring(15);
              if (props.enquiryNumberClickable) {
                return (
                  <label
                    className="simulate-link"
                    onClick={() => props.onEnquiryNumberClick(row.original)}
                  >
                    {enquiryNumber}
                  </label>
                );
              }
              return enquiryNumber;
            }
            return '';
          }
        },
        { Header: 'Name of Student', accessor: 'StudentName' },
        { Header: 'Contact Number', accessor: 'ContactNumber' },
        { Header: 'Email', accessor: 'Email' },
        { Header: 'Program', accessor: 'Program' },
        { Header: 'Branch', accessor: 'others', Cell: () => '' },
        {
          Header: 'Status',
          accessor: 'isAcceptedByEmp',
          Cell: row => {
            if (row.value === null) {
              return <div>Pending</div>;
            }
            return row.value ? <div>Accepted</div> : <div>Rejected</div>;
          }
        }
      ],
      showModal: false,
      selectedRow: null,
      modalType: ''
    };
  }

  componentDidMount() {
    const columns = [...this.state.columns];
    const { showLogs, showMore, showResponseRemarks } = this.props;
    if (showResponseRemarks) {
      const responseTypeColumn = {
        Header: 'Response Type',
        accessor: 'responseType'
      };
      const remarksColumn = {
        Header: 'Remarks',
        accessor: 'remarks'
      };
      columns.push(responseTypeColumn);
      columns.push(remarksColumn);
    }
    if (showMore) {
      const showMoreColumn = {
        Header: 'More Details',
        accessor: 'id',
        Cell: row => (
          <label
            className="simulate-link"
            onClick={() => this.showMoreInfo(row.original)}
          >
            Show More Details
          </label>
        )
      };
      columns.push(showMoreColumn);
    }
    if (showLogs) {
      const showLogsColumn = {
        Header: 'Logs',
        accessor: 'id',
        Cell: row => (
          <label
            className="simulate-link"
            onClick={() => this.showLogs(row.original)}
          >
            Show Logs
          </label>
        )
      };
      columns.push(showLogsColumn);
    }
    //eslint-disable-next-line
    this.setState({ columns });
  }

  getModalContent = modalType => {
    const { selectedRow } = this.state;
    if (modalType === MORE_INFO) {
      return <MoreInfo data={selectedRow} rowId={selectedRow.id} />;
    } else if (modalType === LOGS) {
      return <Logs data={selectedRow} rowId={selectedRow.id} />;
    }
    return null;
  };

  toggleModal = (showModal, selectedRow, modalType) =>
    this.setState({
      showModal,
      selectedRow,
      modalType
    });

  showMoreInfo = row => {
    this.toggleModal(true, row, MORE_INFO);
  };

  showLogs = row => {
    this.toggleModal(true, row, LOGS);
  };

  closeModal = () => {
    this.toggleModal(false, null, '');
  };

  render() {
    const {
      selection,
      selectAll,
      data,
      toggleAll,
      toggleSelection
    } = this.props;
    const { columns, showModal, modalType } = this.state;
    return (
      <React.Fragment>
        <CheckBoxTable
          enableMultiSelect
          enableSelectAll
          selection={selection}
          selectAll={selectAll}
          data={data}
          columns={columns}
          filterable
          toggleAll={toggleAll}
          toggleSelection={toggleSelection}
        />
        <LargeModal
          show={showModal}
          header={startCase(modalType)}
          onHide={this.closeModal}
          showFooter={false}
        >
          {this.getModalContent(modalType)}
        </LargeModal>
      </React.Fragment>
    );
  }
}

EnquiriesTable.defaultProps = {
  enquiryNumberClickable: true,
  onEnquiryNumberClick: () => null,
  showResponseRemarks: false,
  showMore: true,
  showLogs: true
};

EnquiriesTable.propTypes = {
  selection: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectAll: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleAll: PropTypes.func.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  enquiryNumberClickable: PropTypes.bool,
  onEnquiryNumberClick: PropTypes.func,
  showMore: PropTypes.bool,
  showLogs: PropTypes.bool,
  showResponseRemarks: PropTypes.bool
};

export default EnquiriesTable;
