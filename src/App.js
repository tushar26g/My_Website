import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Job from './Component/JobWebsite/Job';
import ReadWeb from './Component/ReadingWebPage/readPage';
import IndexBasedRead from './Component/ReadingWebPage/IndexBasedRead';
import Home from './Component/Home/Home';
import Navbar from './Component/NavBar/NavBar';
import Explore from './Component/Explore/Explore';
import Articalship from './Component/Articalship/Articalship';
import Footer from './Component/Footer/Footer';
import Foundation from './Component/Foundation/Foundation';
import MCQ from './Component/ReadingWebPage/MCQComponent';
import Store from './Component/Store/Store';
import Profile from './Component/UserInfo/Profile'; 
// import Orders from './Component/Orders/Orders';

const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  // Check if user is authenticated based on JWT token
  const checkAuthToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    // Update theme in localStorage when it changes
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  useEffect(() => {
    // Check token for user authentication status on app load
    checkAuthToken();
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT token on logout
    setIsAuthenticated(false); // Reset authentication state
  };

  return (
    <Router>
      <div className={`App ${theme}`}>
        {/* Pass isAuthenticated and handleLogout to Navbar */}
        <Navbar theme={theme} setTheme={setTheme} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <div className={`Container ${theme}`}>
          <Routes>
            <Route path="/" element={<Home setTheme={setTheme} />} />
            <Route path="/readWeb/:key" element={<ReadWeb />} />
            <Route path="/indexBasedRead/:key" element={<IndexBasedRead />} />
            <Route path="/Job" element={<Job />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/articalship" element={<Articalship />} />
            <Route path="/ca foundation" element={<Foundation />} />
            <Route path="/mcqs/:key" element={<MCQ />} />
            <Route path="/store" element={<Store />} />

            {/* Protected Routes: Redirect unauthenticated users to home */}
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
            {/* <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/" />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
