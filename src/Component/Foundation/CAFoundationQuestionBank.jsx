import React from 'react'

import accountingQB from '../../Assets/Foundation/AccountingQB.jpg'
import apptQB from '../../Assets/Foundation/ApptieQB.jpg'
import buisnessQB from '../../Assets/Foundation/BLQB.jpg'
import buiEcoQB from '../../Assets/Foundation/BEQB.jpg'

const CAFoundationQuestionBank = () => {
  return (
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
  )
}

export default CAFoundationQuestionBank
