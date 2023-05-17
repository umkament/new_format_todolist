import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useCommonDispatch, useCommonSelector} from "../store/store";
import {setAppErrorAC} from "../state/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
   props,
   ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackBar() {
  const dispatch = useCommonDispatch()
  const error = useCommonSelector(state => state.app.appError)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppErrorAC(null))
  };

  const isOpen = error !== null

  return (
     <Stack spacing={2} sx={{ width: '100%' }}>
       <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
         <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
           {error}
         </Alert>
       </Snackbar>
     </Stack>
  );
}