import React, {useState} from 'react'
import './NavBar.css'
import logo_light from '../../Assets/Dark.png'
import logo_dark from '../../Assets/light.png'
import search_dark from '../../Assets/search_dark.png';
import search_light from '../../Assets/search_light.png';

const NavBar = ({theme, setTheme}) => {

  const toggle_mode =()=>{
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  const[menuOpen, setMenuOpen]=useState(false);

  return (
    <nav className={`navbar ${theme}`}>
      <div className='NavBar'>
        <div className='logo' to="/">
          <h1>
            <span>P</span>aisaTo
            <span>P</span>aisa
          </h1>
        </div>
      </div>

      <div className='Menu' onClick={()=>{
              setMenuOpen(!menuOpen);
            }}>
              <span></span>
              <span></span>
              <span></span>
      </div>

      <div className={`right-menu ${menuOpen ? "open" : ""}`}>
          <ul>
                <li>Home</li>
                <li>CA Hub</li>
                <li>Store</li>
                <li>About</li>
                <div className='search-box'>
                <input type="text" placeholder='Search'/>
                <img src={theme === 'light' ? search_dark : search_light} alt="" />
              </div>
              <img onClick={()=>{toggle_mode()}} src={theme === 'light' ? logo_light : logo_dark} alr="" className='toggle-icon'/>
                <div>
                    <button className='Login'>Login</button>
                </div>
          </ul>
      </div>
    </nav>
  )
}

export default NavBar
