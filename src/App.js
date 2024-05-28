import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Job from './Component/JobWebsite/Job';
import ReadWeb from './Component/ReadingWebPage/readPage';
import Home from './Component/Home/Home'
const App = () => {
  // const current_theme = localStorage.getItem('current_theme');
  // const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  // useEffect(() => {
  //   localStorage.setItem('current_theme', theme);
  // }, [theme]);

  return (
    <Router>
      <div className={`App`}>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/readWeb/:key" component={ReadWeb} />
            <Route path="/Job" component={Job} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
