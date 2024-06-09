import React from 'react'
import './Foundation.css'
import accounting from '../../Assets/Foundation/Accounting.jpg'
import appt from '../../Assets/Foundation/Apptie.jpg'
import buisness from '../../Assets/Foundation/BuisnessLaw.jpg'
import buiEco from '../../Assets/Foundation/BusinessEconomics.jpg'

import accountingQB from '../../Assets/Foundation/AccountingQB.jpg'
import apptQB from '../../Assets/Foundation/ApptieQB.jpg'
import buisnessQB from '../../Assets/Foundation/BLQB.jpg'
import buiEcoQB from '../../Assets/Foundation/BEQB.jpg'

import accountingPYQ from '../../Assets/Foundation/AccountingPYQ.jpg'
import apptPYQ from '../../Assets/Foundation/ApptiePYQ.jpg'
import buisnessPYQ from '../../Assets/Foundation/BLPYQ.jpg'
import buiEcoPYQ from '../../Assets/Foundation/BEPYQ.jpg'

const Foundation = () => {
  return (
    <div className="grid-container">
    <h1>Foundation</h1>
      <div className="section">
        <h2>Study Material</h2>

        <div className='SubSection'>
            <div className='Sub'>
                <div><img src={accounting} alt="Example" /></div>
                <div className='subName'>
                  <h3>Accounting</h3>
                </div>
            </div>

            <div className='Sub'>
            <div><img src={buisness} alt="Example" /></div>
                <div className='subName'>
                  <h3>Business Law</h3>
                </div>
            </div>
            
            <div className='Sub'>
            <div><img src={appt} alt="Example" /></div>
                <div className='subName'>
                  <h3>Quantitative Aptitude</h3>
                </div>
            </div>
            <div className='Sub'>
            <div><img src={buiEco} alt="Example" /></div>
                <div className='subName'>
                  <h3>Business Economics</h3>
                </div>
            </div>
      </div>
      </div>

      <div className="section">
        <h2>Question Bank</h2>
        <div className='SubSection'>
            <div className='Sub'>
            <div><img src={accountingQB} alt="Example" /></div>
                <div className='subName'>
                  <h3>Accounting</h3>
                </div>
            </div>
            <div className='Sub'>
            <div><img src={buisnessQB} alt="Example" /></div>
                <div className='subName'>
                  <h3>Business Law</h3>
                </div>
            </div>
            <div className='Sub'>
            <div><img src={apptQB} alt="Example" /></div>
                <div className='subName'>
                  <h3>Quantitative Aptitude</h3>
                </div>
            </div>
            <div className='Sub'>
            <div><img src={buiEcoQB} alt="Example" /></div>
                <div className='subName'>
                  <h3>Business Economics</h3>
                </div>
            </div>
      </div>
      </div>

      <div className="section">
        <h2>PYQ</h2>
        <div className='SubSection'>
            <div className='Sub'>
            <div><img src={accountingPYQ} alt="Example" /></div>
                <div className='subName'>
                  <h3>Accounting</h3>
                </div>
            </div>
            <div className='Sub'>
            <div><img src={buisnessPYQ} alt="Example" /></div>
                <div className='subName'>
                  <h3>Business Law</h3>
                </div>
            </div>
            <div className='Sub'>
            <div><img src={apptPYQ} alt="Example" /></div>
                <div className='subName'>
                  <h3>Quantitative Aptitude</h3>
                </div>
            </div>
            <div className='Sub'>
            <div><img src={buiEcoPYQ} alt="Example" /></div>
                <div className='subName'>
                  <h3>Business Economics</h3>
                </div>
            </div>
      </div>
    </div>
    </div>
  )
}

export default Foundation
