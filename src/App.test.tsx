import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    expect(screen.getByText('Matrix Dijital Yağmur')).toBeInTheDocument();
  });

  it('renders controls', () => {
    render(<App />);
    expect(screen.getByText('Kontroller')).toBeInTheDocument();
  });
});