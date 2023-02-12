import React from "react";
import RateButtons from "./components/RateButtons";

const Page2 = ({ answer8, setAnswer8, answer9, setAnswer9 }) => {
    const handleChangeAnswer8 = (index) => {
        setAnswer8(index + 1);
    };

    const handleChangeAnswer9 = (index) => {
        setAnswer9(index + 1);
    };

    return (
        <div className="form-container">
            <p>
                Enter numeric value of response with the corresponding question.
            </p>

            <div>
                <h4> Question 8</h4>
                <p>
                    How much do you feel that loneliness is a problem for you?
                </p>
                <RateButtons
                    activeRatingIndex={answer8 - 1}
                    onBtnClick={handleChangeAnswer8}
                />
            </div>
            <br></br>

            <div>
                <h4> Question 9</h4>
                <p>
                    Are you able to get the kind of support from others that you
                    need?
                </p>
                <RateButtons
                    activeRatingIndex={answer9 - 1}
                    onBtnClick={handleChangeAnswer9}
                />
            </div>
            <br></br>
        </div>
    );
};

export default Page2;
