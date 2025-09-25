import React, { useEffect, useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const loginURL = 'http://localhost:8081/public/v1/auth/login';

function Login({ setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setCurrentUser(null);
  }, [setCurrentUser]);

  const navigate = useNavigate(); // pour la redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    const loginForm = {
      username: email,
      password
    };

    try {
      const response = await axios.post(loginURL, loginForm);

      // Récupère le token et les infos de rôle
      const { token, username, roles } = response.data;

      // Stocke le token
      localStorage.setItem('token', token);

      // Déduire isMentored et isAdmin à partir de roles
      const isMentored = roles.includes('ROLE_MENTOREE');
      const isAdmin = roles.includes('ROLE_ADMIN');

      // Met à jour currentUser pour RoutesConfig
      setCurrentUser({
        email: username,
        isMentored,
        isAdmin,
        token
      });

      // Vide les champs
      setEmail('');
      setPassword('');

      // Redirige vers /espace pour que RoutesConfig choisisse l'espace
      navigate('/espace');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion.');
      setPassword('');
    }
  };

  return (
    <div className="login-container">
      <h2>Se connecter</h2>
      <form onSubmit={handleLogin}>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Mot de passe */}
        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            id="password"
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Message d'erreur */}
        {error && <p className="error-msg">{error}</p>}

        {/* Bouton connexion */}
        <button type="submit" className="btn-login">
          Connexion
        </button>
      </form>

      <p className="register-link">
        Pas encore de compte ? <a href="/register">Inscrivez-vous</a>
      </p>
    </div>
  );
}

export default Login;
