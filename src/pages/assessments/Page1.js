import React from "react";
import Question from "./components/question";

const Page1 = ({ questions, answers, setAnswers }) => {
    // const handleChangeAnswers = (index) => {
    //     // console.log("index:", index);
    //     setAnswers([...answers, index + 1]);
    // };

    const handleChangeAnswer1 = (index) => {
        answers[0] = index + 1;
        setAnswers(answers);
        console.log(answers);
    };

    const handleChangeAnswer2 = (index) => {
        answers[1] = index + 1;
        setAnswers(answers);
        console.log(answers);
    };

    const handleChangeAnswer3 = (index) => {
        answers[2] = index + 1;
        setAnswers(answers);
        console.log(answers);
    };

    return (
        <div className="form-container">
            <p>
                Enter numeric value of response with the corresponding question.
            </p>

            <Question
                questionNum={5}
                question={questions[0]}
                answer={answers[0]}
                setAnswer={handleChangeAnswer1}
            />
            <br></br>

            <Question
                questionNum={6}
                question={questions[1]}
                answer={answers[1]}
                setAnswer={handleChangeAnswer2}
            />

            <Question
                questionNum={7}
                question={questions[2]}
                answer={answers[2]}
                setAnswer={handleChangeAnswer3}
            />

            {/* <div>
                <h4> Question 6</h4>
                <p>{questions[1]}</p>
                <RateButtons
                    activeRatingIndex={answers[1] - 1}
                    onBtnClick={handleChangeAnswers}
                />
            </div>
            <br></br> */}

            {/* <div>
                <h4> Question 7</h4>
                <p>{questions[2]}</p>
                <RateButtons
                    activeRatingIndex={answers[2] - 1}
                    onBtnClick={handleChangeAnswers}
                />
            </div> */}
            <br></br>
        </div>
    );
};

export default Page1;
