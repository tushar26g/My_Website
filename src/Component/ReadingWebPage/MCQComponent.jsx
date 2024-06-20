import React, { useState, useEffect } from 'react';
import './MCQCompnent.css';

const MCQComponent = () => {
    const [mcq, setMcq] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [showFeedback, setShowFeedback] = useState({});
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
    const [index, setIndex] = useState(null); // State to hold the index data

    useEffect(() => {
        // Fetch MCQ questions data (just a placeholder, replace with your actual fetch logic)
        fetch('http://localhost:8080/mcqs/Accounting%20Chapter%201%20MCQ')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(mcqData => setMcq(mcqData))
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [currentTopicIndex]);

    useEffect(() => {
        // Fetch MCQ index data
        fetch('http://localhost:8080/mcqindex?key=x')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(indexData => setIndex(indexData))
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    // Check if mcq or mcq.questions is null or undefined
    if (!mcq || !mcq.questions) {
        return <div>Loading...</div>;
    }

    // Check if index is null or undefined
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
        setCurrentTopicIndex(currentTopicIndex + 1);
        setSelectedOptions({});
        setShowFeedback({});
    };

    const handlePrevTopicClick = () => {
        setCurrentTopicIndex(currentTopicIndex - 1);
        setSelectedOptions({});
        setShowFeedback({});
    };

    return (
        <div className='mcq-container'>
            <div className='index-sidebar'>
                {/* Render index data */}
                {Array.isArray(index) && index.map((module, modIndex) => (
                    <div key={modIndex}>
                        <h2>{module.moduleTitle}</h2>
                        {Array.isArray(module.mcqchapters) && module.mcqchapters.map((chapter, chapIndex) => (
                            <div key={chapIndex}>
                                <h3>{chapter.mcqchapterTitle}</h3>
                                <ul>
                                    {Array.isArray(chapter.mcqunits) && chapter.mcqunits.map((unit, unitIndex) => (
                                        <li key={unitIndex}>{unit.mcqunitTitle}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className='mcq-content'>
                {/* Render MCQ questions */}
                {mcq.questions.map((question, index) => (
                    <div key={index} className='question-block'>
                        <h3>{question.question}</h3>
                        <ul>
                            {question.options.map(option => (
                                <li
                                    key={option}
                                    className={
                                        showFeedback[index]
                                            ? option === question.correctAnswer
                                                ? 'correct'
                                                : option === selectedOptions[index]
                                                ? 'incorrect'
                                                : ''
                                            : ''
                                    }
                                >
                                    <label>
                                        <input
                                            type='radio'
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
                                <p>{`Correct answer: ${question.correctAnswer}`}</p>
                                {question.reason && <p>{question.reason}</p>}
                            </div>
                        )}
                    </div>
                ))}
                <div className='navigation-buttons'>
                    {currentTopicIndex > 0 && (
                        <button onClick={handlePrevTopicClick}>Previous Topic</button>
                    )}
                    <button onClick={handleNextTopicClick}>Next Topic</button>
                </div>
            </div>
        </div>
    );
};

export default MCQComponent;
