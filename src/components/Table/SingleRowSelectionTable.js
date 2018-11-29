import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import checkboxHOC from 'react-table/lib/hoc/selectTable';

const CheckboxTable = checkboxHOC(ReactTable);

// const original = '_original';
const objectId = '_id';

class SingleRowSelectionTable extends React.Component {
  toggleSelection = (key, shift, row) => {
    console.log('row', row);
    this.props.toggleSelection(row);
  };

  isSelected = key => {
    const id = '_id';
    if (this.props.selection[id] === key) {
      return true;
    }
    return false;
  };

  render() {
    const { toggleSelection, isSelected } = this;
    const { data, columns, selectAll, filterable } = this.props;
    // console.log(data);
    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      selectType: 'checkbox',
      getTrProps: (s, r) => {
        if (r) {
          const selected = this.isSelected(r.original[objectId]);
          return {
            style: {
              backgroundColor: selected ? 'lightgreen' : 'inherit'
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
          defaultPageSize={10}
          filterable={filterable}
          className="-striped -highlight"
          {...checkboxProps}
        />
      </div>
    );
  }
}

export default SingleRowSelectionTable;
