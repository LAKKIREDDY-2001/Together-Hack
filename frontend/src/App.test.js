import { render, screen } from '@testing-library/react';
import App from './App';

test('renders skill passport login screen', () => {
  window.history.pushState({}, 'Test page', '/Together-Hack/#/login');
  render(<App />);
  expect(screen.getAllByText(/skill passport/i).length).toBeGreaterThan(0);
  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
});
