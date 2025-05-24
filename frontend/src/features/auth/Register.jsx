import { Box, Button, Container, Link, Paper, Typography } from "@mui/material";
import InputField from "../../common/components/InputField";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("This is required"),
  lastName: yup.string().required("This is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Confirm Password does not match"),
});

function Register() {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("register Data", data);
    const { confirmPassword, ...userData } = data;
    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        userData,
        { withCredentials: true }
      );
      console.log("Register response:", response);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  //password requirements check
  const passwordValue = methods.watch("password");
  const passwordRequirements = [
    { test: passwordValue?.length >= 8, label: "8 characters" },
    { test: /[A-Z]/.test(passwordValue), label: "1 uppercase letter" },
    {
      test: passwordValue ? /[a-z]/.test(passwordValue) : false,
      label: "1 lowercase letter",
    },
    { test: /[0-9]/.test(passwordValue), label: "1 number" },
  ];

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

          <Button variant="contained" sx={styles.button} type="submit">
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
