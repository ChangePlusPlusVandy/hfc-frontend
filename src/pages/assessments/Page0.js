import React from "react";
import RateButtons from "./components/RateButtons";

const Page0 = ({ questions, answers, setAnswers }) => {
    const handleChangeAnswers = (index) => {
        setAnswers([...answers, index + 1]);
    };
    // const [ans1, ans2, ans3, ans4] = answers;

    // const handleChangeAnswer1 = (index) => {
    //     answers[0] = index + 1;
    //     setAnswers(answers);
    //     console.log(answers);
    // };
    // const handleChangeAnswer2 = (index) => {
    //     answers[1] = index + 1;
    //     setAnswers(answers);
    //     console.log(answers);
    // };
    // const handleChangeAnswer3 = (index) => {
    //     answers[2] = index + 1;
    //     setAnswers(answers);
    //     console.log(answers);
    // };
    // const handleChangeAnswer4 = (index) => {
    //     answers[3] = index + 1;
    //     setAnswers(answers);
    //     console.log(answers);
    // };

    return (
        <div className="form-container">
            <p>
                Enter numeric value of response with the corresponding question.
            </p>

            <div>
                <h4>Question 1</h4>
                <p>{questions[0]}</p>
                <RateButtons
                    activeRatingIndex={answers[0] - 1}
                    onBtnClick={handleChangeAnswers}
                />
            </div>
            <br></br>

            <div>
                <h4>Question 2</h4>
                <p>{questions[1]}</p>
                <RateButtons
                    activeRatingIndex={answers[1] - 1}
                    onBtnClick={handleChangeAnswers}
                />
            </div>
            <br></br>

            <div>
                <h4>Question 3</h4>
                <p>{questions[2]}</p>
                <RateButtons
                    activeRatingIndex={answers[2] - 1}
                    onBtnClick={handleChangeAnswers}
                />
            </div>
            <br></br>

            <div>
                <h4>Question 4</h4>
                <p>{questions[3]}</p>
                <RateButtons
                    activeRatingIndex={answers[3] - 1}
                    onBtnClick={handleChangeAnswers}
                />
            </div>
            <br></br>
        </div>
    );
};

export default Page0;
