import { MemoryRouter } from "react-router-dom";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import SignIn from "../SignIn";
import { TEST_IDS, TEXTS, validPassword } from "../../../utils/constants";

const SignInWithRouter = () => (
  <MemoryRouter>
    <SignIn />
  </MemoryRouter>
);

describe("<SignIn/>", () => {
  it("Renders all input fields", () => {
    const { container } = render(<SignInWithRouter />);

    const emailInput = container.querySelector("input[type='email']");
    const passwordInput = container.querySelector("input[type='password']");
    const rememberMeCheckbox = container.querySelector(
      "input[type='checkbox']"
    );
    const signInButton = screen.getByTestId("sign-in-button");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(rememberMeCheckbox).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it("Handles user inputs", () => {
    const { container } = render(<SignInWithRouter />);
    const emailInput = container.querySelector("input[type='email']");
    const passwordInput = container.querySelector("input[type='password']");
    const rememberMeCheckbox = container.querySelector(
      "input[type='checkbox']"
    );

    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    fireEvent.change(rememberMeCheckbox, { target: { checked: true } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });

    expect(emailInput.value).toBe("test@email.com");
    expect(rememberMeCheckbox).toBeChecked();
    expect(screen.getByDisplayValue("testPassword")).toBeInTheDocument();
  });

  it("Handles sign in flow", async () => {
    const { container } = render(<SignInWithRouter />);
    const emailInput = container.querySelector("input[type='email']");
    const passwordInput = container.querySelector("input[type='password']");
    const rememberMeCheckbox = container.querySelector(
      "input[type='checkbox']"
    );
    const signInButton = screen.getByTestId(TEST_IDS.signInBtn);
    const emailHelperText = screen.getByText(TEXTS.emailHelper);
    const passwordHelperText = screen.getByText(TEXTS.passwordHelper);

    fireEvent.click(signInButton);
    expect(emailHelperText.textContent).toBe(TEXTS.emailError);
    expect(passwordHelperText.textContent).toBe(TEXTS.missingPasswordError);

    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    fireEvent.click(signInButton);
    expect(emailHelperText.textContent).toBe(TEXTS.emailHelper);

    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.click(signInButton);
    expect(passwordHelperText.textContent).toBe(TEXTS.wrongPasswordError);

    fireEvent.change(passwordInput, { target: { value: validPassword } });
    act(() => {
      fireEvent.click(signInButton);
    });

    await waitFor(() => {
      expect(emailHelperText.textContent).toBe(TEXTS.userDoesNotExistError);
    });
  });
});

// FETCH ERROR FIXED BY INSTALLING whatwg-fetch
