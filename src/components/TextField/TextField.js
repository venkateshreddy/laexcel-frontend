import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = {
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: '100%',
    fontSize: '12px',
    marginTop: '0px'
  }
};

class TextFieldComp extends React.Component {
  render() {
    const { classes } = this.props;
    const props = { ...this.props };
    return (
      <div className="number-box">
        <TextField
          // id="with-placeholder"
          label={props.label}
          shrink={false}
          placeholder={props.placeholder}
          className={classes.textField}
          margin="normal"
          type={props.type}
          onChange={props.onChange}
          name={props.name}
          onBlur={props.onBlur}
          key={props.key}
          defaultValue={props.defaultValue}
          value={props.value}
          disabled={props.disabled}
        />
      </div>
    );
  }
}

TextFieldComp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFieldComp);
