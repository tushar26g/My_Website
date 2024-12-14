import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './IndexBasedRead.css';
import Topic from '../../Assets/Icon/topic.png';
import Module from '../../Assets/Icon/module.png';
import Chapter from '../../Assets/Icon/chapter.png';
import Lec from '../../Assets/Icon/lecture.png';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css'

const IndexBasedRead = () => {
  const { key } = useParams();
  const navigate = useNavigate(); // Use useNavigate hook
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
        const response = await fetch(`http://localhost:8080/public/indexBasedWebData?key=${key}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
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
        const response = await fetch(`http://localhost:8080/public/indexBasedRead?key=${key}`);
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
    navigate(`/indexBasedRead/${sectionKey}`); // Use navigate for routing
    setIsIndexVisible(false); // Hide index on section navigation
  };

  const renderIndex = () => {
    return indexData.map(module => (
      <div className='webpage_read' key={module.moduleTitle}>
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
                      <img src={Lec} alt='Module Logo' className='logo' />
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
    if (!data || !data.bodyIndex || !Array.isArray(data.bodyIndex.content)) {
      return <p>No content available</p>;
    }

    return (
      <div className="readWeb">
        <h1 className='indexBasedHeading'>{data.heading}</h1>
        {data.bodyIndex.content.map((item, index) => {
          switch (item.type) {
            case 'text':
              return <TextSection key={index} content={item.content} />;
            case 'table':
              return <TableSection key={index} title={item.title} content={item.content} />;
            case 'list':
              return <ListSection key={index} content={item.content} />;
            case 'heading':
              return <HeadingSection key={index} content={item.content} />;
            case 'example':
              return <ExampleSection key={index} content={item.content} />;
            case 'boldPoint':
              return <BoldPintSection key={index} content={item.content} />;
            case 'properties':
              return <PropertiesSection key={index} content={item.content} />;
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
      <div className='ads'>
                <p>Ads</p>
      </div>
    </div>
  );
};

const TextSection = ({ content }) => {
  return <div className="text-section"><p>{renderTextWithMathAndBold(content)}</p></div>;
};

const BoldPintSection = ({ content }) => {
  return <div className="boldPoint-section"><h3>{content}</h3></div>;
};
const HeadingSection = ({ content }) => {
  return <div className="heading-section_forPage"><h2>{content}</h2></div>;
};

const ExampleSection = ({ content }) => {
  return (
    <div className="example-section">
      <div className="example-content">
        {content.map((item, index) => (
          <div key={index}>
            {renderTextWithMathAndBold(item.content)}
          </div>
        ))}
      </div>
    </div>
  );
};

const renderTextWithMathAndBold = (text) => {
  // If the input is an array, process each element recursively
  if (Array.isArray(text)) {
    return text.map((line, index) => (
      <p key={index}>{renderTextWithMathAndBold(line)}</p>
    ));
  }

  // Ensure the input is a string before applying split
  if (typeof text === "string") {
    // Split text by **bold** and \(math\) markers
    const parts = text.split(/(\*\*[^*]+\*\*|\\\(.*?\\\))/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        // If part is bold text (wrapped in **), render as bold
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      } else if (part.startsWith("\\(") && part.endsWith("\\)")) {
        // If part is a math expression (wrapped in \( \)), render as InlineMath
        const equation = part.slice(2, -2); // Remove \( and \)
        return (
          <React.Fragment key={index}>
            <InlineMath style={{ fontSize: '17px' }}>{equation}</InlineMath>
            <span style={{ marginRight: '0.2em' }}></span>
          </React.Fragment>
        );
      } else {
        // Otherwise, render as plain text
        return (
          <React.Fragment key={index}>
            <span>{part}</span>
            <span style={{ marginRight: '0.2em' }}></span>
          </React.Fragment>
        );
      }
    });
  }

  // Return null for unexpected input types
  return null;
};



const PropertiesSection = ({ content }) => {
  if (!Array.isArray(content)) {
    return <p>No list content available</p>;
  }

  return (
    <div className="list-section">
      <ul>
        {content.map((item, index) => (
          <li key={index}>
            <p>{renderTextWithMathAndBold(item.content)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const TableSection = ({ title, content }) => {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return <p>No table content available</p>;
  }

  // Extract headers from the first object in content
  const headers = Object.keys(content[0]);

  return (
    <div className="table-section">
      {title && <h2>{renderTextWithMathAndBold(title)}</h2>}
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{renderTextWithMathAndBold(header)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex}>{renderTextWithMathAndBold(row[header])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



const ListSection = ({ content }) => {
  if (!Array.isArray(content)) {
    return <p>No list content available</p>;
  }

  return (
    <div className="list-section">
      <h1>List section please change it.</h1>
    </div>
  );
};

export default IndexBasedRead;
