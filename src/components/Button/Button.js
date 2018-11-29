import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  button: {
    margin: '0px'
  }
};

function ContainedButtons(props) {
  const { classes } = props;
  const propsData = props;
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      disabled={propsData.disabled}
      onClick={propsData.onClick}
      href={propsData.href}
    >
      {propsData.value}
    </Button>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContainedButtons);
