import React, { useEffect, useState } from 'react';
import Navbar from '../NavBar/NavBar';
import Basic from '../Explore/Explore';
import Articalship from '../Articalship/Articalship';
import './Home.css'
const Home = () => {
const current_theme = localStorage.getItem('current_theme');
const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);
  return (
    <div className={`App ${theme}`}>
        <div className='Nav'>
          <Navbar theme={theme} setTheme={setTheme} />
        </div>
        <div className={`Container ${theme}`}>
            <Basic />
        </div>
        <div className={`Container ${theme}`}>
            <Articalship />
        </div>
      </div>
  )
}

export default Home
