import { useState } from 'react';
import axios from 'axios';

const Login = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error
    try {
      const response = await axios.post('http://localhost:8080/public/login', {
        email,
        password,
      });

      // If successful login and token received
      if (response.data.jwt) {
        localStorage.setItem('token', response.data.jwt); // Save JWT token
        onSuccess();  // Call onSuccess to notify NavBar to redirect
      } else {
        setErrorMessage('Login successful, but token is missing.');
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form">
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;