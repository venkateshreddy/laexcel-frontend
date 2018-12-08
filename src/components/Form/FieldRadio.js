import React, { Fragment } from 'react';
import { FormGroup, HelpBlock, Radio } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FieldRadio = ({
  id,
  checked,
  values,
  help,
  validationState,
  ...props
}) => (
  <FormGroup controlId={id} validationState={validationState}>
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
  help: null
};

FieldRadio.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.string.isRequired,
  // inline: PropTypes.bool.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  help: PropTypes.string,
  validationState: PropTypes.string
};

export default FieldRadio;
