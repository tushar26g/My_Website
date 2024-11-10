import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MCQComponent.css';
import Topic from '../../Assets/Icon/topic.png';
import Module from '../../Assets/Icon/module.png';
import Chapter from '../../Assets/Icon/chapter.png';

const MCQComponent = () => {
    const { key } = useParams();
    const navigate = useNavigate();
    const [mcq, setMcq] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [showFeedback, setShowFeedback] = useState({});
    const [index, setIndex] = useState(null);
    const [isIndexVisible, setIsIndexVisible] = useState(false);

    useEffect(() => {
        // Fetch MCQ data based on the `key` and reset selected options and feedback
        fetch(`http://localhost:8080/public/mcqs?key=${encodeURIComponent(key)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                console.log('Response text:', text);
                try {
                    const mcqData = JSON.parse(text);
                    console.log('Parsed mcq data:', mcqData);
                    setMcq(mcqData);
                    
                    // Reset selected options and feedback when a new question set is loaded
                    setSelectedOptions({});
                    setShowFeedback({});
                    
                    // Scroll to top of the page when loading new data
                    window.scrollTo(0, 0);
                } catch (error) {
                    console.error('JSON parsing error:', error);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [key]); // Add `key` as a dependency

    useEffect(() => {
        // Fetch index data only once
        fetch('http://localhost:8080/public/mcqindex?key=x')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(index => setIndex(index))
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    if (!mcq) {
        return <div>Loading MCQ data...</div>;
    }

    if (!index) {
        return <div>Loading index...</div>;
    }

    const handleOptionClick = (questionIndex, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [questionIndex]: option,
        });
        setShowFeedback({
            ...showFeedback,
            [questionIndex]: true,
        });
    };

    const handleNextTopicClick = () => {
        if (mcq.next) {
            navigate(`/mcqs/${mcq.next}`);
            window.scrollTo(0, 0); // Scroll to top when navigating to the next topic
        }
    };

    const handlePrevTopicClick = () => {
        if (mcq.previous) {
            navigate(`/mcqs/${mcq.previous}`);
            window.scrollTo(0, 0); // Scroll to top when navigating to the previous topic
        }
    };

    return (
        <div className='mcq-container'>
            <div className="header3">
                <div className="hamburger-menu3" onClick={() => setIsIndexVisible(!isIndexVisible)}>
                    &#9776;
                </div>
            </div>
            <div className={`index-sidebar ${isIndexVisible ? 'visible' : 'hidden'}`}>
                {Array.isArray(index) && index.map((module, modIndex) => (
                    <div key={modIndex}>
                        <h2>
                            <img src={Module} alt='Module Logo' className='logo' />
                            {module.moduleTitle}
                        </h2>
                        {Array.isArray(module.mcqchapters) && module.mcqchapters.map((chapter, chapIndex) => (
                            <div key={chapIndex}>
                                <h3>
                                    <img src={Chapter} alt='Chapter Logo' className='logo' />
                                    {chapter.mcqchapterTitle}
                                </h3>
                                <ul>
                                    {Array.isArray(chapter.mcqunits) && chapter.mcqunits.map((unit, unitIndex) => (
                                        <li key={unitIndex}>
                                            <img src={Topic} alt='Unit Logo' className='logo' />
                                            {unit.mcqunitTitle}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className='mcq-content'>
                <h1 className='indexBasedHeading'>{mcq.heading}</h1>
                <p>{mcq.description}</p>
                {mcq.questions && mcq.questions.map((question, index) => (
                    <div key={index} className='question-block'>
                        <h3>{question.question}</h3>
                        <ul>
                            {question.options.map(option => (
                                <li
                                    key={option}
                                    className={
                                        showFeedback[index]
                                            ? option === question.ans
                                                ? 'correct'
                                                : option === selectedOptions[index]
                                                ? 'incorrect'
                                                : ''
                                            : ''
                                    }
                                >
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option}
                                            checked={selectedOptions[index] === option}
                                            onChange={() => handleOptionClick(index, option)}
                                        />
                                        {option}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        {showFeedback[index] && (
                            <div className='feedback'>
                                <h4><span className='solution'>Ans:</span> {question.ans}</h4>
                                {question.solution && (
                                    <div>
                                        <h4 className='solution'>Solution:</h4>
                                        <ul>
                                            {question.solution.map((step, stepIndex) => (
                                                <li className="stepLi" key={stepIndex}>{step}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
                
                <div className='navigation-buttons'>
                    {mcq.previous && <button onClick={handlePrevTopicClick}>Previous</button>}
                    {mcq.next && <button onClick={handleNextTopicClick}>Next</button>}
                </div>
            </div>
            <div className='ads'>
                <p>Ads</p>
            </div>
        </div>
    );
};

export default MCQComponent;
