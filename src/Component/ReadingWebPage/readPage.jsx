import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './readWeb.css';

const ReadWeb = () => {
  const { key } = useParams();
  const history = useHistory();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/section?key=${key}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [key]);

  const navigateToSection = (sectionKey) => {
    history.push(`/readWeb/${sectionKey}`);
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  return (
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
            <tr key={rowIndex}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
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
