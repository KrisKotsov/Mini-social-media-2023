import { fireEvent, render, screen, act } from "@testing-library/react";
import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from "../../../pages/SignIn/SignIn";
import { AppContext } from "../../AppContext/AppContext";
import AppHeading from "../AppHeading";

describe("<AppHeading />", () => {
  it("Should handle /about click", () => {
    render(
      <BrowserRouter>
        <AppHeading />
      </BrowserRouter>
    );

    const aboutLink = screen.getByRole("link", { name: /about/i });

    act(() => {
      fireEvent.click(aboutLink);
    });

    expect(window.location.pathname).toBe("/about");
  });

  it("Should handle /signIn click", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <AppHeading />,
        children: [
          {
            path: "/signIn",
            element: <SignIn />,
          },
        ],
      },
    ]);
    render(<RouterProvider router={router} />);

    const signInLink = screen.getByRole("link", { name: /sign in/i });

    act(() => {
      fireEvent.click(signInLink);
    });

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
  });

  it("Should show Profile when there is an user", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <AppHeading />,
      },
    ]);

    render(
      <AppContext.Provider
        value={{
          user: { id: "test-user-id" },
        }}
      >
        <RouterProvider router={router} />
      </AppContext.Provider>
    );

    const profileLink = screen.getByRole("link", { name: /profile/i });
    expect(profileLink).toBeInTheDocument();
  });
});
