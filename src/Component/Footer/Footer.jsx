import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./Footer.css"; // Make sure to create this CSS file for styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>About Us</h3>
          <p>We provide the best services to our customers with top-notch quality.</p>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: info@example.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="icon" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="icon" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="icon" />
            </a>
          </div>
        </div>
        <div className="footer-nav">
          <h3>Quick Links</h3>
          <ul>
            <li className="footer-li">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="footer-li">
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="footer-li">
              <NavLink to="/services">Services</NavLink>
            </li>
            <li className="footer-li">
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} OurCompany. All Rights Reserved.</p>
        Made with love <span className="heart">❤️</span> by ambitious people
      </div>
    </footer>
  );
};

export default Footer;
