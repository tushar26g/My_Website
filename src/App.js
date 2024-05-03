import React, { useEffect, useState } from 'react'
import "./App.css"
import Navbar from './Component/NavBar/NavBar'
import Basic from './Component/Explore/Explore'

const App = () => {

  const current_theme=localStorage.getItem('current_theme');
  const[theme, setTheme]=useState(current_theme ? current_theme : 'light');


  useEffect(()=>{
    localStorage.setItem('current_theme',theme);
  },[theme])


  return (
    <div className={`App ${theme}`}>
      
      <div className='Nav'>
        <Navbar theme={theme} setTheme={setTheme}/>
      </div>

      <div className={`Container ${theme}`}>
        <Basic />
      </div>
    </div>
  )
}

export default App

