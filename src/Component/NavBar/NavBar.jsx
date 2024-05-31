import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setShowPopup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sections, setSections] = useState([]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.data);
        alert('Logged in successfully!');
        setShowPopup(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('/api/signup', { username, password, sections });
      if (response.data.success) {
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleSectionChange = (index, value) => {
    const newSections = [...sections];
    newSections[index] = value;
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, '']);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLogin && (
          <div>
            <h3>Sections</h3>
            {sections.map((section, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Section ${index + 1}`}
                value={section}
                onChange={(e) => handleSectionChange(index, e.target.value)}
              />
            ))}
            <button onClick={addSection}>Add Section</button>
          </div>
        )}
        {isLogin ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <button onClick={handleSignup}>Sign Up</button>
        )}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
        <button onClick={() => setShowPopup(false)}>Close</button>
      </div>
    </div>
  );
};
