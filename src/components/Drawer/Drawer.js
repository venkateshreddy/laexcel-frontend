import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import { drawerHeader, drawerBody } from '../Grid/Grid';
import './Drawer.scss';

class MyDrawer extends Component {
  render() {
    const { anchor, open, onClose, children, ...rest } = this.props;
    return (
      <Drawer
        {...rest}
        anchor={anchor}
        open={open}
        onClose={() => onClose(this.props.anchor, false)}
        classes={{ paper: 'drawer-background' }}
      >
        <div
          style={{
            minWidth: '500px',
            maxWidth: '1150px'
          }}
        >
          <div onClick={() => onClose(this.props.anchor, false)}>
            {drawerHeader}
          </div>
          <div>{drawerBody(children)}</div>
          <div />
        </div>
      </Drawer>
    );
  }
}

MyDrawer.propTypes = {
  anchor: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired
};

export default MyDrawer;
