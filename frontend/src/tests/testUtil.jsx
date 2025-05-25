// src/tests/testUtil.js

import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { store } from "../redux/store";
import { theme } from "../themes/theme";
import { router } from "../router/AppRouter";
import { RouterProvider } from "react-router-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

/**
 * Providers for rendering components in tests.
 * Accepts an optional custom store for Redux testing.
 */
// eslint-disable-next-line react-refresh/only-export-components
const AllTheProviders = ({ customStore }) => (
  <Provider store={customStore || store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);

/**
 * Custom render function for tests.
 * Allows providing a custom Redux store for testing components that interact with Redux.
 */
const customRender = (ui, options) => {
  const { customStore, ...renderOptions } = options || {};

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders customStore={customStore}>{children}</AllTheProviders>
    ),
    ...renderOptions,
  });
};

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { customRender as render };
