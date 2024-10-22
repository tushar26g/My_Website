import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Articalship.css';

const Articalship = () => {
  const navigate = useNavigate(); // Use useNavigate hook

  const components = [
    { key: 'excel1002', title: 'Excel', description: 'Excel' },
    { key: 'word', title: 'Word', description: 'Word' },
    { key: 'pdf', title: 'PDF', description: 'PDF' },
  ];

  const handleClick = (key) => {
    navigate(`/readWeb/${key}`); // Use navigate for routing
  };

  return (
    <div id="articalship" className='articalship-Basic'>
      <h1>Articalship</h1>
      <div className='articalship-content'>
        {components.map((component) => (
          <div key={component.key} className='HomeButton' onClick={() => handleClick(component.key)}>
            <div className='content'>
              <h3>{component.title}</h3>
              <p>{component.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articalship;
