import React, { useEffect, useState } from 'react';
import Explore from '../Explore/Explore';
import Articalship from '../Articalship/Articalship';
import './Home.css'
import Foundation from '../Foundation/Foundation';
const Home = () => {
const current_theme = localStorage.getItem('current_theme');
const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);
  return (
    <div className={`App ${theme}`}>
        <div id='explore' className={`Container ${theme}`}>
            <Explore />
        </div>
        <div className={`foundation ${theme}`}>
            <Foundation />
        </div>
        <div className={`Container ${theme}`}>
            <Articalship />
        </div>
      </div>
  )
}

export default Home
