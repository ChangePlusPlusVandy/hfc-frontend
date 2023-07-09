import React, { useEffect } from "react";
import Table from "./components/Table";

const PageReview = ({
    eduVocQs,
    mentalHealthQs,
    lifeSkillsQs,
    socialSkillsQs,
    mentalHealthScore,
    setMentalHealthScore,
    lifeSkillsScore,
    setLifeSkillsScore,
    socialSkillsScore,
    setSocialSkillsScore,
    eduVocScore,
    setEduVocScore,
    totalScore,
    setTotalScore,
}) => {
    // qArr: array of question objs
    // reverseIndex: question index whose score should be reversed
    // TODO: rethink how to not hard code this
    const getAvgScore = (qArr, reverseIndex) => {
        let sum = 0;
        for (let i = 0; i < qArr.length; ++i) {
            if (qArr[i].answer != null) {
                sum += i == reverseIndex ? 6 - qArr[i].answer : qArr[i].answer;
            }
        }
        return sum / qArr.length;
    };

    // TODO: maybe use states to make this more readable
    useEffect(() => {
        setEduVocScore(getAvgScore(eduVocQs.slice(5), -1));
        setMentalHealthScore(getAvgScore(mentalHealthQs, 2));
        setLifeSkillsScore(getAvgScore(lifeSkillsQs, -1));
        setSocialSkillsScore(getAvgScore(socialSkillsQs, 0));
    }, []);

    useEffect(() => {
        setTotalScore(
            (eduVocScore +
                mentalHealthScore +
                lifeSkillsScore +
                socialSkillsScore) *
            5 // percentage (since /20*100 = *5)
        );
    }, [eduVocScore, mentalHealthScore, lifeSkillsScore, socialSkillsScore]);

    return (
        <div className="review-form-container">
            <Table
                dataName="Education / Vocation"
                dataArr={eduVocQs}
                dataScore={eduVocScore}
                hasOnlyTextQs={true}
            />
            <Table
                dataName="Emotional / Mental Health"
                dataArr={mentalHealthQs}
                dataScore={mentalHealthScore}
            />
            <Table
                dataName="Life Skills / Confidence / Self-esteem"
                dataArr={lifeSkillsQs}
                dataScore={lifeSkillsScore}
            />
            <Table
                dataName="Social Skills / Connectedness"
                dataArr={socialSkillsQs}
                dataScore={socialSkillsScore}
            />

            <h4> Total Score: {totalScore}% </h4>
        </div>
    );
};

export default PageReview;
