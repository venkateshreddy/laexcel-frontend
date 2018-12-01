import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CheckBoxTable } from '../../components/Table';
import BranchForm from './BrachForm';
import { fetchBranches } from '../../actions/BranchActions';
import { fetchCities } from '../../actions/CityActions';

const columns = [
  { Header: 'Branch Name', accessor: 'name' },
  { Header: 'Branch Code', accessor: 'code' },
  {
    Header: 'Branch Address',
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

class Branch extends Component {
  state = {
    selection: [],
    filterable: false,
    selectAll: false
  };

  componentDidMount() {
    this.props.dispatch(fetchBranches());
    this.props.dispatch(fetchCities());
  }

  toggleAll = (selectAll, selection) => this.setState({ selectAll, selection });

  toggleSelection = selection => this.setState({ selection });

  render() {
    const { selection, filterable, selectAll } = this.state;
    const { branches } = this.props;
    return (
      <div>
        <BranchForm />
        <CheckBoxTable
          enableMultiSelect={false}
          enableSelectAll={false}
          selection={selection}
          selectAll={selectAll}
          toggleAll={this.toggleAll}
          toggleSelection={this.toggleSelection}
          data={branches}
          columns={columns}
          filterable={filterable}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  branches: state.branch.branches,
  cities: state.cities.cities
});

export default connect(mapStateToProps)(Branch);
