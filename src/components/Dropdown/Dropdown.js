import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ options, value, onChange, name }) => (
  <select
    className="fullWidth custom-select"
    value={value}
    name={name}
    onChange={onChange}
  >
    <option value="" disabled>
      --select--
    </option>
    {options}
  </select>
);

Dropdown.propTypes = {
  options: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default Dropdown;
