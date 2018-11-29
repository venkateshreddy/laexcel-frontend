import React from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';

import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  dialogPaper: {
    // backgroundColor: 'red'
  }
};

const FormDialog = props => {
  const { classes } = props;
  return (
    <div>
      {/* <Button onClick={this.handleClickOpen}>Open form dialog</Button> */}
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth={false}
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="form-dialog-title">{props.formTitle}</DialogTitle>

        <DialogContent>
          {/* <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText> */}
          {props.formContent}
          {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            /> */}
        </DialogContent>
        <DialogActions id="form-dialog-actions">
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={props.onSubmit}
            color="primary"
            disabled={props.disableSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(FormDialog);
