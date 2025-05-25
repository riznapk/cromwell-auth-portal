import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../slices/authSlice";
import { useState } from "react";
import { registerValidationSchema as validationSchema } from "../utils/formUtils";

export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Snackbar to show error messages
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...userData } = data;
    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        userData,
        { withCredentials: true }
      );
      dispatch(addUserDetails(response?.data?.user));
      navigate("/");
    } catch (error) {
      setSnackbarMessage(error?.response?.data?.message || "Register failed");
      setSnackbarOpen(true);
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
  return {
    snackbarOpen,
    snackbarMessage,
    setSnackbarOpen,
    methods,
    onSubmit,
    passwordRequirements,
  };
};
