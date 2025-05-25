import * as yup from "yup";
export const loginValidationSchema = yup.object().shape({
  email: yup.string().required("Email Required").email("Invalid Email Format"),
  password: yup
    .string()
    .required("Password Required")
    .min(6, "Password must be at least 6 characters"),
});

export const registerValidationSchema = yup.object().shape({
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
    .oneOf([yup.ref("password"), null], "Password does not match"),
});
