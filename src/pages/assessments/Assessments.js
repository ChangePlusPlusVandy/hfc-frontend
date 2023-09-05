import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Assessments.css";

import Page from "./Page";
import PageReview from "./PageReview";
import FormProgressBar from "../../components/FormProgressBar";
import FormNavBar from "../../components/FormNavBar";
import PopupBfc from "./components/PopupBfc";

const Assessments = () => {
    const API_URL = process.env.API_URL;

    const [pageNum, setPageNum] = useState(0);
    const navigate = useNavigate();
    const [popup, setPopup] = useState(true);
    const [beneficiary, setBeneficiary] = useState();
    const [eduVocQs, setEduVocQs] = useState([
        {
            question:
                "Did the student advance a grade in the past year? If not, why not?",
            text: "",
        },
        {
            question: "What is the student’s plan for future education?",
            text: "",
        },
        {
            question: "What are her/his educational/professional goals?",
            text: "",
        },
        {
            question:
                "Are there barriers to the student continuing in her/his education?",
            text: "",
        },
        {
            question:
                "What are the student’s strengths (academic subjects, ability to focus, passion for education etc.)?",
            text: "",
        },
        {
            question: "Academic ability level - rate 1-5",
            answer: null,
            text: "",
        },
        {
            question: "Skill level in computers - rate 1-5",
            answer: null,
            text: "",
        },
        {
            question: "Skill level in Spoken English - rate 1-5",
            answer: null,
            text: "",
        },
    ]);

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
        {
            question: "Do you believe you have useful skills and abilities?",
            answer: null,
            text: "",
        },
    ]);
    const [intakeQs, setIntakeQs] = useState([
        {
            question: "What's you're current income",
            text: "",
        },
        {
            question: 'Do you have a bank account? ("yes" or "no")',
            text: "",
        },
        {
            question: "How much money do you have saved?",
            text: "",
        },
    ]);
    const [outtakeQs, setOuttakeQs] = useState([
        {
            question: "What's you're current income",
            text: "",
        },
        {
            question: 'Do you have a bank account? ("yes" or "no")',
            text: "",
        },
        {
            question: "How much money do you have saved?",
            text: "",
        },
        {
            question: 'Do you have a job? ("yes" or "no")',
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

    const [eduVocScore, setEduVocScore] = useState(0);
    const [mentalHealthScore, setMentalHealthScore] = useState(0);
    const [lifeSkillsScore, setLifeSkillsScore] = useState(0);
    const [socialSkillsScore, setSocialSkillsScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [isIntake, setIsIntake] = useState(false);
    const [isIntakeOuttake, setIsIntakeOuttake] = useState(false);

    let PAGES = [
        {
            title: "Intake/Outtake",
            shortName: "Intake/Outtake",
            component: (
                <Page
                    questions={isIntake ? intakeQs : outtakeQs}
                    setQuestions={isIntake ? setIntakeQs : setOuttakeQs}
                    hasOnlyTextQs={true}
                />
            ),
        },
        {
            title: "Education / Vocation",
            shortName: "Education & Vocation",
            component: (
                <Page
                    questions={eduVocQs}
                    setQuestions={setEduVocQs}
                    hasOnlyTextQs={true}
                />
            ),
        },
        {
            title: "Emotional / Mental",
            shortName: "Emotional & Mental",
            component: (
                <Page
                    questions={mentalHealthQs}
                    setQuestions={setMentalHealthQs}
                />
            ),
        },
        {
            title: "Life skills / Confidence / Self-esteem",
            shortName: "Life Skills & Confidence",
            component: (
                <Page questions={lifeSkillsQs} setQuestions={setLifeSkillsQs} />
            ),
        },
        {
            title: "Social skills / Connectedness",
            shortName: "Social Skills",
            component: (
                <Page
                    questions={socialSkillsQs}
                    setQuestions={setSocialSkillsQs}
                />
            ),
        },
        {
            title: "Review",
            shortName: "Review",
            component: (
                <PageReview
                    eduVocQs={eduVocQs}
                    mentalHealthQs={mentalHealthQs}
                    lifeSkillsQs={lifeSkillsQs}
                    socialSkillsQs={socialSkillsQs}
                    mentalHealthScore={mentalHealthScore}
                    setMentalHealthScore={setMentalHealthScore}
                    lifeSkillsScore={lifeSkillsScore}
                    setLifeSkillsScore={setLifeSkillsScore}
                    socialSkillsScore={socialSkillsScore}
                    setSocialSkillsScore={setSocialSkillsScore}
                    eduVocScore={eduVocScore}
                    setEduVocScore={setEduVocScore}
                    totalScore={totalScore}
                    setTotalScore={setTotalScore}
                />
            ),
        },
    ];

    const handleStepClick = (index) => {
        setPageNum(index);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${API_URL}/assessments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "auth"
                    )}`,
                },
                body: JSON.stringify({
                    mentalHealthQs: mentalHealthQs,
                    lifeSkillsQs: lifeSkillsQs,
                    socialSkillsQs: socialSkillsQs,
                    educationVocationQs: eduVocQs,
                    mentalHealthScore: mentalHealthScore,
                    lifeSkillsScore: lifeSkillsScore,
                    socialSkillsScore: socialSkillsScore,
                    educationVocationScore: eduVocScore,
                    totalScore: totalScore,
                    beneficiary: beneficiary._id,
                }),
            });

            const thisAssessment = await response.json();
            const updatedAssessments = [
                ...beneficiary.assessments,
                thisAssessment._id,
            ];

            // add this assessment to current beneficiary's assessments
            if (isIntakeOuttake) {
                if (isIntake) {
                    try {
                        const bfcResponse = await fetch(
                            `${API_URL}/beneficiaries/${beneficiary._id}`,
                            {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${window.localStorage.getItem(
                                        "auth"
                                    )}`,
                                },
                                body: JSON.stringify({
                                    assessments: updatedAssessments,
                                    hasBankAccountIntake:
                                        intakeQs[1].text.toLowerCase() ===
                                        "yes",
                                    englishLvlIntake: eduVocQs[7].answer,
                                    computerSkillsIntake: eduVocQs[6].answer,
                                    emotionalWellnessIntake: mentalHealthScore,
                                    savingsIntake: parseInt(
                                        intakeQs[2].text.replace(/,/g, "")
                                    ),
                                    incomeIntake: parseInt(
                                        intakeQs[0].text.replace(/,/g, "")
                                    ),
                                }),
                            }
                        );
                        navigate(-1); // to the overview page
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    try {
                        const bfcResponse = await fetch(
                            `${API_URL}/beneficiaries/${beneficiary._id}`,
                            {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${window.localStorage.getItem(
                                        "auth"
                                    )}`,
                                },
                                body: JSON.stringify({
                                    assessments: updatedAssessments,
                                    hasBankAccountCompletion:
                                        outtakeQs[1].text.toLowerCase() ===
                                        "yes",
                                    englishLvlCompletion: eduVocQs[7].answer,
                                    computerSkillsCompletion:
                                        eduVocQs[6].answer,
                                    emotionalWellnessCompletion:
                                        mentalHealthScore,
                                    incomeCompletion: parseInt(
                                        outtakeQs[0].text.replace(/,/g, "")
                                    ),
                                    savingsCompletion: parseInt(
                                        outtakeQs[2].text.replace(/,/g, "")
                                    ),
                                    hasFoundWorkCompletion:
                                        outtakeQs[3].text.toLowerCase() ===
                                        "yes",
                                }),
                            }
                        );
                        navigate(-1); // to the overview page
                    } catch (err) {
                        console.log(err);
                    }
                }
            } else {
                try {
                    const bfcResponse = await fetch(
                        `${API_URL}/beneficiaries/${beneficiary._id}/assessment`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${window.localStorage.getItem(
                                    "auth"
                                )}`,
                            },
                            body: JSON.stringify({
                                assessments: updatedAssessments,
                            }),
                        }
                    );
                    navigate(-1); // to the overview page
                } catch (err) {
                    console.log(err);
                }
            }
        } catch (err) {
            console.error(err?.message ? err.message : err);
        }
    };
    useEffect(() => {
        console.log(isIntakeOuttake);
        if (!isIntakeOuttake && PAGES[0].title == "Intake/Outtake") {
            // PAGES.pop(0);
        } else if (isIntakeOuttake && PAGES[0].title != "Intake/Outtake") {
        }
    }, [isIntakeOuttake]);

    useEffect(() => {
        console.log(intakeQs[1].text.toLowerCase() === "yes");
    }, [intakeQs]);

    return (
        <div className="assessments-container">
            <div className="view-popup">
                {popup && (
                    <PopupBfc
                        setPopup={setPopup}
                        setBeneficiary={setBeneficiary}
                        setIntakeOuttake={setIsIntakeOuttake}
                        setIntake={setIsIntake}
                        navigate={navigate}
                    />
                )}
            </div>
            <div className="assessment-page-container">
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
