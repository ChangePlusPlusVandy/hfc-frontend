import React from "react";
import Question from "./components/question";

const Page = ({ questions, setQuestions, hasOnlyTextQs = false }) => {
    let numTextQs = 0;
    if (hasOnlyTextQs) {
        for (let i = 0; i < questions.length; ++i) {
            if (!questions[i].hasOwnProperty("answer")) {
                numTextQs++;
            } else {
                break;
            }
        }
    }
    const textQs = questions.slice(0, numTextQs);
    const rateQs = hasOnlyTextQs ? questions.slice(numTextQs) : questions;

    const handleChangeTextAnswers = (e, i) => {
        setQuestions((prev) => {
            let copy = [...prev];
            copy[i].text = e.target.value;
            return copy;
        });
    };

    return (
        <div className="form-container">
            {hasOnlyTextQs && (
                <div className="text-questions">
                    {textQs.map((obj, i) => {
                        return (
                            <div key={i} className="question-container">
                                <h4>Question {i + 1}</h4>
                                <p className="question"> {obj.question} </p>
                                <div className="text-answer">
                                    <input
                                        type="text"
                                        id="text-answer"
                                        onChange={(e) =>
                                            handleChangeTextAnswers(e, i)
                                        }
                                        value={obj.text}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="rate-questions">
                {rateQs.map((obj, i) => {
                    let questionIndex = numTextQs + i;
                    return (
                        <Question
                            key={questionIndex}
                            questionNum={questionIndex + 1}
                            question={obj.question}
                            answer={obj.answer}
                            setAnswer={(newAns) => {
                                setQuestions((prev) => {
                                    let copy = [...prev];
                                    copy[numTextQs + i].answer = newAns;
                                    return copy;
                                });
                            }}
                            text={obj.text}
                            setText={(newText) => {
                                setQuestions((prev) => {
                                    let copy = [...prev];
                                    copy[numTextQs + i].text = newText;
                                    return copy;
                                });
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Page;
