import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const FieldSelect = ({
  id,
  label,
  help,
  validationState,
  options,
  ...props
}) => (
  <FormGroup controlId={id} validationState={validationState}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl componentClass="select" {...props}>
      {options}
    </FormControl>
    <FormControl.Feedback />
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
);

FieldSelect.defaultProps = {
  validationState: null,
  help: null
};

FieldSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  validationState: PropTypes.string,
  options: PropTypes.any.isRequired
};

export default FieldSelect;
