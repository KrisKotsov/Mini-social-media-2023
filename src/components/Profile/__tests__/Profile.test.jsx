import { screen, render } from "@testing-library/react";
import Profile from "../Profile";
import { AppContext } from "../../AppContext/AppContext";

describe("<Profile />", () => {
  it("Shows the right data", () => {
    render(
      <AppContext.Provider
        value={{
          user: {
            name: "Test Name",
            email: "test@email.com",
            username: "Test Username",
            phone: "123456789",
          },
        }}
      >
        <Profile />
      </AppContext.Provider>
    );

    expect(screen.getByText(/name: Test Name/i)).toBeInTheDocument();
    expect(screen.getByText(/test@email.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Username/i)).toBeInTheDocument();
    expect(screen.getByText(/123456789/i)).toBeInTheDocument();
  });

  it("Shows loading when there is no user", () => {
    render(
      <AppContext.Provider value={{}}>
        <Profile />
      </AppContext.Provider>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
