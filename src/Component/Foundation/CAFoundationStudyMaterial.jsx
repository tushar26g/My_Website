import React from 'react'
import accounting from '../../Assets/Foundation/Accounting.jpg'
import appt from '../../Assets/Foundation/Apptie.jpg'
import buisness from '../../Assets/Foundation/BuisnessLaw.jpg'
import buiEco from '../../Assets/Foundation/BusinessEconomics.jpg'

const StudyMaterial = () => {
  return (
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
  )
}

export default StudyMaterial
