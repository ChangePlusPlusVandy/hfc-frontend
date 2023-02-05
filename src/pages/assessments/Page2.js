import React from "react";

const Page2 = ({ answer8, setAnswer8, answer9, setAnswer9 }) => {
    const handleChangeAnswer8 = (event) => {
        setAnswer8(event.target.value);
    };

    const handleChangeAnswer9 = (event) => {
        setAnswer9(event.target.value);
    };

    return (
        <div className="form-container">
            <h2>Social Skills Questionnaire</h2>
            <p>
                Enter numeric value of response with the corresponding question.
            </p>

            <label>
                <h4> Question 8</h4>
                <p>
                    How much do you feel that loneliness is a problem for you?
                </p>
                <input
                    type="number"
                    id="answer8"
                    onChange={handleChangeAnswer8}
                    placeholder="Enter a number 1-5"
                    value={answer8}
                />
            </label>
            <br></br>

            <label>
                <h4> Question 9</h4>
                <p>
                    Are you able to get the kind of support from others that you
                    need?
                </p>
                <input
                    type="number"
                    id="answer9"
                    onChange={handleChangeAnswer9}
                    placeholder="Enter a number 1-5"
                    value={answer9}
                />
            </label>
            <br></br>
        </div>
    );
};

export default Page2;
