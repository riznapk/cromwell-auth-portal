import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { store } from "../../../redux/store";
import { theme } from "../../../themes/theme";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { router as appRouter } from "../../../router/AppRouter";
import userEvent from "@testing-library/user-event";

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
    initialEntries: ["/create-account"],
  });
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={testRouter} />
      </ThemeProvider>
    </Provider>
  );
}

describe("Register Page", () => {
  it("should render register text as heading", () => {
    renderAtLoginRoute();
    screen.debug();
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/register online account/i);
  });

  it("should render register form required fields", () => {
    renderAtLoginRoute();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    const [passwordInput, confirmPasswordInput] =
      screen.getAllByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("should render register form with disabled button", () => {
    renderAtLoginRoute();
    const loginButton = screen.getByRole("button", { name: /register/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent(/register/i);
    expect(loginButton).toBeDisabled();
  });

  it("should enable the button when all required fields are provided", async () => {
    renderAtLoginRoute();

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/first name/i), "john");
    await user.type(screen.getByLabelText(/last name/i), "doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    const passwordInputs = screen.getAllByLabelText(/password/i);
    await user.type(passwordInputs[0], "Password123!"); // Password
    await user.type(passwordInputs[1], "Password123!"); // Confirm Password
    const registerButton = screen.getByRole("button", { name: /register/i });

    expect(registerButton).toBeEnabled();
  });

  it("should register successfully and shows no error", async () => {
    renderAtLoginRoute();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/first name/i), "john");
    await user.type(screen.getByLabelText(/last name/i), "doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    const passwordInputs = screen.getAllByLabelText(/password/i);
    await user.type(passwordInputs[0], "Password123!"); // Password
    await user.type(passwordInputs[1], "Password123!"); // Confirm Password
    await user.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/My account/i)).toBeInTheDocument();
    });
  });

  it("should apply validation checks to the form fields", async () => {
    renderAtLoginRoute();

    // Touch (focus and blur) the email field to trigger validation
    const user = userEvent.setup();
    const emailInput = screen.getByLabelText(/email/i);
    await user.click(emailInput);
    await user.tab();
    const firstName = screen.getByLabelText(/first name/i);
    await user.click(firstName);
    await user.tab();

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/this is required/i)).toBeInTheDocument();
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
