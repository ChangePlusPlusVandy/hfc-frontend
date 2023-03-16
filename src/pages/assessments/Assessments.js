import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Assessments.css";

import Page0 from "./Page0";
import PageReview from "./PageReview";
import FormProgressBar from "../../components/FormProgressBar";
import FormNavBar from "../../components/FormNavBar";
import Popup from "./components/Popup";

const Assessments = () => {
    const [pageNum, setPageNum] = useState(0);

    const navigate = useNavigate();

    const [popup, setPopup] = useState(true);

    const [id, setID] = useState(""); // This is mongo id

    const [mentalHealthQs, setMentalHealthQs] = useState([
        {
            question: "How hopeful and positive do you feel about your future?",
            answer: null,
            text: "",
        },
        {
            question:
                "How much do you experience happy, positive feelings in your daily life?",
            answer: null,
            text: "",
        },
        {
            question: "How often do you feel depressed?",
            answer: null,
            text: "",
        },
        {
            question: "How much are you able to relax and enjoy yourself?",
            answer: null,
            text: "",
        },
    ]);

    const [lifeSkillsQs, setLifeSkillsQs] = useState([
        {
            question: "How much do you value yourself?",
            answer: null,
            text: "",
        },
        {
            question: "How well do you manage your stress and anxiety?",
            answer: null,
            text: "",
        },
        {
            question:
                "How strong are you in solving problems and making decisions for yourself?",
            answer: null,
            text: "",
        },
    ]);

    const [socialSkillsQs, setSocialSkillsQs] = useState([
        {
            question:
                "How much do you feel that loneliness is a problem for you?",
            answer: null,
            text: "",
        },
        {
            question:
                "Are you able to get the kind of support from others that you need?",
            answer: null,
            text: "",
        },
    ]);

    const [educationQs, setEducationQs] = useState([
        {
            question: "How satisfied are you with your skills and abilities?",
            answer: null,
            text: "",
        },
        {
            question:
                "How good will you rate your academic performance/success at school 1-5?", // TODO: need to change the wording?
            answer: null,
            text: "",
        },
    ]);

    const [vocationQs, setVocationQs] = useState([
        {
            question:
                "How confident you feel about your skills, and ability to find work or earning money using your vocational skills?",
            answer: null,
            text: "",
        },
        {
            question:
                "How often/much do you worry about your or your family's financial difficulties?",
            answer: null,
            text: "",
        },
        {
            question: "How satisfied are you with your skills and abilities?",
            answer: null,
            text: "",
        },
    ]);

    // For Review Page
    const [mentalHealthScore, setMentalHealthScore] = useState(0);
    const [lifeSkillsScore, setLifeSkillsScore] = useState(0);
    const [socialSkillsScore, setSocialSkillsScore] = useState(0);
    const [educationScore, setEductionScore] = useState(0);
    const [vocationScore, setVocationScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);

    const PAGES = [
        {
            title: "Mental Health Questionnaire",
            shortName: "Mental Health",
            component: (
                <Page0
                    questions={mentalHealthQs}
                    setQuestions={setMentalHealthQs}
                />
            ),
        },
        {
            title: "Life Skills Questionnaire",
            shortName: "Life Skills",
            component: (
                <Page0
                    questions={lifeSkillsQs}
                    setQuestions={setLifeSkillsQs}
                />
            ),
        },
        {
            title: "Social Skills Questionnaire",
            shortName: "Social Skills",
            component: (
                <Page0
                    questions={socialSkillsQs}
                    setQuestions={setSocialSkillsQs}
                />
            ),
        },
        {
            title: "Education Questionnaire",
            shortName: "Education",
            component: (
                <Page0 questions={educationQs} setQuestions={setEducationQs} />
            ),
        },
        {
            title: "Vocation Questionnaire",
            shortName: "Vocation",
            component: (
                <Page0 questions={vocationQs} setQuestions={setVocationQs} />
            ),
        },
        {
            title: "Review",
            shortName: "Review",
            component: (
                <PageReview
                    mentalHealthQs={mentalHealthQs}
                    lifeSkillsQs={lifeSkillsQs}
                    socialSkillsQs={socialSkillsQs}
                    educationQs={educationQs}
                    vocationQs={vocationQs}
                    mentalHealthScore={mentalHealthScore}
                    setMentalHealthScore={setMentalHealthScore}
                    lifeSkillsScore={lifeSkillsScore}
                    setLifeSkillsScore={setLifeSkillsScore}
                    socialSkillsScore={socialSkillsScore}
                    setSocialSkillsScore={setSocialSkillsScore}
                    educationScore={educationScore}
                    setEducationScore={setEductionScore}
                    vocationScore={vocationScore}
                    setVocationScore={setVocationScore}
                    totalScore={totalScore}
                    setTotalScore={setTotalScore}
                />
            ),
        },
    ];

    const handleStepClick = (index) => {
        setPageNum(index);
    };

    /* TODO: probably need to change bfc backend to add a GET method to get a beneficiary by id (ours) method for convenience
    Then I could use useEffect to set id to the _id of that beneficary got
    */
    const handleChangeID = (e) => {
        // useEffect()
        setID(e.target.value);
    };

    const handleSubmit = async () => {
        const response = await fetch("http://localhost:3000/assessments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mentalHealthQs: mentalHealthQs,
                lifeSkillsQs: lifeSkillsQs,
                socialSkillsQs: socialSkillsQs,
                educationQs: educationQs,
                vocationQs: vocationQs,
                mentalHealthScore: mentalHealthScore,
                lifeSkillsScore: lifeSkillsScore,
                socialSkillsScore: socialSkillsScore,
                educationScore: educationScore,
                vocationScore: vocationScore,
                totalScore: totalScore,
                beneficiary: id,
            }),
        });
        const thisAssessment = await response.json();
        console.log("this assessment's id: ", thisAssessment._id);

        // FIXME: This keeps returning message: "Request Requires Assessment Field"
        const bfcResponse = await fetch(
            `http://localhost:3000/beneficiaries/${id}/assessment`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    $push: { assessments: thisAssessment._id },
                }),
            }
        );
        console.log("bfc doc: ", bfcResponse.json());

        navigate(-1); // to the overview page
    };

    return (
        <div className="assessments-container">
            <div className="view-popup">
                <Popup
                    trigger={popup}
                    setTrigger={setPopup}
                    closeBtnName="Begin"
                >
                    <h1>Assessment Requirement</h1>
                    <h4>Enter beneficiary ID number to enroll:</h4>
                    <div className="id-input">
                        <input
                            type="text"
                            onChange={handleChangeID}
                            value={id}
                            placeholder="input mongo ID for now"
                        />
                    </div>
                </Popup>
            </div>
            <div className="assessments-page-container">
                <FormProgressBar
                    stepNames={PAGES.map((page) => page.shortName)}
                    activeStepIndex={pageNum}
                    onStepClick={handleStepClick}
                />
                <h2 className="page-title">{PAGES[pageNum].title}</h2>
                <div className="page-container">{PAGES[pageNum].component}</div>
                <FormNavBar
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    numPages={PAGES.length}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default Assessments;
