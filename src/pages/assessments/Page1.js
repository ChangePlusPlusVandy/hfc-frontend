import React from "react";
import RateButtons from "./components/RateButtons";

const Page1 = ({
    answer5,
    setAnswer5,
    answer6,
    setAnswer6,
    answer7,
    setAnswer7,
}) => {
    const handleChangeAnswer5 = (index) => {
        setAnswer5(index + 1);
    };

    const handleChangeAnswer6 = (index) => {
        setAnswer6(index + 1);
    };

    const handleChangeAnswer7 = (index) => {
        setAnswer7(index + 1);
    };

    return (
        <div className="form-container">
            <p>
                Enter numeric value of response with the corresponding question.
            </p>

            <div>
                <h4> Question 5</h4>
                <p>How much do you value yourself?</p>
                <RateButtons
                    activeRatingIndex={answer5 - 1}
                    onBtnClick={handleChangeAnswer5}
                />
            </div>
            <br></br>

            <div>
                <h4> Question 6</h4>
                <p>How well do you manage your stress and anxiety?</p>
                <RateButtons
                    activeRatingIndex={answer6 - 1}
                    onBtnClick={handleChangeAnswer6}
                />
            </div>
            <br></br>

            <div>
                <h4> Question 7</h4>
                <p>
                    How strong are you in solving problems and making decisions
                    for yourself?
                </p>
                <RateButtons
                    activeRatingIndex={answer7 - 1}
                    onBtnClick={handleChangeAnswer7}
                />
            </div>
            <br></br>
        </div>
    );
};

export default Page1;
