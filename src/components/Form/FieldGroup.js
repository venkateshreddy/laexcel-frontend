import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const FieldGroup = ({ id, label, help, validationState, clear, ...props }) => (
  <FormGroup controlId={id} validationState={validationState}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
    <FormControl.Feedback />
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
);

FieldGroup.defaultProps = {
  validationState: null,
  help: null
};

FieldGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  validationState: PropTypes.string
};

export default FieldGroup;
