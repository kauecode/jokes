import { render, screen } from '@testing-library/react';
import App from '../App';

// This test is just a test to test the testing :)
// #TODO: Delete later
describe('App Component', () => {
  it('Renders basic elements on the app', () => {
    render(<App />);
    screen.debug();
    // expect(screen.getByRole('heading')).toBeInTheDocument();
    // expect(screen.getByRole('heading')).toHaveTextContent(/vite/i);
    // expect(screen.getByAltText(/vite/i)).toBeInTheDocument();
    // expect(screen.getByAltText(/react/i)).toBeInTheDocument();
  });
});
