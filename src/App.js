import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './Component/NavBar/NavBar';
import Basic from './Component/Explore/Explore';
import Job from './Component/JobWebsite/Job';
import ReadWeb from './Component/ReadingWebPage/readPage';

const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className={`App ${theme}`}>
        <div className='Nav'>
          <Navbar theme={theme} setTheme={setTheme} />
        </div>
        <div className={`Container ${theme}`}>
          <Switch>
            <Route path="/" exact component={Basic} />
            <Route path="/readWeb/:key" component={ReadWeb} />
            <Route path="/Job" component={Job} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
