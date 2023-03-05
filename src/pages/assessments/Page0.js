import React from "react";
import Question from "./components/question";

const Page0 = ({ questions, setQuestions }) => {
    return (
        <div className="form-container">
            <p>
                Enter numeric value of response with the corresponding question.
            </p>

            {questions.map((obj, i) => {
                return (
                    <Question
                        questionNum={i + 1}
                        question={obj.question}
                        answer={obj.answer}
                        setAnswer={(newAns) => {
                            setQuestions((prev) => {
                                let copy = [...prev];
                                copy[i].answer = newAns;
                                return copy;
                            });
                        }}
                        text={obj.text}
                        setText={(newText) => {
                            setQuestions((prev) => {
                                let copy = [...prev];
                                copy[i].text = newText;
                                return copy;
                            });
                        }}
                    />
                );
            })}
        </div>
    );
};

export default Page0;
