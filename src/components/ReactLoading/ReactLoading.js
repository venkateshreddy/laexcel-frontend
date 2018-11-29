import React from 'react';
import ReactLoading from 'react-loading';
import './ReactLoading.scss';

const Loading = () => (
  <div className="loader">
    <div className="loader-overlay" />
    <ReactLoading className="loader-style" type="spokes" color="#ffffff" />
  </div>
);

export default Loading;
