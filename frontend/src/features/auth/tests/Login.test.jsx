import { describe, it, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "../../../tests/testUtil";
import Login from "../Login";

describe("Login Page", () => {
  it("should render login text as heading", () => {
    //   renderAtLoginRoute();
    render(<Login />);
    screen.debug();
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/login/i);
  });

  it("should render login form with email and password fields with a login button", () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should render login form with disabled button", () => {
    render(<Login />);
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent(/login/i);
    expect(loginButton).toBeDisabled();
  });

  it("should enable the button when all required fields are provided", async () => {
    render(<Login />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/password/i), "Password123!");
    const registerButton = screen.getByRole("button", { name: /login/i });

    expect(registerButton).toBeEnabled();
  });

  it("should have type password for password field", () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  //   it("should logs in successfully and shows no error", async () => {
  //     render(<Login />);

  //     const user = userEvent.setup();
  //     await user.type(screen.getByLabelText(/email/i), "johndoe@gmail.com");
  //     await user.type(screen.getByLabelText(/password/i), "123456");
  //     await user.click(screen.getByRole("button", { name: /login/i }));

  //     const myAccount = await screen.findByText(/my account/i);
  //     expect(myAccount).toBeInTheDocument();
  //   });

  it("should apply validation checks to the form fields", async () => {
    render(<Login />);

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
    render(<Login />);

    const user = userEvent.setup();
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "johndoe"); // invalid email
    await user.tab(); // trigger blur validation

    expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
  });

  it("should have a link to the create account page", () => {
    render(<Login />);

    const registerLink = screen.getByRole("link", {
      name: /register a new account here/i,
    });

    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute("href", "/create-account");
  });
});
