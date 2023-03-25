import React from "react";
import RateButtons from "./RateButtons";

const Question = ({
    questionNum,
    question,
    answer,
    setAnswer,
    text,
    setText,
}) => {
    return (
        <div className="question-container">
            <h4> Question {questionNum}</h4>
            <div className="rating-answer">
                <p>{question}</p>
                <RateButtons
                    activeRatingIndex={answer - 1}
                    onBtnClick={setAnswer}
                />
            </div>
            <div className="text-answer">
                <input
                    type="text"
                    id="text-answer"
                    onChange={(e) => setText(e.target.value)}
                    placeholder="(Optional) Elaborate here"
                    value={text}
                />
            </div>
        </div>
    );
};

export default Question;
