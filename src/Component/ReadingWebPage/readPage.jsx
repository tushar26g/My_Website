import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Changed useHistory to useNavigate
import './readWeb.css';

const ReadWeb = () => {
  const { key } = useParams();
  const navigate = useNavigate(); // Changed history to navigate
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSection, setCurrentSection] = useState(key);
  const [indexData, setIndexData] = useState([]);
  const [showIndex, setShowIndex] = useState(false);

  useEffect(() => {
    // Fetch detailed data
    fetch(`http://localhost:8080/public/section?key=${key}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        setCurrentSection(key);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    // Fetch index data
    fetch(`http://localhost:8080/public/index?key=${key}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((indexData) => {
        setIndexData(indexData);
      })
      .catch((error) => {
        console.error('Error fetching index:', error);
      });
  }, [key]);

  const navigateToSection = (sectionKey) => {
    navigate(`/readWeb/${sectionKey}`); // Updated navigation function
    setShowIndex(false); // Hide index on section navigation
  };

  const handleIndexClick = (sectionKey) => {
    navigateToSection(sectionKey);
    setCurrentSection(sectionKey);
  };

  const toggleIndex = () => {
    setShowIndex(!showIndex); // Toggle index visibility
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  if (!data || !data.body || !data.body.content) {
    return <p>No content available</p>; // or handle this case appropriately
  }

  return (
    <div>
      <div className="header">
        <div className="hamburger-menu" onClick={toggleIndex}>
          &#9776; 
        </div>
      </div>
      <div className="readWebContainer">
        <div className={`index ${showIndex ? 'show' : ''}`}>
          <h3 onClick={toggleIndex}>Index</h3>
          {indexData.map((section) => (
            <div
              key={section.key}
              className={`index-item ${currentSection === section.key ? 'active' : ''}`}
              onClick={() => handleIndexClick(section.key)}
            >
              {section.title}
            </div>
          ))}
        </div>
        <div className="readWeb">
          <h1>{data.heading}</h1>
          {data.body.content.map((item, index) => {
            switch (item.type) {
              case 'text':
                return <TextSection key={index} content={item.content} />;
              case 'table':
                return <TableSection key={index} title={item.title} content={item.content} />;
              case 'image':
                return <ImageSection key={index} content={item.content} />;
              default:
                return null;
            }
          })}
          <div className="navigation-buttons">
            {data.previous && <button onClick={() => navigateToSection(data.previous)}>Previous</button>}
            {data.next && <button onClick={() => navigateToSection(data.next)}>Next</button>}
          </div>
        </div>
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
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.map((row, rowIndex) => (
            <tr key={rowIndex} className="hamburger-row"> {/* Apply the hamburger-row class */}
              {headers.map((header, columnIndex) => (
                <td key={columnIndex}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ImageSection = ({ content }) => {
  return (
    <div className="image-section">
      <img src={content.src} alt={content.alt} />
    </div>
  );
};

export default ReadWeb;
