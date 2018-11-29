import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

const SimpleSnackbar = props => {
  const { classes } = props;
  return (
    <div className="snackbar-wrap">
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={props.open}
        autoHideDuration={2000}
        onClose={() => props.onClose()}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{props.msg}</span>}
        action={[
          // <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
          //   UNDO
          // </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={() => props.onClose()}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
};

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSnackbar);
