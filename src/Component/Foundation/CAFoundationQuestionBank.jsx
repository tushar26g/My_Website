import React from 'react';
import { useNavigate } from 'react-router-dom';
import accountingQB from '../../Assets/Foundation/AccountingQB.jpg';
import apptQB from '../../Assets/Foundation/ApptieQB.jpg';
import buisnessQB from '../../Assets/Foundation/BLQB.jpg';
import buiEcoQB from '../../Assets/Foundation/BEQB.jpg';

const CAFoundationQuestionBank = () => {
  const navigate = useNavigate(); // Correct useNavigate hook

  const materials = [
    { key: 'Accounting%20Chapter%201%20MCQ', title: 'Accounting', imgSrc: accountingQB },
    { key: 'dec-2018-Math', title: 'Business Law', imgSrc: buisnessQB },
    { key: 'ratio-mcq', title: 'Quantitative Aptitude', imgSrc: apptQB },
    { key: 'BusinessEconomicsQB', title: 'Business Economics', imgSrc: buiEcoQB },
  ];

  const handleClick = (key) => {
    navigate(`/mcqs/${key}`); // Correct navigation function
  };

  return (
    <div className="section">
      <h2>Question Bank</h2>
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

export default CAFoundationQuestionBank;
