import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "../src/components/BackButton";
import * as NextRouter from "next/router";

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
