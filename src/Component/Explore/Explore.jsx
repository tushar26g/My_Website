import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Explore.css';
import bcom from '../../Assets/Home/bcom.png';
import caHub from '../../Assets/Home/group.jpg';
import articalship from '../../Assets/Home/articalship.jpg';
import CA from '../../Assets/Home/CA2.jpg';
import intervivew from '../../Assets/Home/intervivew.jpg';
import tax from '../../Assets/Home/Tax.png';
import inter from '../../Assets/Home/Inter.jpg';
import found from '../../Assets/Home/foundation.png';

const Basic = () => {
  const navigate = useNavigate(); // Use the correct hook

  const scrollToArticalship = () => {
    const articalshipElement = document.getElementById('articalship');
    if (articalshipElement) {
      articalshipElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCAFoundation = () => {
    const foundationElement = document.getElementById('ca foundation');
    if (foundationElement) {
      foundationElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToJob = () => {
    navigate('/Job'); // Call navigate directly
  };

  return (
    <div className='Basic'>
      <div className='HomeButton' onClick={handleNavigateToJob}>
        <div><img src={caHub} alt="CA Hub" /></div>
        <div className='content'>
          <h3>CA Hub</h3>
          <p>The greatest financial jobs opportunities are packed here</p>
        </div>
      </div>
      <div className='HomeButton' onClick={scrollToCAFoundation}>
        <div><img src={found} alt="Example" /></div>
        <div className='content'>
          <h3>CA foundation</h3>
          <p>CA Final exam study material, question bank, PYQ</p>
        </div>
      </div>
      <div className='HomeButton'>
        <div><img src={inter} alt="Example" /></div>
        <div className='content'>
          <h3>CA Inter</h3>
          <p>CA Inter exam study material, question bank, PYQ</p>
        </div>
      </div>
      <div className='HomeButton'>
        <div><img src={CA} alt="Example" /></div>
        <div className='content'>
          <h3>CA Final</h3>
          <p>CA Final exam study material, question bank, PYQ</p>
        </div>
      </div>
      <div className='HomeButton'>
        <div><img src={tax} alt="Example" /></div>
        <div className='content'>
          <h3>Tax Laws</h3>
          <p>All tax law</p>
        </div>
      </div>
      <div className='HomeButton' onClick={scrollToArticalship}>
        <div><img src={articalship} alt="Example" /></div>
        <div className='content'>
          <h3>Articalship</h3>
          <p>All the tools info use in Articalship</p>
        </div>
      </div>
      <div className='HomeButton'>
        <div><img src={intervivew} alt="Example" /></div>
        <div className='content'>
          <h3>Job preparation</h3>
          <p>Imp interview questions on all sub required job</p>
        </div>
      </div>
      <div className='HomeButton'>
        <div><img src={bcom} alt="Example" /></div>
        <div className='content'>
          <h3>B.Com</h3>
          <p>B.Com Projects, study material, question bank</p>
        </div>
      </div>
    </div>
  );
};

export default Basic;
