import React from "react";
import RateButtons from "./components/RateButtons";

const Page4 = ({ answer15, setAnswer15, answer16, setAnswer16 }) => {
    const handleChangeAnswer15 = (index) => {
        setAnswer15(index + 1);
    };

    const handleChangeAnswer16 = (index) => {
        setAnswer16(index + 1);
    };

    return (
        <div className="form-container">
            <p>
                Enter numeric value of response with the corresponding question.
            </p>

            <div>
                <h4> Question 15</h4>
                <p>
                    How confident you feel about your skills, and ability to
                    find work or earning money using your vocational skills?
                </p>
                <RateButtons
                    activeRatingIndex={answer15 - 1}
                    onBtnClick={handleChangeAnswer15}
                />
            </div>
            <br></br>

            <div>
                <h4> Question 16</h4>
                <p>
                    How often/much do you worry about your or your family's
                    financial difficulties?
                </p>
                <RateButtons
                    activeRatingIndex={answer16 - 1}
                    onBtnClick={handleChangeAnswer16}
                />
            </div>
            <br></br>
        </div>
    );
};

export default Page4;
