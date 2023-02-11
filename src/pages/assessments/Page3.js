import React from "react";

const Page3 = ({
    answer10,
    setAnswer10,
    answer11,
    setAnswer11,
    answer12,
    setAnswer12,
    answer13,
    setAnswer13,
    answer14,
    setAnswer14,
}) => {
    const handleChangeAnswer10 = (event) => {
        setAnswer10(event.target.value);
    };

    const handleChangeAnswer11 = (event) => {
        setAnswer11(event.target.value);
    };

    const handleChangeAnswer12 = (event) => {
        setAnswer12(event.target.value);
    };

    const handleChangeAnswer13 = (event) => {
        setAnswer13(event.target.value);
    };

    const handleChangeAnswer14 = (event) => {
        setAnswer14(event.target.value);
    };

    return (
        <div className="form-container">
            <p>
                Enter numeric value of response with the corresponding question.
            </p>

            <label>
                <h4> Question 10</h4>
                <p>What is your grade at school?</p>
                <input
                    type="number"
                    id="answer10"
                    onChange={handleChangeAnswer10}
                    placeholder="Enter a number"
                    value={answer10}
                />
            </label>
            <br></br>

            <label>
                <h4> Question 11</h4>
                <p>
                    Please rate your academic performance at school from 1 to 10
                </p>
                <input
                    type="number"
                    id="answer11"
                    onChange={handleChangeAnswer11}
                    placeholder="Enter a number 1-10"
                    value={answer11}
                />
            </label>
            <br></br>

            <label>
                <h4> Question 12</h4>
                <p>Do you have any concerns or special needs</p>
                <input
                    type="text"
                    id="answer12"
                    onChange={handleChangeAnswer12}
                    placeholder="Type your answer here"
                    value={answer12}
                />
            </label>
            <br></br>

            <label>
                <h4> Question 13</h4>
                <p>What strengths do you think you have?</p>
                <input
                    type="text"
                    id="answer13"
                    onChange={handleChangeAnswer13}
                    placeholder="Type your answer here"
                    value={answer13}
                />
            </label>
            <br></br>

            <label>
                <h4> Question 14</h4>
                <p>How satisfied are you with your skills and abilities?</p>
                <input
                    type="number"
                    id="answer14"
                    onChange={handleChangeAnswer14}
                    placeholder="Enter a number 1-5"
                    value={answer14}
                />
            </label>
            <br></br>
        </div>
    );
};

export default Page3;
