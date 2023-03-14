import { render, screen } from "@testing-library/react";
import Posts from "../Posts";

describe("<Posts/>", () => {
  it("Should fetch & display posts", async () => {
    render(<Posts userId={9999} />);
    const firstPostTitle = await screen.findByText(/test title 1/i);
    const firstPostBody = await screen.findByText(/test body 1/i);
    const secondPostTitle = await screen.findByText(/test title 2/i);
    const secondPostBody = await screen.findByText(/test body 2/i);

    expect(firstPostTitle).toBeInTheDocument();
    expect(firstPostBody).toBeInTheDocument();
    expect(secondPostTitle).toBeInTheDocument();
    expect(secondPostBody).toBeInTheDocument();
  });
});
