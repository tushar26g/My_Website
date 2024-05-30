import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Job from './Component/JobWebsite/Job';
import ReadWeb from './Component/ReadingWebPage/readPage';
import Home from './Component/Home/Home';
import Navbar from './Component/NavBar/NavBar';
import Explore from './Component/Explore/Explore';
import Articalship from './Component/Articalship/Articalship';
import Footer from './Component/Footer/Footer';

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
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/readWeb/:key" component={ReadWeb} />
            <Route path="/Job" component={Job} />
            <Route path="/explore" component={Explore} />
            <Route path="/articalship" component={Articalship} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
