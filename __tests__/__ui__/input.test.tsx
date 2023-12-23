import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../../src/components/ui/input";

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
