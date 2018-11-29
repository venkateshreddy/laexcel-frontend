import React from 'react';
import { Link } from 'react-router';
import Button from '../../components/Button/Button';

export default () => (
  <div>
    This is registration page.. Currently under development
    <div>
      <Link to={'login'}>
        <Button value="Back To Login Page" />
      </Link>
    </div>
  </div>
);
