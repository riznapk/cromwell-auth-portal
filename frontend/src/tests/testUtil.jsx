// src/tests/testUtil.js

import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { store } from "../redux/store";
import { theme } from "../themes/theme";
import { MemoryRouter, RouterProvider } from "react-router-dom";
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
const AllTheProviders = ({ customStore, router = null, children }) => {
  const content = (
    <Provider store={customStore || store}>
      <ThemeProvider theme={theme}>
        {router ? (
          <RouterProvider router={router}>{children}</RouterProvider>
        ) : (
          <MemoryRouter>{children}</MemoryRouter>
        )}
      </ThemeProvider>
    </Provider>
  );
  return content;
};

/**
 * Custom render function for tests.
 * Allows providing a custom Redux store for testing components that interact with Redux.
 */
const customRender = (ui, options) => {
  const { customStore, router, ...renderOptions } = options || {};

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders customStore={customStore} router={router}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  });
};

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { customRender as render };
