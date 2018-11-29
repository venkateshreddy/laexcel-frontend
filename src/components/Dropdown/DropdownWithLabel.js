import React from 'react';
import PropTypes from 'prop-types';

import { Text, Dropdown } from '../';

const DropdownWithLabel = ({ name, text, value, onChange, options }) => (
  <div>
    <div>
      <Text text={text} htmlFor={name} />
    </div>
    <div>
      <Dropdown
        options={options}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

DropdownWithLabel.propTypes = {
  options: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default DropdownWithLabel;
