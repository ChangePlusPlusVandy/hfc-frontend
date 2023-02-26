import React from "react";
import Question from "./components/question";

const Page2 = ({ questions, answers, setAnswers }) => {
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

    return (
        <div className="form-container">
            <p>
                Enter numeric value of response with the corresponding question.
            </p>

            <Question
                questionNum={8}
                question={questions[0]}
                answer={answers[0]}
                setAnswer={handleChangeAnswer1}
            />
            <br></br>

            <Question
                questionNum={9}
                question={questions[1]}
                answer={answers[1]}
                setAnswer={handleChangeAnswer2}
            />
        </div>
    );
};

export default Page2;
