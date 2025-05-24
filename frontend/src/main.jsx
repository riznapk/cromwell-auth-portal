import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "react-router-dom";
import { theme } from "./themes/theme.js";
import { router } from "./router/AppRouter.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
