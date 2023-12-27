import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "../src/components/BackButton";
import * as NextRouter from "next/router";

// BackButton Component:
// Type: Component Unit Testing
// Objective:
// Verify the correct rendering and behavior of the BackButton component.
// Check if the default text is displayed correctly and if custom text is rendered when provided.
// Ensure that the router.back() function is triggered when the BackButton is clicked.
// Assertions:
// Confirm that the default text "Back" is rendered in the BackButton component.
// Test the rendering of the BackButton with custom text and verify that the custom text is displayed.
// Check that clicking the BackButton triggers the router.back() function.
// Add more assertions based on your component's specific behavior, such as checking for additional UI elements or styles.

// Create a custom mock for useRouter
jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn(),
}));

describe("BackButton Component", () => {
  it("renders BackButton correctly with default text", () => {
    render(<BackButton />);
    
    // Check if the default text "Back" is rendered
    const buttonText = screen.getByText("Back");
    expect(buttonText).toBeInTheDocument();

    // Add more assertions based on your component's behavior
  });

  it("renders BackButton correctly with custom text", () => {
    const customText = "Go Back";

    render(<BackButton text={customText} />);
    
    // Check if the custom text is rendered
    const buttonText = screen.getByText(customText);
    expect(buttonText).toBeInTheDocument();

    // Add more assertions based on your component's behavior
  });

  it("triggers router.back() when BackButton is clicked", () => {
    // Mock the useRouter function
    const mockBack = jest.fn();
    jest.spyOn(NextRouter, "useRouter").mockReturnValue({ back: mockBack } as any);

    render(<BackButton />);
    
    // Click the BackButton
    fireEvent.click(screen.getByText("Back"));

    // Check if the router.back() function was called
    expect(mockBack).toHaveBeenCalled();

    // Add more assertions based on your component's behavior
  });
});
