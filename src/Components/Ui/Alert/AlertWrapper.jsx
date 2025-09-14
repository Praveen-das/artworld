import { Alert, Snackbar } from "@mui/material";

export default function AlertWrapper(props) {
  return (<Snackbar sx={{
    transform: "translateY(1.5rem)"
  }} open={props.toggled} autoHideDuration={2000} onClose={props.handleClose} anchorOrigin={{
    vertical: "top",
    horizontal: "right"
  }}>
    <Alert severity={props.type || "success"} sx={{
      height: 50,
      alignItems: "center",
      ".MuiAlert-message:first-letter": {
        textTransform: 'capitalize'
      }
    }} variant="filled">
      {props.message}
    </Alert>
  </Snackbar>);
}
