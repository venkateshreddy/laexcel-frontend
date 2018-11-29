import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import checkboxHOC from 'react-table/lib/hoc/selectTable';

const CheckboxTable = checkboxHOC(ReactTable);

const original = '_original';
const objectId = '_id';

class CheckBoxTable extends React.Component {
  toggleSelection = key => {
    // console.log(this.props.data);
    // console.log('row', row);
    let selection = [...this.props.selection];
    const keyIndex = selection.indexOf(key);
    if (keyIndex >= 0) {
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      selection.push(key);
    }
    // this.setState({ selection });
    // console.log(selection);
    this.props.toggleSelection(selection);
  };

  toggleAll = () => {
    const selectAll = !this.props.selectAll;
    const selection = [];
    if (selectAll) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      currentRecords.forEach(item => {
        selection.push(item[original][objectId]);
      });
    }
    // this.setState({ selectAll, selection });
    this.props.toggleAll(selectAll, selection);
  };

  isSelected = key =>
    //  this.state.selection.includes(key);
    this.props.selection.includes(key);

  render() {
    const { toggleSelection, toggleAll, isSelected } = this;
    const { data, columns, selectAll } = this.props;
    // console.log(data);
    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: 'checkbox',
      getTrProps: (s, r) => {
        if (r) {
          const selected = this.isSelected(r.original[objectId]);
          return {
            style: {
              backgroundColor: selected ? '#ccc' : 'inherit'
            }
          };
        }
        return '';
      }
    };

    return (
      <div>
        <CheckboxTable
          // eslint-disable-next-line
          ref={r => (this.checkboxTable = r)}
          data={data}
          columns={columns}
          defaultPageSize={5}
          className="-striped -highlight"
          {...checkboxProps}
          filterable={this.props.filterable}
        />
      </div>
    );
  }
}

export default CheckBoxTable;
