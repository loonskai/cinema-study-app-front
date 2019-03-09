import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const PopUpSnackbar = (props: any) => {
  const { classes, className, message, onClose, variant, ...other } = props;
  // const Icon = variantIcon[variant];
  const [isOpen, setSnackbarStatus] = useState(true);

  const handleClose = () => {
    setSnackbarStatus(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={isOpen}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <SnackbarContent
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar">
            {/* <Icon /> */}
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
        {...other}
      />
    </Snackbar>
  );
};

export default PopUpSnackbar;
