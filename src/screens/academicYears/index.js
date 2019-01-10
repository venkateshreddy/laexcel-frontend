import React, { Component } from 'react';
import { connect } from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';
import { CheckBoxTable } from '../../components/Table';
import AddAcademicYear from './Form';
import { fetchAcademicYears } from '../../actions/AcademicYearActions';

const columns = [
  { Header: 'Academic Year', accessor: 'academicYear' },
  { Header: 'Status', accessor: 'status' }
];

class AcademicYear extends Component {
  state = {
    selection: [],
    filterable: false,
    selectAll: false
  };

  componentDidMount() {
    this.props.dispatch(fetchAcademicYears());
  }

  toggleAll = (selectAll, selection) => this.setState({ selectAll, selection });

  toggleSelection = selection => this.setState({ selection });

  render() {
    const { selection, filterable, selectAll } = this.state;
    const { academicYears } = this.props;
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Academic Years</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div>
            <AddAcademicYear selection={selection} />
            <CheckBoxTable
              enableMultiSelect={false}
              enableSelectAll={false}
              selection={selection}
              selectAll={selectAll}
              toggleAll={this.toggleAll}
              toggleSelection={this.toggleSelection}
              data={academicYears}
              columns={columns}
              filterable={filterable}
            />
          </div>
        </Panel.Body>
      </Panel >
    );
  }
}

const mapStateToProps = state => ({
  academicYears: state.academicYears.academicYears
});

export default connect(mapStateToProps)(AcademicYear);
