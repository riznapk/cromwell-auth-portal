import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../slices/authSlice";
import { useState } from "react";
import { loginValidationSchema as validationSchema } from "../utils/formUtils";
import api from "../../../api/apiConfig";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Snackbar to show error messages
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/user/login", data, {
        withCredentials: true,
      });
      dispatch(addUserDetails(response?.data?.user));
      methods.reset();
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setSnackbarMessage(error?.response?.data?.message || "Login failed");
      setSnackbarOpen(true);
    }
  };
  return { snackbarOpen, setSnackbarOpen, snackbarMessage, methods, onSubmit };
};
