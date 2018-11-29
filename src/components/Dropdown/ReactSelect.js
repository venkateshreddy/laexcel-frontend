import React from 'react';
import Select from 'react-select';

class ReactSelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values
    this.props.onChange(value);
  };

  // handleBlur = () => {
  //   // this is going to call setFieldTouched and manually update touched
  //   this.props.onBlur(this.props.id, true);
  // };

  render() {
    // console.log(this.props);
    return (
      <div>
        {/* <label htmlFor="color">
          <strong>{this.props.label}</strong>
        </label> */}
        <Select
          id="color"
          options={this.props.options}
          isMulti={this.props.isMulti}
          onChange={this.handleChange}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          // onBlur={this.handleBlur}
          value={this.props.value}
          key={this.props.key}
        />
        {!!this.props.error &&
          this.props.touched && (
            <div style={{ color: 'red', marginTop: '.5rem' }}>
              {this.props.error}
            </div>
          )}
      </div>
    );
  }
}

export default ReactSelect;
