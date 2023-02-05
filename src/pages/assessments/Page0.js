import React from "react";

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
    const handleChangeAnswer1 = (event) => {
        setAnswer1(event.target.value);
    };

    const handleChangeAnswer2 = (event) => {
        setAnswer2(event.target.value);
    };

    const handleChangeAnswer3 = (event) => {
        setAnswer3(event.target.value);
    };

    const handleChangeAnswer4 = (event) => {
        setAnswer4(event.target.value);
    };

    return (
        <div className="form-container">
            <h2>Mental Health Questionnaire</h2>
            <p>
                Enter numeric value of response with the corresponding question.
            </p>

            <label>
                <h4>Question 1</h4>
                <p>How hopeful and positive do you feel about your future?</p>
                <input
                    type="number"
                    id="answer1"
                    onChange={handleChangeAnswer1}
                    placeholder="Enter a number 1-5"
                    value={answer1}
                />
            </label>
            <br></br>

            <label>
                <h4>Question 2</h4>
                <p>
                    How much do you experience happy, positive feelings in your
                    daily life?
                </p>
                <input
                    type="number"
                    id="answer2"
                    onChange={handleChangeAnswer2}
                    placeholder="Enter a number 1-5"
                    value={answer2}
                />
            </label>
            <br></br>

            <label>
                <h4>Question 3</h4>
                <p>How often do you feel depressed?</p>
                <input
                    type="number"
                    id="answer3"
                    onChange={handleChangeAnswer3}
                    placeholder="Enter a number 1-5"
                    value={answer3}
                />
            </label>
            <br></br>

            <label>
                <h4>Question 4</h4>
                <p>How much are you able to relax and enjoy yourself?</p>
                <input
                    type="number"
                    id="answer4"
                    onChange={handleChangeAnswer4}
                    placeholder="Enter a number 1-5"
                    value={answer4}
                />
            </label>
            <br></br>
        </div>
    );
};

export default Page0;
