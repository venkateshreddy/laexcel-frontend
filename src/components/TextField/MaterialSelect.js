import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class TextFieldComp extends React.Component {
  render() {
    const { classes } = this.props;
    const props = { ...this.props };
    return (
      <TextField
        // id="standard-select-currency-native"
        select
        label={props.label}
        className={classes.textField}
        value={props.value}
        onChange={props.onChange}
        SelectProps={{
          native: true,
          MenuProps: {
            className: classes.menu
          }
        }}
        helperText={props.helperText}
        margin="normal"
      >
        {props.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
    );
  }
}

TextFieldComp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFieldComp);
