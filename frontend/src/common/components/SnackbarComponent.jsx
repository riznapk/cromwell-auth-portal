import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

function SnackbarComponent({
  open,
  message,
  onClose,
  position = { vertical: "top", horizontal: "center" },
  autoHideDuration = 3000,
  severity = "info",
}) {
  const { vertical, horizontal } = position;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={onClose}
      message={message}
      key={`${vertical}-${horizontal}`}
      autoHideDuration={autoHideDuration}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={styles.snackbarAlert}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

const styles = {
  snackbarAlert: {
    backgroundColor: "primary.main",
    color: "#fff",
  },
};

export default SnackbarComponent;
