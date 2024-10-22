import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated imports
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

const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className={`App ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <div className={`Container ${theme}`}>
          <Routes> {/* Changed from Switch to Routes */}
            <Route path="/" element={<Home setTheme={setTheme} />} /> {/* Updated syntax */}
            <Route path="/readWeb/:key" element={<ReadWeb />} />
            <Route path="/indexBasedRead/:key" element={<IndexBasedRead />} />
            <Route path="/Job" element={<Job />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/articalship" element={<Articalship />} />
            <Route path="/ca foundation" element={<Foundation />} />
            <Route path="/mcqs/:key" element={<MCQ />} />
            <Route path="/store" element={<Store />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
