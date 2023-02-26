import React from "react";
import RateButtons from "./RateButtons";

const Question = ({ questionNum, question, answer, setAnswer }) => {
    // const handleChangeAnswer10 = (event) => {
    //     setAnswer10(event.target.value);
    // };

    return (
        <div>
            <h4> Question {questionNum}</h4>
            <p>{question}</p>
            <RateButtons
                activeRatingIndex={answer - 1}
                onBtnClick={setAnswer}
            />
            {/* <p>(optional) elaborate here</p>
            <input
                    type="text"
                    id="answer10"
                    onChange={handleChangeAnswer10}
                    placeholder="Type here"
                    value={answer10}
                /> */}
        </div>
    );
};

export default Question;
