import React from 'react';
import { useHistory } from 'react-router-dom';
import './Articalship.css';

const Articalship = () => {
  const history = useHistory();

  const components = [
    { key: 'excel1002', title: 'Excel', description: 'Excel' },
    { key: 'word', title: 'Word', description: 'Word' },
    { key: 'pdf', title: 'PDF', description: 'PDF' },
  ];

  const handleClick = (key) => {
    history.push(`/readWeb/${key}`);
  };

  return (
    <div id="articalship" className='Basic'>
      <h3>Articalship</h3>
      {components.map((component) => (
        <div key={component.key} className='HomeButton' onClick={() => handleClick(component.key)}>
          <div className='content'>
            <h3>{component.title}</h3>
            <p>{component.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Articalship;
