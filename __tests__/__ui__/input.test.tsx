import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../../src/components/ui/input";

// Input Component:
// Type: Component Unit Testing
// Objective:
// Verify the correct rendering and behavior of the Input component under various scenarios.
// Assertions:
// Default Input:
// Confirm that the Input component is rendered.
// Check if the input is accessible through its role as a textbox.
// Custom Class Name:
// Confirm that the Input component with a custom className ("custom-class") is rendered.
// Check if the input has the specified custom class.
// User Input:
// Simulate user typing "Hello, World!" into the input.
// Use waitFor to ensure the input value is updated asynchronously.
// Confirm that the input has the expected value ("Hello, World!").
// Placeholder:
// Confirm that the Input component with a placeholder ("Enter text") is rendered.
// Check if the input has the specified placeholder attribute.
// Disabled Input:
// Confirm that the Input component with the disabled prop set to true is rendered.
// Check if the input is disabled.

describe("Input Component", () => {
  it("renders Input component", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("applies custom className to Input component", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("allows user input", async () => {
    render(<Input />);
    const input = screen.getByRole("textbox");

    userEvent.type(input, "Hello, World!");

    await waitFor(() => {
      expect(input).toHaveValue("Hello, World!");
    });
  });

  it("allows placeholder to be set", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("placeholder", "Enter text");
  });

  it("disables user input when disabled prop is true", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
  });
});
