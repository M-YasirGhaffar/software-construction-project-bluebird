import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Session } from "next-auth";
import UserCard from "../src/components/UserCard"; // Update the path accordingly
import * as nextAuth from "next-auth/react";

// Type: Integration Testing
// Objective:
// Ensure correct rendering of user information (name and email).
// Validate the functionality of the sign-out button click.
// Assertions:
// Verify that the user's name and email are displayed correctly.
// Simulate a click on the "Sign out" button and confirm that the signOut function is called.
// Ensure that the signOut function returns a resolved Promise.

jest.mock("next-auth/react");

describe("UserCard Component", () => {
  const mockSession: Session = {
    user: {
      id: "user123",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    expires: "2023-12-31T23:59:59Z",
  };

  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks();
  });

  it("renders user information correctly", () => {
    render(<UserCard session={mockSession} />);

    const nameElement = screen.getByText(/Name: John Doe/i);
    const emailElement = screen.getByText(/Email: john.doe@example.com/i);

    expect(nameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
  });

  it("handles sign-out button click", async () => {
    // Mock the signOut function
    const mockSignOut = jest.spyOn(nextAuth, "signOut");
    mockSignOut.mockResolvedValue(undefined); // Ensure it returns a resolved Promise

    render(<UserCard session={mockSession} />);

    const signOutButton = screen.getByText(/Sign out/i);

    // Trigger a sign-out
    fireEvent.click(signOutButton);

    // Wait for the promise to resolve
    await waitFor(() => expect(mockSignOut).toHaveBeenCalled());

    // Expect the signOut function to have been called
    expect(mockSignOut).toHaveBeenCalled();
  });
});
