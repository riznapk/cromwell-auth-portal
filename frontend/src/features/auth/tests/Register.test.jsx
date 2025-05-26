import { describe, it, expect } from "vitest";
import { render, screen } from "../../../tests/testUtil";
import Register from "../Register";
import userEvent from "@testing-library/user-event";

describe("Register Page", () => {
  it("should render register text as heading", () => {
    render(<Register />);
    screen.debug();
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/register online account/i);
  });

  it("should render register form required fields", () => {
    render(<Register />);
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
    render(<Register />);
    const loginButton = screen.getByRole("button", { name: /register/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent(/register/i);
    expect(loginButton).toBeDisabled();
  });

  it("should enable the button when all required fields are provided", async () => {
    render(<Register />);

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

  it("should have type password for password field", () => {
    render(<Register />);
    const passwordInput = screen.getByLabelText(/confirm password/i);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  // it("should register successfully and shows no error", async () => {
  //   render(<Register />);
  //   const user = userEvent.setup();

  //   await user.type(screen.getByLabelText(/first name/i), "john");
  //   await user.type(screen.getByLabelText(/last name/i), "doe");
  //   await user.type(screen.getByLabelText(/email/i), "john@example.com");
  //   const passwordInputs = screen.getAllByLabelText(/password/i);
  //   await user.type(passwordInputs[0], "Password123!"); // Password
  //   await user.type(passwordInputs[1], "Password123!"); // Confirm Password
  //   await user.click(screen.getByRole("button", { name: /register/i }));

  //   await waitFor(() => {
  //     expect(screen.getByText(/My account/i)).toBeInTheDocument();
  //   });
  // });

  it("should apply validation checks to the form fields", async () => {
    render(<Register />);

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
    render(<Register />);

    const user = userEvent.setup();
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "johndoe"); // invalid email
    await user.tab(); // trigger blur validation

    expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
  });

  it("should have a link to login the user", () => {
    render(<Register />);

    const loginLink = screen.getByRole("link", {
      name: /log in here/i,
    });

    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
