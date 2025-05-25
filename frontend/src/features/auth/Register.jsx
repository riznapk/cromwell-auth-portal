import { Box, Button, Container, Link, Paper, Typography } from "@mui/material";
import InputField from "../../common/components/InputField";
import { FormProvider } from "react-hook-form";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link as RouterLink } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import SnackbarComponent from "../../common/components/SnackbarComponent";
import { useRegister } from "./hooks/useRegister";

function Register() {
  const {
    snackbarMessage,
    passwordRequirements,
    snackbarOpen,
    setSnackbarOpen,
    methods,
    onSubmit,
  } = useRegister();
  return (
    <Container maxWidth="xs" sx={(styles.container, styles.paperContainer)}>
      <Typography variant="h5" sx={styles.typography}>
        Register Online Account
      </Typography>
      <Typography sx={styles.typography}>
        We will use this information to secure your account and provides access
        via www.cromwell.co.uk.
      </Typography>

      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField
            name="firstName"
            label="First Name"
            type="text"
            required={true}
            variant="outlined"
            sx={styles.inputField}
            fullWidth
          />
          <InputField
            name="lastName"
            label="Last Name"
            type="text"
            required={true}
            variant="outlined"
            sx={styles.inputField}
            fullWidth
          />
          <InputField
            name="email"
            label="Email"
            type="text"
            required={true}
            variant="outlined"
            sx={styles.inputField}
            fullWidth
          />

          <Box sx={styles.requirementContainer}>
            <Typography sx={styles.title}>
              Password must contain at least:
            </Typography>

            {passwordRequirements.map(({ test, label }, index) => (
              <Box key={index} sx={styles.requirementRow}>
                {test ? (
                  <CheckIcon fontSize="small" color="primary" />
                ) : (
                  <ErrorOutlineIcon fontSize="small" />
                )}
                <Typography>{label}</Typography>
              </Box>
            ))}
          </Box>
          <InputField
            name="password"
            label="Password"
            type="password"
            required={true}
            variant="outlined"
            sx={styles.inputField}
            fullWidth
          />
          <InputField
            name="confirmPassword"
            label="Confirm Password"
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
            REGISTER
          </Button>
          <Typography>
            Not purchased from us before?{" "}
            <Link
              component={RouterLink}
              to="/login"
              sx={{ ...styles.typography, ...styles.typographyLink }}
            >
              Register a new account here
            </Link>
          </Typography>
        </Box>
      </FormProvider>
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
  paperContainer: { margin: "auto", p: { xs: 3, sm: 4 }, maxWidth: 500 },
  button: { width: "100%", borderRadius: "30px", my: 2 },
  inputField: { my: 1 },
  typography: {
    mb: 1,
  },
  typographyLink: {
    cursor: "pointer",
    color: "primary.main",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  title: {
    mb: 1,
  },
  requirementRow: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 0.5,
  },
  requirementContainer: {
    py: 1,
  },
};

export default Register;
