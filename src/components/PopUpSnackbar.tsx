import React from 'react';
import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

import {
  snackbarSuccessColor,
  snackbarWarningColor,
  snackbarErrorColor,
  snackbarInfoColor
} from '../constants';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
} as any;

const calculateTheme = (variant: string) => {
  switch (variant) {
    case 'success':
      return {
        bgColor: snackbarSuccessColor
      };
    case 'warning':
      return {
        bgColor: snackbarWarningColor
      };
    case 'error':
      return {
        bgColor: snackbarErrorColor
      };
    case 'info':
      return {
        bgColor: snackbarInfoColor
      };
    default:
      return {
        bgColor: snackbarInfoColor
      };
  }
};

const StyledSnackbar = styled(SnackbarContent)<any>`
  && {
    background-color: ${({ bgColor }) => bgColor};
  }
`;

const StyledText = styled.span`
  display: flex;
  align-items: center;
`;

const PopUpSnackbar = (props: any) => {
  const { isOpen, handleClose, message, variant, ...other } = props;
  const Icon = variantIcon[variant] || <InfoIcon />;
  const theme = calculateTheme(variant);

  const StyledIcon = styled(Icon)<any>`
    opacity: 0.9;
    margin-right: 0.5rem;
  `;

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
      <StyledSnackbar
        aria-describedby="client-snackbar"
        bgColor={theme.bgColor}
        message={
          <StyledText id="client-snackbar">
            <StyledIcon />
            {message}
          </StyledText>
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
