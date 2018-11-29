import React from 'react';
import Avatar from 'react-avatar-edit';

export default props => (
  <div style={{ width: '73vh', height: '27vh' }}>
    <div style={{ float: 'left', marginRight: '10vh', marginLeft: '8vh' }}>
      <Avatar
        width={200}
        height={200}
        onCrop={props.onCrop}
        onClose={props.onClose}
        // src={props.src}
      />
    </div>
    <img src={props.preview} alt="Preview" />
  </div>
);
