import React from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

export default props => (
  <div>
    <form>
      <FormGroup>
        <ControlLabel>City Name</ControlLabel>
        <FormControl
          type="text"
          value={props.formData.cityName}
          name="cityName"
          placeholder="Enter City Name"
          onChange={e => props.handleChange(e)}
        />
        <br />
        <ControlLabel>City Code</ControlLabel>
        <FormControl
          type="text"
          value={props.formData.cityCode}
          name="cityCode"
          placeholder="Enter State Code - 3/4 Digit"
          onChange={e => props.handleChange(e)}
        />
        <br />
        <ControlLabel>Select State</ControlLabel>
        <FormControl componentClass="select" placeholder="Select State">
          <option value="">Select State</option>
          <option value="New York">New York</option>
          <option value="Victoria">Victoria</option>
        </FormControl>
      </FormGroup>
    </form>
  </div>
);
