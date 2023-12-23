import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '../src/components/SearchInput';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SearchInput', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });
  });

  test('renders without crashing', () => {
    render(<SearchInput />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('displays the correct initial value', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { query: 'Initial value' },
    });
    render(<SearchInput />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('Initial value');
  });

  test('updates its value when typed into', async () => {
    render(<SearchInput />);
    const inputElement = screen.getByRole('textbox');
    userEvent.type(inputElement, 'New value');
    await waitFor(() => {
      expect(inputElement).toHaveValue('New value');
    });
  });

});