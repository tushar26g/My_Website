import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo_light from '../../Assets/Dark.png';
import logo_dark from '../../Assets/light.png';
import search_dark from '../../Assets/search_dark.png';
import search_light from '../../Assets/search_light.png';
import profile from '../../Assets/profile.png'; // Your custom user icon image
import Login from './Login';
import Register from './Register';

const NavBar = ({ theme, setTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();  // Correct useNavigate hook
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication
  const [userImage, setUserImage] = useState(profile); // State for user image
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false); // State for dropdown
  const modalRef = useRef();  // Reference to modal content

  const setRedirectPath = () => {
    const currentPath = location.pathname;
    localStorage.setItem('redirectPath', currentPath); // Store in localStorage
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');  // Use navigate
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoginRegisterClick = (isLogin) => {
    setRedirectPath();  // Save the current page
    setShowLogin(isLogin); // Show login or register
    setModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSuccessfulAuth = () => {
    console.log("Authentication successful!");
    const redirectPath = localStorage.getItem('redirectPath') || '/';
    localStorage.removeItem('redirectPath');
    setModalOpen(false);  // Close modal
    navigate(redirectPath);  // Use navigate
    setIsAuthenticated(true); // Set user as authenticated
    setUserImage(profile); // Set user image after successful login/register
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    setIsAuthenticated(false); // Reset authentication
    setProfileDropdownOpen(false); // Close dropdown
    navigate('/'); // Redirect to home
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  // Handle clicks outside of modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal(); // Close modal if clicked outside
      }
    };

    if (modalOpen) {
      document.addEventListener('mousedown', handleClickOutside); // Add event listener
    } else {
      document.removeEventListener('mousedown', handleClickOutside); // Remove event listener
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Clean up listener
    };
  }, [modalOpen]);

  return (
    <nav className={`navbar ${theme}`}>
      <div className='NavBar' onClick={handleHomeClick}>
        <Link to="/" className='logo'>
          <h1>CASolution</h1>
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
          <li> 
            <Link to="/Store">Store</Link>
          </li>
          <li>About</li>
          <div className='search-box'>
            <input type="text" placeholder='Search' />
            <img src={theme === 'light' ? search_dark : search_light} alt="search" />
          </div>
          <img onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}
               src={theme === 'light' ? logo_light : logo_dark} alt="toggle" className='toggle-icon' />
          <div>
            {isAuthenticated ? (
              <div className={`profile-container ${theme}`}>
                <img src={userImage} alt="User Icon" className="user-icon" onClick={toggleProfileDropdown} />
                {profileDropdownOpen && (
                  <div className="profile-dropdown">
                    <ul>
                      <li><Link to="/profile">My Profile</Link></li>
                      <li><Link to="/orders">My Orders</Link></li>
                      <li onClick={handleLogout}>Logout</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button className='Login' onClick={() => handleLoginRegisterClick(true)}>Sign in</button>
            )}
          </div>
        </ul>
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>  {/* Add ref here */}
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <div className="modal-header">
              <button onClick={() => setShowLogin(true)}>Login</button>
              <button onClick={() => setShowLogin(false)}>Sign Up</button>
            </div>
            <div className="modal-body">
              {showLogin ? (
                <Login onSuccess={handleSuccessfulAuth} /> // Pass onSuccess callback to Login
              ) : (
                <Register onSuccess={handleSuccessfulAuth} /> // Pass onSuccess callback to Register
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;