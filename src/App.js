import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Job from './Component/JobWebsite/Job';
import ReadWeb from './Component/ReadingWebPage/readPage';
import IndexBasedRead from './Component/ReadingWebPage/IndexBasedRead'
import Home from './Component/Home/Home';
import Navbar from './Component/NavBar/NavBar';
import Explore from './Component/Explore/Explore';
import Articalship from './Component/Articalship/Articalship';
import Footer from './Component/Footer/Footer';
import Foundation from './Component/Foundation/Foundation';
import MCQ from './Component/ReadingWebPage/MCQComponent'
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
            <Route path="/" exact component={Home} setTheme={setTheme} />
            <Route path="/readWeb/:key" component={ReadWeb} />
            <Route path="/indexBasedRead/:key" component={IndexBasedRead} />
            <Route path="/Job" component={Job} />
            <Route path="/explore" component={Explore} />
            <Route path="/articalship" component={Articalship} />
            <Route path="/ca foundation" component={Foundation} />
            <Route path="/mcqs/:key" component={MCQ} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
