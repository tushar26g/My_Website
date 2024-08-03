import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './IndexBasedRead.css';
import Topic from '../../Assets/Icon/topic.png';
import Module from '../../Assets/Icon/module.png';
import Chapter from '../../Assets/Icon/chapter.png';

const IndexBasedRead = () => {
  const { key } = useParams();
  const history = useHistory();
  const [data, setData] = useState(null);
  const [indexData, setIndexData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [isIndexVisible, setIsIndexVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/indexBasedWebData?key=${key}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchIndexData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/indexBasedRead?key=${key}`);
        if (!response.ok) {
          throw new Error('Failed to fetch index data');
        }
        const indexData = await response.json();
        setIndexData(indexData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchIndexData();
  }, [key]);

  useEffect(() => {
    setCurrentSection(key);
  }, [key]);

  const navigateToSection = sectionKey => {
    history.push(`/indexBasedRead/${sectionKey}`);
    setIsIndexVisible(false); // Hide index on section navigation
  };

  const renderIndex = () => {
    return indexData.map(module => (
      <div key={module.moduleTitle}>
        <h3>
          <img src={Module} alt='Module Logo' className='logo' />
          {module.moduleTitle}
        </h3>
        {module.chapters.map(chapter => (
          <div key={chapter.chapterTitle} className="chapter">
            <h4>
              <img src={Chapter} alt='Chapter Logo' className='logo' />
              {chapter.chapterTitle}
            </h4>
            {chapter.units.map(unit => (
              <div key={unit.unitTitle} className="unit">
                <h5>
                  <img src={Topic} alt='Unit Logo' className='logo' />
                  {unit.unitTitle}
                </h5>
                <ul>
                  {unit.topics.map(topic => (
                    <li
                      key={topic.key}
                      className={`topic ${currentSection === topic.key ? 'active' : ''}`}
                      onClick={() => navigateToSection(topic.key)}
                    >
                      <h6>{topic.title}</h6>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    ));
  };

  const renderContent = () => {
    if (!data || !data.bodyIndex || !data.bodyIndex.content) {
      return <p>No content available</p>;
    }

    return (
      <div className="readWeb">
        <h1>{data.heading}</h1>
        {data.bodyIndex.content.map((item, index) => {
          switch (item.type) {
            case 'text':
              return <TextSection key={index} content={item.content} />;
            case 'table':
              return <TableSection key={index} title={item.title} content={item.content} />;
            default:
              return null;
          }
        })}
        <div className="navigation-buttons">
          {data.previous && <button onClick={() => navigateToSection(data.previous)}>Previous</button>}
          {data.next && <button onClick={() => navigateToSection(data.next)}>Next</button>}
        </div>
      </div>
    );
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div className="readWeb-Container">
      <div className="header2">
        <div className="hamburger-menu2" onClick={() => setIsIndexVisible(!isIndexVisible)}>
          &#9776; 
        </div>
      </div>
      <div className={`indexRead ${isIndexVisible ? 'visible' : 'hidden'}`}>
        {renderIndex()}
      </div>
      <div className='data-container'>
        {renderContent()}
      </div>
    </div>
  );
};

const TextSection = ({ content }) => {
  return <div className="text-section"><p>{content}</p></div>;
};

const TableSection = ({ title, content }) => {
  const headers = content.length > 0 ? Object.keys(content[0]) : [];
  return (
    <div className="table-section">
      {title && <h2>{title}</h2>}
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map(header => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexBasedRead;
