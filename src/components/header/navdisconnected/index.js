import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom'; // <-- utiliser NavLink
import './Navbar.css';
import { FaUser } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import logo from '../../../assets/image.png';

function Navbar({ currentUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const menuRef = useRef(null);
  const servicesRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target))
        setMenuOpen(false);
      if (servicesRef.current && !servicesRef.current.contains(event.target))
        setServicesOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Logo" className="logo" />
        </NavLink>

        {/* Burger menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Menu principal */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'nav-link active-link' : 'nav-link'
                }
              >
                Accueil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/mentorat"
                className={({ isActive }) =>
                  isActive ? 'nav-link active-link' : 'nav-link'
                }
              >
                Mentorat
              </NavLink>
            </li>

            {/* Dropdown Nos Services */}
            <li
              className="nav-item dropdown"
              ref={servicesRef}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="nav-link dropdown-toggle btn"
                type="button"
                aria-expanded={servicesOpen ? 'true' : 'false'}
              >
                Nos services
              </button>

              <ul
                className={`dropdown-menu dropdown-menu-dark ${servicesOpen ? 'show' : ''}`}
              >
                <li>
                  <NavLink
                    to="/formation"
                    className={({ isActive }) =>
                      isActive ? 'dropdown-item active-link' : 'dropdown-item'
                    }
                  >
                    Formation
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/orientation"
                    className={({ isActive }) =>
                      isActive ? 'dropdown-item active-link' : 'dropdown-item'
                    }
                  >
                    Orientation
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reconversion"
                    className={({ isActive }) =>
                      isActive ? 'dropdown-item active-link' : 'dropdown-item'
                    }
                  >
                    Reconversion
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/insertion"
                    className={({ isActive }) =>
                      isActive ? 'dropdown-item active-link' : 'dropdown-item'
                    }
                  >
                    Insertion professionnelle
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>

          {/* Séparateur */}
          <div className="d-none d-lg-block navbar-separator" />

          {/* Bouton utilisateur */}
          <div className="ms-lg-3" ref={menuRef}>
            <button type="button" className="btn-user" onClick={toggleMenu}>
              <FaUser className="icon-user" />
              <FiChevronDown
                className={`icon-chevron ${menuOpen ? 'rotate' : ''}`}
              />
            </button>
            <ul
              className={`dropdown-menu dropdown-menu-end ${menuOpen ? 'show' : ''}`}
            >
              {currentUser ? (
                <>
                  <li>
                    <NavLink to="/espace" className="dropdown-item">
                      Mon espace
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" className="dropdown-item">
                      Me déconnecter
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/login" className="dropdown-item">
                      Connexion
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className="dropdown-item">
                      Inscription
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
