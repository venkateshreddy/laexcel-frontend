import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = {
  root: {
    // display: 'flex',
    display: 'inline',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: '8px 3px',
    height: '25px',
    fontSize: '11px'
  }
};

const OutlinedChips = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Chip
        label={props.chipLabel}
        className={classes.chip}
        variant="outlined"
      />
    </div>
  );
};

OutlinedChips.propTypes = {
  classes: PropTypes.object.isRequired,
  chipLabel: PropTypes.string.isRequired
};

export default withStyles(styles)(OutlinedChips);
