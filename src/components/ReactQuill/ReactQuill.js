import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default props => (
  <div>
    <ReactQuill value={props.value} onChange={props.onChange} />
  </div>
);
