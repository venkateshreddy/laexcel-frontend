import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CheckBoxTable } from '../../components/Table';
import BranchForm from './BranchForm';
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

  getBranchesTableData = branches =>
    branches.map(branch => ({ _id: branch.id, ...branch }));

  toggleAll = (selectAll, selection) => this.setState({ selectAll, selection });

  toggleSelection = selection => this.setState({ selection });

  render() {
    const { selection, filterable, selectAll } = this.state;
    const { branches } = this.props;
    const branchesTableData = this.getBranchesTableData(branches);
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
          data={branchesTableData}
          columns={columns}
          filterable={filterable}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  branches: state.branch.branches
});

export default connect(mapStateToProps)(Branch);
