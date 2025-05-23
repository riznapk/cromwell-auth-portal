import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import InputField from "../../common/components/InputField";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Container maxWidth="xs" sx={styles.container}>
      <Paper elevation={10} sx={styles.paperContainer}>
        <Typography variant="h5" sx={styles.typography}>
          Register Online Account
        </Typography>
        <Typography sx={styles.typography}>
          We will use this information to secure your account and provides
          access via www.cromwell.co.uk.
        </Typography>
        <Typography sx={(styles.typography, styles.typographyLink)}>
          Already have an online account? Log in here
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
          </Box>
        </FormProvider>
      </Paper>
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
};

export default Register;
