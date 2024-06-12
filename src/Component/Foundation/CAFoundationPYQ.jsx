import React from 'react'
import accountingPYQ from '../../Assets/Foundation/AccountingPYQ.jpg'
import apptPYQ from '../../Assets/Foundation/ApptiePYQ.jpg'
import buisnessPYQ from '../../Assets/Foundation/BLPYQ.jpg'
import buiEcoPYQ from '../../Assets/Foundation/BEPYQ.jpg'

const CAFoundationPYQ = () => {
  return (
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
  )
}

export default CAFoundationPYQ
