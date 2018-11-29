import React from 'react';
import ReactSelect from 'react-select';

const errorIcon = <i className="fas fa-exclamation-circle" />;

const Select = ({
  label,
  options,
  multi,
  onChange,
  value,
  errors,
  labelClass,
  ...rest
}) => (
  <div className="input-group">
    <label htmlFor="color" className={`label ${labelClass}`}>
      {label}
    </label>
    <ReactSelect
      id="color"
      options={options}
      isMulti={multi}
      onChange={onChange}
      value={value}
      {...rest}
      styles={{ minHeight: '20px', height: '20px' }}
    />
    {errors.length > 0 && (
      <span style={{ color: 'red' }}>
        {errors.map(error => (
          <span key={error}>
            {errorIcon} {error}
          </span>
        ))}
      </span>
    )}
  </div>
);

Select.defaultProps = {
  multi: false,
  errors: [],
  labelClass: ''
};

export default Select;
