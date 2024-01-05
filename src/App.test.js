import { render, screen } from '@testing-library/react';
import App from './App';

test('renders', () => {
  render(<App />);
  const logo = screen.getByText(/unitube-lataamo/i);
  expect(logo).toBeInTheDocument();
});
