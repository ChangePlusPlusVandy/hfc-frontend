import React from "react";
import Question from "./components/question";

const Page3 = ({ questions, answers, setAnswers }) => {
    // const handleChangeAnswer10 = (event) => {
    //     setAnswer10(event.target.value);
    // };

    // const handleChangeAnswer11 = (event) => {
    //     setAnswer11(event.target.value);
    // };

    // const handleChangeAnswer12 = (event) => {
    //     setAnswer12(event.target.value);
    // };

    // const handleChangeAnswer13 = (event) => {
    //     setAnswer13(event.target.value);
    // };

    const handleChangeAnswer1 = (index) => {
        answers[0] = index + 1;
        setAnswers(answers);
        console.log(answers);
    };

    return (
        <div className="form-container">
            <p>
                Enter numeric value of response with the corresponding question.
            </p>

            {/* <div>
                <h4> Question 10</h4>
                <p>What is your grade at school?</p>
                <input
                    type="number"
                    id="answer10"
                    onChange={handleChangeAnswer10}
                    placeholder="Enter a number"
                    value={answer10}
                />
            </div>
            <br></br>

            <div>
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
            </div>
            <br></br>

            <div>
                <h4> Question 12</h4>
                <p>Do you have any concerns or special needs</p>
                <input
                    type="text"
                    id="answer12"
                    onChange={handleChangeAnswer12}
                    placeholder="Type your answer here"
                    value={answer12}
                />
            </div>
            <br></br>

            <div>
                <h4> Question 13</h4>
                <p>What strengths do you think you have?</p>
                <input
                    type="text"
                    id="answer13"
                    onChange={handleChangeAnswer13}
                    placeholder="Type your answer here"
                    value={answer13}
                />
            </div>
            <br></br> */}

            <Question
                questionNum={10}
                question={questions[0]}
                rating={answers[0]}
                setRating={handleChangeAnswer1}
            />
            <br></br>

            <br></br>
        </div>
    );
};

export default Page3;
