import React from "react";

const Page1 = ({
    answer5,
    setAnswer5,
    answer6,
    setAnswer6,
    answer7,
    setAnswer7,
}) => {
    const handleChangeAnswer5 = (event) => {
        setAnswer5(event.target.value);
    };

    const handleChangeAnswer6 = (event) => {
        setAnswer6(event.target.value);
    };

    const handleChangeAnswer7 = (event) => {
        setAnswer7(event.target.value);
    };

    return (
        <div className="form-container">
            <h2>Life Skills Questionnaire</h2>
            <p>
                Enter numeric value of response with the corresponding question.
            </p>

            <label>
                <h4> Question 5</h4>
                <p>How much do you value yourself?</p>
                <input
                    type="number"
                    id="answer5"
                    onChange={handleChangeAnswer5}
                    placeholder="Enter a number 1-5"
                    value={answer5}
                />
            </label>
            <br></br>

            <label>
                <h4> Question 6</h4>
                <p>How well do you manage your stress and anxiety?</p>
                <input
                    type="number"
                    id="answer6"
                    onChange={handleChangeAnswer6}
                    placeholder="Enter a number 1-5"
                    value={answer6}
                />
            </label>
            <br></br>

            <label>
                <h4> Question 7</h4>
                <p>
                    How strong are you in solving problems and making decisions
                    for yourself?
                </p>
                <input
                    type="number"
                    id="answer7"
                    onChange={handleChangeAnswer7}
                    placeholder="Enter a number 1-5"
                    value={answer7}
                />
            </label>
            <br></br>
        </div>
    );
};

export default Page1;
