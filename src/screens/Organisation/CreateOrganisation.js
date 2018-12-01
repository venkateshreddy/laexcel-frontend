import React from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

export default props => (
  <div>
    <form>
      <FormGroup>
        <ControlLabel>Legal Status</ControlLabel>
        <FormControl componentClass="select" placeholder="Select State">
          <option value="">Select Legal Status</option>
          <option value="Company">Company</option>
          <option value="Partnership">Partnership</option>
          <option value="ProprietoryConcern">Proprietory Concern</option>
        </FormControl>
        <br />
        <ControlLabel>Organisation Name</ControlLabel>
        <FormControl
          type="text"
          value={props.formData.organisationName}
          name="organisationName"
          placeholder=""
          onChange={e => props.handleChange(e)}
        />
        <br />
        <ControlLabel>Organisation Short Name</ControlLabel>
        <FormControl
          type="text"
          value={props.formData.shortName}
          name="shortName"
          placeholder=""
          onChange={e => props.handleChange(e)}
        />
        <br />
        <ControlLabel>Registered Office Address</ControlLabel>
        <FormControl
          type="text"
          value={props.formData.line1}
          name="line1"
          placeholder="line1"
          onChange={e => props.handleChange(e)}
        />
        <FormControl
          type="text"
          value={props.formData.line2}
          name="line2"
          placeholder="line2"
          onChange={e => props.handleChange(e)}
        />
        <FormControl
          type="text"
          value={props.formData.line3}
          name="line3"
          placeholder="line3"
          onChange={e => props.handleChange(e)}
        />
        <br />
        <ControlLabel>City</ControlLabel>
        <FormControl
          type="text"
          value={props.formData.city}
          name="city"
          placeholder="Enter City Name"
          onChange={e => props.handleChange(e)}
        />
        <br />
        <ControlLabel>Select State</ControlLabel>
        <FormControl componentClass="select" placeholder="Select State">
          <option value="">Select State</option>
          <option value="New York">New York</option>
          <option value="Victoria">Victoria</option>
        </FormControl>
        <br />
        <ControlLabel>PIN Code</ControlLabel>
        <FormControl
          type="number"
          value={props.formData.pinCode}
          name="pinCode"
          placeholder=""
          onChange={e => props.handleChange(e)}
        />
        <br />
        <ControlLabel>PAN</ControlLabel>
        <FormControl
          type="text"
          value={props.formData.pan}
          name="pan"
          placeholder=""
          onChange={e => props.handleChange(e)}
        />
      </FormGroup>
    </form>
  </div>
);
