import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Assessments.css";

import Page from "./Page";
import PageReview from "./PageReview";
import FormProgressBar from "../../components/FormProgressBar";
import FormNavBar from "../../components/FormNavBar";
import PopupBfc from "./components/PopupBfc";

const Assessments = () => {
    const [pageNum, setPageNum] = useState(0);

    const navigate = useNavigate();

    const [popup, setPopup] = useState(true);
    const [idError, setIdError] = useState(false);
    // const [beneficiaries, setBeneficiaries] = useState([]);
    const [showErrorText, setShowErrorText] = useState(false);
    const [allBfcIds, setAllBfcIds] = useState([]);

    const [beneficiaryId, setBeneficiaryId] = useState("");
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

    const PAGES = [
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

    const handleChangeId = (e) => {
        // if we had an error but now the entered id is correct
        if (idError) {
            console.log("error occured.");
            if (allBfcIds.length > 0)
                console.log("allbfc after error occured", allBfcIds);
            else console.log("allBfc empty after error occured");
            if (allBfcIds.length > 0 && allBfcIds.includes(e.target.value)) {
                console.log("now correct");
                setIdError(false);
                setShowErrorText(false);
            }
        }
        setBeneficiaryId(e.target.value);
    };

    const handleBlur = (e) => {
        // if we haven't typed anything before and input is invalid
        // if (allBfcIds.length > 0) console.log("allbfc", allBfcIds);
        // else console.log("allBfc empty");
        if (!idError) {
            if (
                e.target.validity.patternMismatch ||
                // input is none of the benefciary ids we fetched
                (allBfcIds.length > 0 && !allBfcIds.includes(e.target.value))
            ) {
                console.log("includes ? ", allBfcIds.includes(e.target.value));
                console.log("now all bfc ids: ", allBfcIds);

                setIdError(true);
                setShowErrorText(true);
            }
        }
        // Turn off error message when the user blurs for the 2nd time
        if (idError) {
            setShowErrorText(false);
        }
    };

    const style = () => {
        if (idError) {
            return { backgroundColor: "rgba(255, 0, 0, 0.2)" };
        }
    };

    const getBeneficiary = async () => {
        try {
            let data = await fetch(
                `http://localhost:3000/beneficiaries/?idNum=${beneficiaryId}`
            );
            //console.log("bfc ID: ", beneficiaryId);
            data = await data.json();
            setBeneficiary(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getAllBeneficiaries = async () => {
        try {
            let data = await fetch(`http://localhost:3000/beneficiaries`);
            data = await data.json();
            // setBeneficiaries(data);
            setAllBfcIds(data.map((d) => d.id));
        } catch (error) {
            console.error(error);
        }
    };

    // console.log(
    //     [
    //         123456789, 123456788, 123436783, 123136783, 3, 314, 2222345, 328776,
    //         315, 31415, 123456790, 123456791, 123456792, 123456793, 123456794,
    //     ].indexOf(3)
    // );

    useEffect(() => {
        getAllBeneficiaries();
    }, []);

    // TODO: add error handling for both responses (create assessment & update bfc)
    const handleSubmit = async () => {
        const response = await fetch("http://localhost:3000/assessments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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

        // add this assessment to current beneficiary's assessments
        const updatedAssessments = [
            ...beneficiary.assessments,
            thisAssessment._id,
        ];

        const bfcResponse = await fetch(
            `http://localhost:3000/beneficiaries/${beneficiary._id}/assessment`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    assessments: updatedAssessments,
                }),
            }
        );

        navigate(-1); // to the overview page
    };

    return (
        <div className="assessments-container">
            <div className="view-popup">
                <PopupBfc
                    trigger={popup}
                    setTrigger={setPopup}
                    getBeneficiary={getBeneficiary}
                    navigate={navigate}
                    content={
                        <div className="popup-content">
                            <h1>Assessment Requirement</h1>
                            <h4>Enter beneficiary ID number to enroll:</h4>
                            <div className="id-input">
                                <input
                                    type="text"
                                    onChange={handleChangeId}
                                    value={beneficiaryId}
                                    placeholder="enter readable ID"
                                    pattern="[0-9]*" // only allow digits
                                    onBlur={handleBlur}
                                    style={style()}
                                />
                                {showErrorText && (
                                    <p
                                        role="alert"
                                        style={{ color: "rgb(255, 0, 0)" }}
                                    >
                                        Beneficiary ID not found.
                                    </p>
                                )}
                            </div>
                        </div>
                    }
                ></PopupBfc>
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
