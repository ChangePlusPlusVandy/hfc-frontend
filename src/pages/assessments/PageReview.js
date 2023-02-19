import React from "react";

const PageReview = ({
    mentalHealthQs,
    mentalHealthAnswers,
    lifeSkillsQs,
    lifeSkillsAnswers,
    socialSkillsQs,
    socialSillsAnswers,
    educationQs,
    educationAnswers,
    vocationQs,
    vocationAnswers,
}) => {
    return (
        <div className="review-form-container">
            <h1>Review</h1>
            <h4>Mental Health Questionnaire</h4>
            <ul role="list" className="assessment-list-stack">
                {mentalHealthQs.map((q, i) => (
                    <li>{`${q} ${mentalHealthAnswers[i]}`}</li>
                    // TODO: may need to format this better
                ))}
            </ul>

            <h4>Life Skills Questionnaire</h4>
            <ul role="list" className="assessment-list-stack">
                {lifeSkillsQs.map((q, i) => (
                    <li>{`${q} ${lifeSkillsAnswers[i]}`}</li>
                ))}
            </ul>
            <h4>Social Skills Questionnaire</h4>
            <ul role="list" className="assessment-list-stack">
                {socialSkillsQs.map((q, i) => (
                    <li>{`${q} ${socialSillsAnswers[i]}`}</li>
                ))}
            </ul>

            <h4>Education Questionnaire</h4>
            <ul role="list" className="assessment-list-stack">
                {educationQs.map((q, i) => (
                    <li>{`${q} ${educationAnswers[i]}`}</li>
                ))}
            </ul>

            <h4>Vocation Questionnaire</h4>
            <ul role="list" className="assessment-list-stack">
                {vocationQs.map((q, i) => (
                    <li>{`${q} ${vocationAnswers[i]}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default PageReview;
