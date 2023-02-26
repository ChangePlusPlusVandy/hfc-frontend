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
    mentalHealthScore,
    setMentalHealthScore,
    lifeSkillsScore,
    setLifeSkillsScore,
    socialSkillsScore,
    setSocialSkillsScore,
    educationScore,
    setEducationScore,
    vocationScore,
    setVocationScore,
    totalScore,
    setTotalScore,
}) => {
    const getAvgScore = (arr, reverseIndex) => {
        let sum = 0;
        for (let i = 0; i < arr.length; ++i) {
            sum += i == reverseIndex ? 6 - arr[i] : arr[i];
        }
        return sum / arr.length;
    };

    setMentalHealthScore(getAvgScore(mentalHealthAnswers, 2));
    setLifeSkillsScore(getAvgScore(lifeSkillsAnswers, -1));
    setSocialSkillsScore(getAvgScore(socialSillsAnswers, 0));
    setEducationScore(getAvgScore(educationAnswers, -1));
    setVocationScore(getAvgScore(vocationAnswers, 1));

    setTotalScore(
        (mentalHealthScore +
            lifeSkillsScore +
            socialSkillsScore +
            educationScore +
            vocationScore) *
            4
    ); // percentage (since /25*100 = *4)

    return (
        <div className="review-form-container">
            <h4>Mental Health Questionnaire</h4>
            <ul role="list" className="assessment-list-stack">
                {mentalHealthQs.map((q, i) => (
                    <li>{`${q} ${mentalHealthAnswers[i]}`}</li>
                    // TODO: may need to format this better
                ))}
                <br></br>
                Mental Health Score: {mentalHealthScore}
            </ul>

            <h4>Life Skills Questionnaire</h4>
            <ul role="list" className="assessment-list-stack">
                {lifeSkillsQs.map((q, i) => (
                    <li>{`${q} ${lifeSkillsAnswers[i]}`}</li>
                ))}
                <br></br>
                Life Skills Score: {lifeSkillsScore}
            </ul>
            <h4>Social Skills Questionnaire</h4>
            <ul role="list" className="assessment-list-stack">
                {socialSkillsQs.map((q, i) => (
                    <li>{`${q} ${socialSillsAnswers[i]}`}</li>
                ))}
                <br></br>
                Social Skills Score: {socialSkillsScore}
            </ul>

            <h4>Education Questionnaire</h4>
            <ul role="list" className="assessment-list-stack">
                {educationQs.map((q, i) => (
                    <li>{`${q} ${educationAnswers[i]}`}</li>
                ))}
                <br></br>
                Education Score: {educationScore}
            </ul>

            <h4>Vocation Questionnaire</h4>
            <ul role="list" className="assessment-list-stack">
                {vocationQs.map((q, i) => (
                    <li>{`${q} ${vocationAnswers[i]}`}</li>
                ))}
                <br></br>
                Vocation Score: {vocationScore}
            </ul>

            <h4> Total Score: {totalScore}% </h4>
        </div>
    );
};

export default PageReview;
