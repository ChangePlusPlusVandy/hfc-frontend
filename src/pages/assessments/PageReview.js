import React from "react";

const PageReview = ({
    mentalHealthQs,
    lifeSkillsQs,
    socialSkillsQs,
    educationQs,
    vocationQs,
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
    // qArr: array of question objs
    // reverseIndex: question index whose score should be reversed
    const getAvgScore = (qArr, reverseIndex) => {
        let sum = 0;
        for (let i = 0; i < qArr.length; ++i) {
            sum += i == reverseIndex ? 6 - qArr[i].answer : qArr[i].answer;
        }
        return sum / qArr.length;
    };

    setMentalHealthScore(getAvgScore(mentalHealthQs, 2));
    setLifeSkillsScore(getAvgScore(lifeSkillsQs, -1));
    setSocialSkillsScore(getAvgScore(socialSkillsQs, 0));
    setEducationScore(getAvgScore(educationQs, -1));
    setVocationScore(getAvgScore(vocationQs, 1));

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
                {mentalHealthQs.map((obj, i) => (
                    <li>{`Q${i + 1}. ${obj.question} ${obj.answer}`}</li>
                    // TODO: may need to format this better
                ))}
                <br></br>
                Mental Health Score: {mentalHealthScore}
            </ul>

            <h4>Life Skills Questionnaire</h4>
            <ul role="list" className="assessment-list-stack">
                {lifeSkillsQs.map((obj, i) => (
                    <li>{`Q${i + 1}. ${obj.question} ${obj.answer}`}</li>
                ))}
                <br></br>
                Life Skills Score: {lifeSkillsScore}
            </ul>
            <h4>Social Skills Questionnaire</h4>
            <ul role="list" className="assessment-list-stack">
                {socialSkillsQs.map((obj, i) => (
                    <li>{`Q${i + 1}. ${obj.question} ${obj.answer}`}</li>
                ))}
                <br></br>
                Social Skills Score: {socialSkillsScore}
            </ul>

            <h4>Education Questionnaire</h4>
            <ul role="list" className="assessment-list-stack">
                {educationQs.map((obj, i) => (
                    <li>{`Q${i + 1}. ${obj.question} ${obj.answer}`}</li>
                ))}
                <br></br>
                Education Score: {educationScore}
            </ul>

            <h4>Vocation Questionnaire</h4>
            <ul role="list" className="assessment-list-stack">
                {vocationQs.map((obj, i) => (
                    <li>{`Q${i + 1}. ${obj.question} ${obj.answer}`}</li>
                ))}
                <br></br>
                Vocation Score: {vocationScore}
            </ul>

            <h4> Total Score: {totalScore}% </h4>
        </div>
    );
};

export default PageReview;
