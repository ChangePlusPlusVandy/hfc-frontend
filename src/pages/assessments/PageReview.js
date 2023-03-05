import React from "react";
import Table from "./components/Table";

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
            if (qArr[i].answer != null) {
                sum += i == reverseIndex ? 6 - qArr[i].answer : qArr[i].answer;
            }
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
            <Table
                dataName="Mental Health"
                dataArr={mentalHealthQs}
                dataScore={mentalHealthScore}
            />
            <Table
                dataName="Life Skills"
                dataArr={lifeSkillsQs}
                dataScore={lifeSkillsScore}
            />
            <Table
                dataName="Social Skills"
                dataArr={socialSkillsQs}
                dataScore={socialSkillsScore}
            />
            <Table
                dataName="Education"
                dataArr={educationQs}
                dataScore={educationScore}
            />
            <Table
                dataName="Vocation"
                dataArr={vocationQs}
                dataScore={vocationScore}
            />
            <h4> Total Score: {totalScore}% </h4>
        </div>
    );
};

export default PageReview;
