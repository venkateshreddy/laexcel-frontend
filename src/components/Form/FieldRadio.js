import React, { Fragment } from 'react';
import { FormGroup, HelpBlock, Radio, ControlLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FieldRadio = ({
  id,
  checked,
  values,
  help,
  validationState,
  label,
  ...props
}) => (
  <FormGroup controlId={id} validationState={validationState}>
    {label && <ControlLabel>{label}</ControlLabel>}
    {values.map((value, i) => (
      <Fragment key={i}>
        <Radio name={value} checked={value === checked} {...props}>
          {value}
        </Radio>{' '}
        {help && <HelpBlock>{help}</HelpBlock>}
      </Fragment>
    ))}
  </FormGroup>
);

FieldRadio.defaultProps = {
  validationState: null,
  help: null,
  label: null
};

FieldRadio.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.string.isRequired,
  // inline: PropTypes.bool.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  help: PropTypes.string,
  validationState: PropTypes.string,
  label: PropTypes.string
};

export default FieldRadio;
