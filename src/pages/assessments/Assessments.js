import React, { useState, useEffect } from "react";

import "./Assessments.css";

import Page0 from "./Page0";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import MultiStepProgressBar from "./MultiStepProgressBar";

const NUM_PAGES = 5;

const Assessments = () => {
    const [pageNum, setpageNum] = useState(0);

    // Mental Health Page 0
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");

    // Life Skills Page 1
    const [answer5, setAnswer5] = useState("");
    const [answer6, setAnswer6] = useState("");
    const [answer7, setAnswer7] = useState("");

    // Social Skills Page 2
    const [answer8, setAnswer8] = useState("");
    const [answer9, setAnswer9] = useState("");

    // Education Page 3
    const [answer10, setAnswer10] = useState("");
    const [answer11, setAnswer11] = useState("");
    const [answer12, setAnswer12] = useState("");
    const [answer13, setAnswer13] = useState("");
    const [answer14, setAnswer14] = useState("");

    // Vocation Page 4
    const [answer15, setAnswer15] = useState("");
    const [answer16, setAnswer16] = useState("");

    const PAGES = [
        <Page0
            answer1={answer1}
            setAnswer1={setAnswer1}
            answer2={answer2}
            setAnswer2={setAnswer2}
            answer3={answer3}
            setAnswer3={setAnswer3}
            answer4={answer4}
            setAnswer4={setAnswer4}
        />,
        <Page1
            answer5={answer5}
            setAnswer5={setAnswer5}
            answer6={answer6}
            setAnswer6={setAnswer6}
            answer7={answer7}
            setAnswer7={setAnswer7}
        />,
        <Page2
            answer8={answer8}
            setAnswer8={setAnswer8}
            answer9={answer9}
            setAnswer1={setAnswer9}
        />,
        <Page3
            answer10={answer10}
            setAnswer10={setAnswer10}
            answer11={answer11}
            setAnswer11={setAnswer11}
            answer12={answer12}
            setAnswer12={setAnswer12}
            answer13={answer13}
            setAnswer13={setAnswer13}
            answer14={answer14}
            setAnswer14={setAnswer14}
        />,
        <Page4
            answer15={answer15}
            setAnswer15={setAnswer15}
            answer16={answer16}
            setAnswer16={setAnswer16}
        />,
    ];

    const handlePageDecrement = () => {
        setpageNum((prev) => prev - 1);
    };

    const handlePageIncrement = () => {
        setpageNum((prev) => prev + 1);
    };

    const handleSubmit = async () => {
        const response = await fetch("http://localhost:3000/assessments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                answer1: answer1,
                answer2: answer2,
                answer3: answer3,
                answer4: answer4,
                answer5: answer5,
                answer6: answer6,
                answer7: answer7,
                answer8: answer8,
                answer9: answer9,
                answer10: answer10,
                answer11: answer11,
                answer12: answer12,
                answer13: answer13,
                answer14: answer14,
                answer15: answer15,
                answer16: answer16,
            }),
        });

        console.log(response.json());
    };

    return (
        <div className="assessments-page-container">
            <div>
                <MultiStepProgressBar // FIXME: can't show
                    // stepPercentage={(pageNum / (NUM_PAGES - 1)) * 100}
                    page={pageNum}
                />
            </div>
            <h4>Page Number: {pageNum}</h4>
            <div className="page-content">{PAGES[pageNum]}</div>
            <div className="button-container">
                {pageNum > 0 && (
                    <button onClick={handlePageDecrement}>Previous</button>
                )}
                {pageNum < NUM_PAGES - 1 && (
                    <button onClick={handlePageIncrement}>Next</button>
                )}
            </div>
            <div className="submit-button">
                {pageNum === 4 && (
                    <button onClick={handleSubmit}>Sumbit</button>
                )}
            </div>
        </div>
    );
};

export default Assessments;
