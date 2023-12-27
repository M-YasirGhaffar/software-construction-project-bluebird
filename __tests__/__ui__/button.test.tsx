import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, buttonVariants } from "../../src/components/ui/button"; // Update the path accordingly

// Type: Component Unit Testing
// Objective:
// Verify the correct rendering and behavior of the Button component under different scenarios.
// Assertions:
// Default Button:
// Confirm that a default button with the label "Click me" is rendered.
// Check if the button has the appropriate default variant and size classes.
// Loading Button:
// Confirm that a button with the label "Click me" and the isLoading prop is rendered.
// Check if the button contains a loader element (<div data-testid="loader" />).
// Small Button:
// Confirm that a button with the label "Click me" and a small size (size="sm") is rendered.
// Check if the button has the appropriate variant and size classes.
// Button with Left Icon:
// Confirm that a button with the label "Click me" and a left icon (mocked as <div data-testid="left-icon" />) is rendered.
// Check if the button contains the left icon element.
// Button with Right Icon:
// Confirm that a button with the label "Click me" and a right icon (mocked as <div data-testid="right-icon" />) is rendered.
// Check if the button contains the right icon element.

describe("Button Component", () => {
  it("renders a default button", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(buttonVariants({ variant: "default", size: "default" }));
  });

  it("renders a loading button", () => {
    render(<Button isLoading>Click me</Button>);
    const button = screen.getByText("Click me");
    const loader = screen.getByTestId("loader");
    expect(button).toContainElement(loader);
  });

  it("renders a small button", () => {
    render(<Button size="sm">Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toHaveClass(buttonVariants({ variant: "default", size: "sm" }));
  });

  it("renders a button with left icon", () => {
    const MockLeftIcon = () => <div data-testid="left-icon" />;
    render(<Button LeftIcon={MockLeftIcon}>Click me</Button>);
    const button = screen.getByText("Click me");
    const leftIcon = screen.getByTestId("left-icon");
    expect(button).toContainElement(leftIcon);
  });

  it("renders a button with right icon", () => {
    const MockRightIcon = () => <div data-testid="right-icon" />;
    render(<Button RightIcon={MockRightIcon}>Click me</Button>);
    const button = screen.getByText("Click me");
    const rightIcon = screen.getByTestId("right-icon");
    expect(button).toContainElement(rightIcon);
  });
});
