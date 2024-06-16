import React from 'react';
import { useHistory } from 'react-router-dom';
import accounting from '../../Assets/Foundation/Accounting.jpg';
import appt from '../../Assets/Foundation/Apptie.jpg';
import buisness from '../../Assets/Foundation/BuisnessLaw.jpg';
import buiEco from '../../Assets/Foundation/BusinessEconomics.jpg';
// import './StudyMaterial.css';

const StudyMaterial = () => {
  const history = useHistory();

  const materials = [
    { key: 'Accounting', title: 'Accounting', imgSrc: accounting },
    { key: 'businessLaw', title: 'Business Law', imgSrc: buisness },
    { key: 'quantitativeAptitude', title: 'Quantitative Aptitude', imgSrc: appt },
    { key: 'businessEconomics', title: 'Business Economics', imgSrc: buiEco },
  ];

  const handleClick = (key) => {
    history.push(`/indexBasedRead/${key}`);
  };

  return (
    <div className="section">
      <h2>Study Material</h2>
      <div className='SubSection'>
        {materials.map((material) => (
          <div key={material.key} className='Sub' onClick={() => handleClick(material.key)}>
            <div><img src={material.imgSrc} alt={material.title} /></div>
            <div className='subName'>
              <h3>{material.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterial;
