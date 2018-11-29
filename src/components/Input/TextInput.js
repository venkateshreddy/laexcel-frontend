import React from 'react';
import { Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import { InputFeedback } from './';
import { Label } from '../Label';

const TextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className = '',
  ...props
}) => {
  const classes = classnames('input-group', className);
  const inputWidth = label ? 8 : 12;
  return (
    <div className={classes}>
      <Row>
        {label && (
          <Col
            lg={4}
            md={4}
            sm={4}
            xs={12}
            className="np-left np-right paddingTop10"
          >
            <Label htmlFor={id} error={error}>
              {label}
            </Label>
          </Col>
        )}
        <Col
          lg={inputWidth}
          md={inputWidth}
          sm={inputWidth}
          xs={inputWidth}
          className={label ? 'np-right' : 'no-padding'}
        >
          <div>
            <input
              id={id}
              className="text-input"
              type={type}
              // value={value}
              onChange={onChange}
              {...props}
            />
            <InputFeedback error={error} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TextInput;
