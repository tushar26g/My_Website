import React from 'react'
import './Articalship.css'
const Articalship = () => {
  return (
    <div id="articalship" className='Basic'>
      <h3>Articalship</h3>
        <div className='HomeButton'>
            {/* <div><img src={found} alt="Example" /></div> */}
          <div className='content'>
            <h3>Excel</h3>
            <p>Excel</p>
          </div>
        </div>
        <div className='HomeButton'>
            {/* <div><img src={found} alt="Example" /></div> */}
          <div className='content'>
            <h3>Word</h3>
            <p>word</p>
          </div>
        </div>
        <div className='HomeButton'>
            {/* <div><img src={found} alt="Example" /></div> */}
          <div className='content'>
            <h3>PDF</h3>
            <p>PDF</p>
          </div>
        </div>
    </div>
  )
}

export default Articalship
