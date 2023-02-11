import React from "react";

const Page4 = ({ answer15, setAnswer15, answer16, setAnswer16 }) => {
    const handleChangeAnswer15 = (event) => {
        setAnswer15(event.target.value);
    };

    const handleChangeAnswer16 = (event) => {
        setAnswer16(event.target.value);
    };

    return (
        <div className="form-container">
            <p>
                Enter numeric value of response with the corresponding question.
            </p>

            <label>
                <h4> Question 15</h4>
                <p>
                    How confident you feel about your skills, and ability to
                    find work or earning money using your vocational skills?
                </p>
                <input
                    type="number"
                    id="answer15"
                    onChange={handleChangeAnswer15}
                    placeholder="Enter a number 1-5"
                    value={answer15}
                />
            </label>
            <br></br>

            <label>
                <h4> Question 16</h4>
                <p>
                    How often/much do you worry about your or your family's
                    financial difficulties?
                </p>
                <input
                    type="number"
                    id="answer16"
                    onChange={handleChangeAnswer16}
                    placeholder="Enter a number 1-5"
                    value={answer16}
                />
            </label>
            <br></br>
        </div>
    );
};

export default Page4;
