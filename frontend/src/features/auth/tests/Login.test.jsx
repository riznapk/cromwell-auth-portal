import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { store } from "../../../redux/store";
import { theme } from "../../../themes/theme";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { router as appRouter } from "../../../router/AppRouter";
import { userEvent } from "@testing-library/user-event";

import Login from "../Login";

// Mock useNavigate from react-router-dom
// vi.mock("react-router-dom", async (importOriginal) => {
//   const actual = await importOriginal();
//   return {
//     ...actual,
//     useNavigate: () => vi.fn(),
//   };
// });

// Custom render helper for routing tests
function renderAtLoginRoute() {
  // Use the same route config as the app, but with createMemoryRouter for test
  const testRouter = createMemoryRouter(appRouter.routes, {
    initialEntries: ["/login"],
  });
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={testRouter} />
      </ThemeProvider>
    </Provider>
  );
}

describe("Login Page", () => {
  it("should render login text as heading", () => {
    renderAtLoginRoute();
    screen.debug();
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/login/i);
  });

  it("should render login form with email and password fields with a login button", () => {
    renderAtLoginRoute();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should render login form with disabled button", () => {
    renderAtLoginRoute();
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent(/login/i);
    expect(loginButton).toBeDisabled();
  });

  it("should enable the button when all required fields are provided", async () => {
    renderAtLoginRoute();

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/password/i), "Password123!");
    const registerButton = screen.getByRole("button", { name: /login/i });

    expect(registerButton).toBeEnabled();
  });

  it("should logs in successfully and shows no error", async () => {
    renderAtLoginRoute();

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/email/i), "johndoe@gmail.com");
    await user.type(screen.getByLabelText(/password/i), "123456");
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/My account/i)).toBeInTheDocument();
    });
  });

  it("should apply validation checks to the form fields", async () => {
    renderAtLoginRoute();

    const user = userEvent.setup();
    const emailInput = screen.getByLabelText(/email/i);
    await user.click(emailInput);
    await user.tab();
    const password = screen.getByLabelText(/password/i);
    await user.click(password);
    await user.tab();

    expect(await screen.findByText(/email required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password required/i)).toBeInTheDocument();
  });

  it("should apply validation on email address format", async () => {
    renderAtLoginRoute();

    const user = userEvent.setup();
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "johndoe"); // invalid email
    await user.tab(); // trigger blur validation

    expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
  });
});
