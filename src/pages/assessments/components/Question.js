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
    let buttonNames = [];
    // TODO: buttonNames make them all the same in RateButtons.js
    switch (question) {
        case "How much do you feel that loneliness is a problem for you?":
        case "How much do you experience happy, positive feelings in your daily life?":
            buttonNames = [
                "Never",
                "A little bit",
                "Sometimes",
                "Often",
                "Almost every day",
            ];
            break;
        case "How much are you able to relax and enjoy yourself?":
        case "How much do you value yourself?":
            buttonNames = [
                "Not at All",
                "A little bit",
                "Medium",
                "A good amount",
                "Very much",
            ];
            break;
        case "How well do you manage your stress and anxiety?":
            buttonNames = [
                "Not at All",
                "A little bit",
                "Medium",
                "Well",
                "Extremely well",
            ];
            break;
        case "Do you believe you have useful skills and abilities?":
            buttonNames = [
                "Not at All",
                "A little bit",
                "Medium",
                "Very much so",
                "Extremely so",
            ];
            break;
        case "Are you able to get the kind of support from others that you need?":
            buttonNames = [
                "Not at All",
                "A little bit",
                "Medium",
                "Mostly",
                "Completely",
            ];
            break;
        default:
            buttonNames = [
                "Not at All",
                "A little bit",
                "Medium",
                "Very",
                "Extremely",
            ];
    }

    return (
        <div className="question-container">
            <h4> Question {questionNum}</h4>
            <div className="rating-answer">
                <p>{question}</p>
                <RateButtons
                    activeRatingIndex={answer - 1}
                    onBtnClick={setAnswer}
                    buttonNames={buttonNames}
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
