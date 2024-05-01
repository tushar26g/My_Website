import React, {useState} from 'react'
import './NavBar.css'
import logo_light from '../Assets/Dark.png'
import logo_dark from '../Assets/light.png'
import search_dark from '../Assets/search_dark.png';
import search_light from '../Assets/search_light.png';

const NavBar = ({theme, setTheme}) => {

  const toggle_mode =()=>{
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  const[menuOpen, setMenuOpen]=useState(false);

  return (
        <div className={`navbar ${theme}`}>
            <div className="logo">
              <h1>
                <span>P</span>aisaTo
                <span>P</span>aisa
              </h1>
            </div>

            <div className='Menu' onClick={()=>{
              setMenuOpen(!menuOpen);
            }}>
              <span></span>
              <span></span>
              <span></span>
            </div>


              <ul className={menuOpen ? "open" : ""}>
                <li>Explore</li>
                <li>Foundation</li>
                <li>Inter</li> 
                <li>Final</li>
                <div className='search-box'>
                <input type="text" placeholder='Search'/>
                <img src={theme === 'light' ? search_dark : search_light} alt="" />
              </div>
              <img onClick={()=>{toggle_mode()}} src={theme === 'light' ? logo_light : logo_dark} alr="" className='toggle-icon'/>

              <div>
                <button className='Login'>login</button>
              </div>
              </ul>
        </div>
  )
}

export default NavBar
