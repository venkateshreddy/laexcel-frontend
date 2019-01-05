import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CheckBoxTable } from '../../components/Table';
import CampusForm from './CampusForm';
import { fetchBranches } from '../../actions/BranchActions';
import { fetchCities } from '../../actions/CityActions';
import { fetchCampuses } from '../../actions/CampusActions';

const columns = [
  { Header: 'Campus Name', accessor: 'campusName' },
  { Header: 'Campus Code', accessor: 'campusCode' },
  { Header: 'Branch', accessor: 'branchName' },
  {
    Header: 'Campus Address',
    accessor: 'address',
    Cell: row => (
      <div>
        <div>
          {row.original.address.line1}, {row.original.address.line2},{' '}
          {row.original.address.line3}
        </div>
        <div>
          {row.original.cityName}, {row.original.pincode}
        </div>
      </div>
    )
  }
];

class Campus extends Component {
  state = {
    selection: [],
    filterable: false,
    selectAll: false
  };

  componentDidMount() {
    const { currentOrganisation, currentAcademicYear } = this.props;
    if (currentOrganisation.id && currentAcademicYear.id) {
      this.props.dispatch(fetchCampuses());
      this.props.dispatch(fetchBranches());
      this.props.dispatch(fetchCities());
    } else {
      this.props.router.push('/error');
    }
  }

  toggleAll = (selectAll, selection) => this.setState({ selectAll, selection });

  toggleSelection = selection => this.setState({ selection });

  render() {
    const { selection, filterable, selectAll } = this.state;
    const { campuses } = this.props;
    return (
      <div>
        <CampusForm selection={selection} />
        <CheckBoxTable
          enableMultiSelect={false}
          enableSelectAll={false}
          selection={selection}
          selectAll={selectAll}
          toggleAll={this.toggleAll}
          toggleSelection={this.toggleSelection}
          data={campuses}
          columns={columns}
          filterable={filterable}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  campuses: state.campus.campuses,
  currentOrganisation: state.organisations.currentOrganisation,
  currentAcademicYear: state.academicYears.currentAcademicYear
});

export default connect(mapStateToProps)(Campus);
