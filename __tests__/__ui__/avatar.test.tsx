import * as React from 'react';
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarFallback, AvatarImage } from "../../src/components/ui/avatar";
import { Avatar as Avtr } from '../../src/components/ui/avatar';

// Avatar Component:
// Type: Component Unit Testing
// Objective:
// Verify the correct rendering of the Avatar component.
// Check if the Avatar component applies a custom class when provided.
// Assertions:
// Confirm that the Avatar component is rendered successfully.
// Test the application of a custom class ("custom-class") to the Avatar component and ensure it is present in the rendered output.
// Add more assertions based on your component's specific behavior, such as checking for Avatar-related UI elements or styles.
// Alternate Avatar Component Test:
// Type: Component Unit Testing
// Objective:
// Verify the correct rendering of the alternate Avatar component (Avtr).
// Assertions:
// Confirm that the alternate Avatar component is rendered successfully.
// Add more assertions based on your component's specific behavior, such as checking for alternate Avatar-related UI elements or styles.

describe("Avatar Component", () => {
    it("renders Avatar component", () => {
        render(<Avatar />);
        const avatar = screen.getByTestId("avatar");
        expect(avatar).toBeInTheDocument();
    });

    it("applies custom className to Avatar component", () => {
        render(<Avatar className="custom-class" />);
        const avatar = screen.getByTestId("avatar");
        expect(avatar).toHaveClass("custom-class");
    });

});

describe('Alternate Avatar Component Test', () => {
    it('renders Avatar component', () => {
        render(<Avtr />);
        const avatar = screen.getByTestId('avatar');
        expect(avatar).toBeInTheDocument();
    });
});