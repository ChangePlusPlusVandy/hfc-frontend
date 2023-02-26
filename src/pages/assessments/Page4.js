import React from "react";
import Question from "./components/question";
const Page4 = ({ questions, answers, setAnswers }) => {
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
                questionNum={11}
                question={questions[0]}
                answer={answers[0]}
                setAnswer={handleChangeAnswer1}
            />
            <br></br>

            <Question
                questionNum={12}
                question={questions[1]}
                answer={answers[1]}
                setAnswer={handleChangeAnswer2}
            />

            <Question
                questionNum={13}
                question={questions[2]}
                answer={answers[2]}
                setAnswer={handleChangeAnswer3}
            />
        </div>
    );
};

export default Page4;
