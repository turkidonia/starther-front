import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Register Component - Tests Essentiels', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("devrait afficher une erreur si les mots de passe ne correspondent pas", async () => {
    renderWithRouter(<Register />);

    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirmPassword-input'), { target: { value: 'wrongpass' } });
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByTestId('lastname-input'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('firstname-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '0123456789' } });

    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    expect(await screen.findByText(/Les mots de passe ne correspondent pas/i)).toBeInTheDocument();
  });

  test("devrait afficher une erreur si le mot de passe est trop court", async () => {
    renderWithRouter(<Register />);

    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'short' } });
    fireEvent.change(screen.getByTestId('confirmPassword-input'), { target: { value: 'short' } });
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByTestId('lastname-input'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('firstname-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '0123456789' } });

    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    expect(await screen.findByTestId('password-error')).toHaveTextContent(/au moins 8 caractères/i);
  });

  test("devrait afficher une erreur si l'API renvoie Email déjà utilisé", async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: 'Email déjà utilisé' } },
    });

    renderWithRouter(<Register />);

    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirmPassword-input'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByTestId('lastname-input'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('firstname-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '0123456789' } });

    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    expect(await screen.findByText(/Email déjà utilisé/i)).toBeInTheDocument();
  });

  test("devrait s'inscrire avec succès et rediriger", async () => {
    axios.post.mockResolvedValue({ data: { message: 'Inscription réussie' } });

    renderWithRouter(<Register />);

    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirmPassword-input'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByTestId('lastname-input'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('firstname-input'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '0987654321' } });

    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    await waitFor(() => {
      expect(screen.getByText(/Inscription réussie/i)).toBeInTheDocument();
    });
  });
});
