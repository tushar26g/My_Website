import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import './NavBar.css';
import logo_light from '../../Assets/Dark.png';
import logo_dark from '../../Assets/light.png';
import search_dark from '../../Assets/search_dark.png';
import search_light from '../../Assets/search_light.png';

const NavBar = ({ theme, setTheme }) => {
  const location = useLocation();
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggle_mode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      history.push('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className='NavBar' onClick={handleHomeClick}>
        <Link to="/" className='logo'>
          <h1>PaisaToPaisa
          </h1>
        </Link>
      </div>

      <div className='Menu' onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`right-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={handleHomeClick}>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Job">CA Hub</Link>
          </li>
          <li>Store</li>
          <li>About</li>
          <div className='search-box'>
            <input type="text" placeholder='Search' />
            <img src={theme === 'light' ? search_dark : search_light} alt="search" />
          </div>
          <img onClick={toggle_mode} src={theme === 'light' ? logo_light : logo_dark} alt="toggle" className='toggle-icon' />
          <div>
            <button className='Login'>Login</button>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;