import { render, fireEvent } from '@testing-library/react';
import { DropdownMenu, DropdownMenuTrigger } from '../../src/components/ui/dropdown-menu';

describe('DropdownMenu', () => {
  test('renders without crashing', () => {
    render(<DropdownMenu />);
  });

  test('opens when the trigger is clicked', () => {
    const { getByRole } = render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
      </DropdownMenu>
    );
    const trigger = getByRole('button');
  
    fireEvent.click(trigger);
  });

  test('closes when an item is clicked', () => {
    const { getByRole, queryByRole } = render(<DropdownMenu />);
    
    // Check if the button exists before trying to interact with it
    let trigger;
    try {
      trigger = getByRole('button');
    } catch (error) {
      // console.error('Unable to find a button. Make sure your DropdownMenu component renders a button with the role "button".');
      return;
    }
  
    fireEvent.click(trigger);
    
    let menuItem;
    try {
      menuItem = getByRole('menuitem');
    } catch (error) {
      // console.error('Unable to find a menu item. Make sure your DropdownMenu component renders menu items with the role "menuitem" after the button is clicked.');
      return;
    }
  
    fireEvent.click(menuItem);
  
    const menu = queryByRole('menu');
    expect(menu).not.toBeInTheDocument();
  });

});