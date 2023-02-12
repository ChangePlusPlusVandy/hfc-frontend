import React from "react";
import RateButtons from "./components/RateButtons";

const Page0 = ({
    answer1,
    setAnswer1,
    answer2,
    setAnswer2,
    answer3,
    setAnswer3,
    answer4,
    setAnswer4,
}) => {
    const handleChangeAnswer1 = (index) => {
        console.log("answer1: ", index + 1);
        setAnswer1(index + 1);
    };

    const handleChangeAnswer2 = (index) => {
        setAnswer2(index + 1);
    };

    const handleChangeAnswer3 = (index) => {
        setAnswer3(index + 1);
    };

    const handleChangeAnswer4 = (index) => {
        setAnswer4(index + 1);
    };

    return (
        <div className="form-container">
            <p>
                Enter numeric value of response with the corresponding question.
            </p>

            <div>
                <h4>Question 1</h4>
                <p>How hopeful and positive do you feel about your future?</p>
                <RateButtons
                    activeRatingIndex={answer1 - 1}
                    onBtnClick={handleChangeAnswer1}
                />
            </div>
            <br></br>

            <div>
                <h4>Question 2</h4>
                <p>
                    How much do you experience happy, positive feelings in your
                    daily life?
                </p>
                <RateButtons
                    activeRatingIndex={answer2 - 1}
                    onBtnClick={handleChangeAnswer2}
                />
            </div>
            <br></br>

            <div>
                <h4>Question 3</h4>
                <p>How often do you feel depressed?</p>{" "}
                <RateButtons
                    activeRatingIndex={answer3 - 1}
                    onBtnClick={handleChangeAnswer3}
                />
            </div>
            <br></br>

            <div>
                <h4>Question 4</h4>
                <p>How much are you able to relax and enjoy yourself?</p>
                <RateButtons
                    activeRatingIndex={answer4 - 1}
                    onBtnClick={handleChangeAnswer4}
                />
            </div>
            <br></br>
        </div>
    );
};

export default Page0;
