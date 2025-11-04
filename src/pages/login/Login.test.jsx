// src/components/Login/Login.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

// Mock d'axios pour simuler les appels API
jest.mock('axios');

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component - Tests Essentiels', () => {
  let setCurrentUserMock;

  beforeEach(() => {
    setCurrentUserMock = jest.fn();
    mockNavigate.mockClear();
    axios.post.mockClear();
    localStorage.clear();
  });

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <Login setCurrentUser={setCurrentUserMock} />
      </BrowserRouter>
    );
  };

  /**
   * TEST 2 : Connexion réussie avec rôle MENTOREE ✅
   */
  test('devrait se connecter avec succès pour un utilisateur MENTOREE', async () => {
    const mockResponse = {
      data: {
        token: 'fake-jwt-token',
        username: 'mentore@example.com',
        roles: ['ROLE_MENTOREE']
      }
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    renderLogin();

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'mentore@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8081/public/v1/auth/login', {
        username: 'mentore@example.com',
        password: 'password123'
      });

      expect(localStorage.getItem('token')).toBe('fake-jwt-token');

      expect(setCurrentUserMock).toHaveBeenCalledWith({
        email: 'mentore@example.com',
        isMentored: true,
        isAdmin: false,
        token: 'fake-jwt-token'
      });

      expect(mockNavigate).toHaveBeenCalledWith('/espace');
    });
  });

  /**
   * TEST 3 : Connexion réussie avec rôle ADMIN 👑
   */
  test('devrait se connecter avec succès pour un administrateur', async () => {
    const mockResponse = {
      data: {
        token: 'admin-token',
        username: 'admin@example.com',
        roles: ['ROLE_ADMIN']
      }
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    renderLogin();

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'adminpass' } });

    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));

    await waitFor(() => {
      expect(setCurrentUserMock).toHaveBeenCalledWith({
        email: 'admin@example.com',
        isMentored: false,
        isAdmin: true,
        token: 'admin-token'
      });
      expect(mockNavigate).toHaveBeenCalledWith('/espace');
    });
  });

  /**
   * TEST 4 : Erreur de connexion ❌
   */
  test('devrait afficher un message d\'erreur en cas d\'échec de connexion', async () => {
    const errorMessage = 'Identifiants invalides';
    axios.post.mockRejectedValueOnce({
      response: { data: { message: errorMessage } }
    });

    renderLogin();

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Mot de passe/i)).toHaveValue('');
    expect(localStorage.getItem('token')).toBeNull();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  /**
   * TEST 5 : useEffect initialise currentUser à null 🔄
   */
  test('devrait appeler setCurrentUser(null) au montage du composant', () => {
    renderLogin();

    expect(setCurrentUserMock).toHaveBeenCalledWith(null);
    expect(setCurrentUserMock).toHaveBeenCalledTimes(1);
  });
});
