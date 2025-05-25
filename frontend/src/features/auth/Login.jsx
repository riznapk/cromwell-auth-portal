import InputField from "../../common/components/InputField";
import { Box, Button, Container, Link, Paper, Typography } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import SnackbarComponent from "../../common/components/SnackbarComponent";
import { useLogin } from "./hooks/useLogin";

function Login() {
  const { snackbarOpen, setSnackbarOpen, snackbarMessage, methods, onSubmit } =
    useLogin();
  return (
    <Container maxWidth="xs" sx={(styles.container, styles.paperContainer)}>
      {/* <Paper elevation={10} sx={styles.paperContainer}> */}
      <Typography variant="h5" sx={styles.typography}>
        Login
      </Typography>
      <Typography sx={styles.typography}>
        Please enter your email and password to access your account.
      </Typography>

      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField
            name="email"
            label="Email"
            type="text"
            required={true}
            variant="outlined"
            sx={styles.inputField}
            fullWidth
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            required={true}
            variant="outlined"
            sx={styles.inputField}
            fullWidth
          />
          <Button
            variant="contained"
            sx={styles.button}
            type="submit"
            disabled={!methods?.formState?.isValid}
          >
            LOGIN
          </Button>
        </Box>
      </FormProvider>
      <Typography>
        Not purchased from us before?{" "}
        <Link
          component={RouterLink}
          to="/create-account"
          sx={{ ...styles.typography, ...styles.typographyLink }}
        >
          Register a new account here
        </Link>
      </Typography>
      {/* </Paper> */}
      <SnackbarComponent
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        position={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={4000}
      />
    </Container>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    px: 2,
  },
  paperContainer: { margin: "auto", p: { xs: 3, sm: 4 }, maxWidth: 400 },
  button: { width: "100%", borderRadius: "30px", my: 2 },
  inputField: { my: 1 },
  typography: {
    mb: 1,
  },
  typographyLink: {
    cursor: "pointer",
    textDecoration: "none",
    color: "primary.main",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};

export default Login;
