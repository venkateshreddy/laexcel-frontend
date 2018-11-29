import React from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    // Name of the component / style sheet
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        backgroundColor: '#37a000 !important',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
      },
      disabled: {
        color: 'white !important'
      }
    }
  }
});

const SimpleButton = ({
  disabled,
  onClick,
  variant = 'fab',
  color = 'primary',
  children
}) => (
  <MuiThemeProvider theme={theme}>
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      color={color}
      mini
    >
      {children}
    </Button>
  </MuiThemeProvider>
);

export default SimpleButton;
