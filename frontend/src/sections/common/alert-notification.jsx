// import { useState } from 'react';
import PropTypes from 'prop-types';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// ----------------------------------------------------------------------

export default function AlertNotifications({ alert, setAlert, message, setAlertError, alertError }) {
  return (
    <>
      {alert && (
        <Snackbar
          open={alert}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={6000}
          onClose={() => {
            setAlert(false);
          }}
        >
          <Alert
            onClose={() => {
              setAlert(false);
            }}
            severity="success"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
      {alertError && (
        <Snackbar
          open={alertError}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={6000}
          onClose={() => {
            setAlertError(false);
          }}
        >
          <Alert
            onClose={() => {
              setAlertError(false);
            }}
            severity="error"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

AlertNotifications.propTypes = {
  setAlert: PropTypes.func,
  alert: PropTypes.bool,
  message: PropTypes.string,
  setAlertError: PropTypes.func,
  alertError: PropTypes.bool,
};
