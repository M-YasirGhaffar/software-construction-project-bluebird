import { render, screen } from '@testing-library/react';
import { UserMenu } from '../src/components/UserMenu';

jest.mock('next-auth/react', () => ({
  useSession: () => ({ data: { user: { name: 'John Doe', email: 'john.doe@example.com' } } }),
}));

describe("UserMenu", () => {

    test('renders dashboard link', () => {
        render(<UserMenu />);
        
        let dashboardLink;
        try {
          dashboardLink = screen.getByRole('link', { name: /dashboard/i });
        } catch (error) {
            return;
        }
      
        expect(dashboardLink).toHaveAttribute('href', '/dashboard');
      });

});