import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Assessments.css";

import Page0 from "./Page0";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import FormProgressBar from "../../components/FormProgressBar";
import FormNavBar from "../../components/FormNavBar";
import PageReview from "./PageReview";

const Assessments = () => {
    const [pageNum, setPageNum] = useState(0);

    const navigate = useNavigate();

    // Mental Health Page 0
    const [mentalHealthAnswers, setMentalHealthAnswers] = useState([]);

    // Life Skills Page 1
    const [lifeSkillsAnswers, setLifeSkillsAnswers] = useState([]);

    // Social Skills Page 2
    const [socialSkillsAnswers, setSocialSkillsAnswers] = useState([]);

    // Education Page 3
    const [educationAnswers, setEducationAnswers] = useState([]);

    // Vocation Page 4
    const [vocationAnswers, setVocationAnswers] = useState([]);

    const PAGES = [
        {
            title: "Mental Health Questionnaire",
            shortName: "Mental Health",
            component: (
                <Page0
                    questions={meantalHealthQs}
                    answers={mentalHealthAnswers}
                    setAnswers={setMentalHealthAnswers}
                />
            ),
        },
        {
            title: "Life Skills Questionnaire",
            shortName: "Life Skills",
            component: (
                <Page1
                    questions={lifeSkillsQs}
                    answers={lifeSkillsAnswers}
                    setAnswers={setLifeSkillsAnswers}
                />
            ),
        },
        {
            title: "Social Skills Questionnaire",
            shortName: "Social Skills",
            component: (
                <Page2
                    questions={socialSkillsQs}
                    answers={socialSkillsAnswers}
                    setAnswers={setSocialSkillsAnswers}
                />
            ),
        },
        {
            title: "Education Questionnaire",
            shortName: "Education",
            component: (
                <Page3
                    questions={educationQs}
                    answers={educationAnswers}
                    setAnswers={setEducationAnswers}
                />
            ),
        },
        {
            title: "Vocation Questionnaire",
            shortName: "Vocation",
            component: (
                <Page4
                    questions={vocationQs}
                    answers={vocationAnswers}
                    setAnswers={setVocationAnswers}
                />
            ),
        },
        {
            title: "Review",
            shortName: "review",
            component: (
                <PageReview
                    mentalHealthQs={meantalHealthQs}
                    mentalHealthAnswers={mentalHealthAnswers}
                    lifeSkillsQs={lifeSkillsQs}
                    lifeSkillsAnswers={lifeSkillsAnswers}
                    socialSkillsQs={socialSkillsQs}
                    socialSillsAnswers={socialSkillsAnswers}
                    educationQs={educationQs}
                    educationAnswers={educationAnswers}
                    vocationQs={vocationQs}
                    vocationAnswers={vocationAnswers}
                />
            ),
        },
    ];

    const handleStepClick = (index) => {
        setPageNum(index);
    };

    const handleSubmit = async () => {
        const response = await fetch("http://localhost:3000/assessments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mentalHealthAnswers: mentalHealthAnswers,
                lifeSkillsAnswers: lifeSkillsAnswers,
                socialSkillsAnswers: socialSkillsAnswers,
                educationAnswers: educationAnswers,
                vocationAnswers: vocationAnswers,
            }),
        });
        console.log("Successful.");
        console.log(response.json());
        navigate(-1); // to the overview page
    };

    return (
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
    );
};

const meantalHealthQs = [
    "How hopeful and positive do you feel about your future?",
    "How much do you experience happy, positive feelings in your daily life?",
    "How often do you feel depressed?",
    "How much are you able to relax and enjoy yourself?",
];

const lifeSkillsQs = [
    "How much do you value yourself?",
    "How well do you manage your stress and anxiety?",
    "How strong are you in solving problems and making decisions for yourself?",
];

const socialSkillsQs = [
    "How much do you feel that loneliness is a problem for you?",
    "Are you able to get the kind of support from others that you need?",
];

const educationQs = ["How satisfied are you with your skills and abilities?"];

const vocationQs = [
    "How confident you feel about your skills, and ability to find work or earning money using your vocational skills?",
    "How often/much do you worry about your or your family's financial difficulties?",
];
export default Assessments;
