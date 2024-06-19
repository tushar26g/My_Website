import React, { useState, useEffect } from 'react';
import './MCQCompnent.css';

const MCQComponent = () => {
    const [mcq, setMcq] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [showFeedback, setShowFeedback] = useState({});
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/mcqs/Accounting%20Chapter%201%20MCQ')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(mcq => setMcq(mcq))
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [currentTopicIndex]);

    if (!mcq) return <div>Loading...</div>;

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
        <div className='first'>
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
                            <p>{`Correct ans: ${question.correctAnswer}`}</p>
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
    );
};

export default MCQComponent;
