import React from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

export default props => (
  <div>
    <form>
      <FormGroup>
        <ControlLabel>State Name</ControlLabel>
        <FormControl
          type="text"
          value={props.formData.stateName}
          name="stateName"
          placeholder="Enter State Name"
          onChange={e => props.handleChange(e)}
        />
        <br />
        <ControlLabel>State Code</ControlLabel>
        <FormControl
          type="text"
          value={props.formData.stateCode}
          name="stateCode"
          placeholder="Enter State Code - 2 Digit"
          onChange={e => props.handleChange(e)}
        />
      </FormGroup>
    </form>
  </div>
);
