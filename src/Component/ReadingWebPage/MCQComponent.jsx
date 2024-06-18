import React, { useState, useEffect } from 'react';
import './MCQCompnent.css';

const MCQComponent = () => {
    const [mcq, setMcq] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

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
    }, []);

    if (!mcq) return <div>Loading...</div>;

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setShowFeedback(true);
    };

    const handleNextClick = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setShowFeedback(false);
    };

    const currentQuestion = mcq.questions[currentQuestionIndex];

    return (
        <div className='first'>
            <h2>{currentQuestion.question}</h2>
            <ul>
                {currentQuestion.options.map(option => (
                    <li
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        style={{
                            color:
                                showFeedback && option === currentQuestion.correctAnswer
                                    ? 'green'
                                    : showFeedback && option === selectedOption
                                    ? 'red'
                                    : 'black'
                        }}
                    >
                        {option}
                    </li>
                ))}
            </ul>
            {showFeedback && (
                <div>
                    <p>{`The correct answer is: ${currentQuestion.correctAnswer}`}</p>
                    {currentQuestion.reason && <p>{currentQuestion.reason}</p>}
                </div>
            )}
            {currentQuestionIndex < mcq.questions.length - 1 && (
                <button onClick={handleNextClick}>Next</button>
            )}
        </div>
    );
};

export default MCQComponent;
