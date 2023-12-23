import * as React from 'react';
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarFallback, AvatarImage } from "../../src/components/ui/avatar";
import { Avatar as Avtr } from '../../src/components/ui/avatar';

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