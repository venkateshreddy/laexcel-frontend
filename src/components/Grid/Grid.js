import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export const drawerHeader = (
  <Grid container spacing={24}>
    <Grid item xs={12}>
      <Paper style={{ height: '40px' }}>
        <div className="back-button padding-left">
          <i className="fas fa-chevron-left" /> <span>Back</span>
        </div>
      </Paper>
    </Grid>
  </Grid>
);

export const drawerBody = body => (
  <Grid container spacing={24}>
    <Grid item xs={12}>
      <Paper style={{ padding: '12px', width: '96%', margin: '0 auto' }}>
        {body}
      </Paper>
    </Grid>
  </Grid>
);
