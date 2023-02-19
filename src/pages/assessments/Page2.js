import React from "react";
import RateButtons from "./components/RateButtons";

const Page2 = ({ questions, answers, setAnswers }) => {
    const handleChangeAnswers = (index) => {
        setAnswers([...answers, index + 1]);
    };

    return (
        <div className="form-container">
            <p>
                Enter numeric value of response with the corresponding question.
            </p>

            <div>
                <h4> Question 8</h4>
                <p>{questions[0]} </p>
                <RateButtons
                    activeRatingIndex={answers[0] - 1}
                    onBtnClick={handleChangeAnswers}
                />
            </div>
            <br></br>

            <div>
                <h4> Question 9</h4>
                <p>{questions[1]}</p>
                <RateButtons
                    activeRatingIndex={answers[1] - 1}
                    onBtnClick={handleChangeAnswers}
                />
            </div>
            <br></br>
        </div>
    );
};

export default Page2;
