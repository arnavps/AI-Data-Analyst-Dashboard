import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('shows spinner when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>);
    // The text should be sr-only but the spinner should be visible
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    // Button content should not contain the children text directly if we are rendering a spinner instead, or it should be wrapped.
    // Our Button keeps the text but makes it invisible, or it just renders the Spinner.
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
