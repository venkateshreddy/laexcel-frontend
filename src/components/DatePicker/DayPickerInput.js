import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const DayPicker = ({ style, value, onDayChange, ...rest }) => (
  <DayPickerInput
    style={style}
    value={value}
    key={value}
    onDayChange={onDayChange}
    {...rest}
  />
);

export default DayPicker;
