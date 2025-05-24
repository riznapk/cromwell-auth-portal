import InputField from "../../common/components/InputField";
import { Box, Button, Container, Link, Paper, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email Required").email("Invalid Email Format"),
  password: yup
    .string()
    .required("Password Required")
    .min(6, "Password must be at least 6 characters"),
});

function Login() {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        data,
        { withCredentials: true }
      );
      console.log("Login response:", response);
      // localStorage.setItem("token", response?.data?.token);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

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
          <Button variant="contained" sx={styles.button} type="submit">
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
