import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ text, htmlFor, ...rest }) => (
  <label htmlFor={htmlFor} {...rest}>
    {text}
  </label>
);

Text.propTypes = {
  text: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired
};

export default Text;
