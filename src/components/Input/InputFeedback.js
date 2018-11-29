import React from 'react';

const errorIcon = <i className="fas fa-exclamation-circle" />;

const InputFeedback = ({ error }) => {
  if (error) {
    return (
      <div className="text-right">
        <span style={{ color: 'red', fontSize: '10px' }}>
          <span key={error}>
            {errorIcon} {error}
          </span>
        </span>
      </div>
    );
  }
  return null;
};

export default InputFeedback;
