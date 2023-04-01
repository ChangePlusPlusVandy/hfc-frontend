import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "./Table";
import "./SingleAssessment.css";

const SingleAssessment = () => {
    const { assessmentId } = useParams();
    const navigate = useNavigate();

    const [assessment, setAssessment] = useState();
    const [beneficiary, setBeneficiary] = useState();

    const getAssessmentById = async (mongoId) => {
        try {
            let data = await fetch(
                `http://localhost:3000/assessments/?id=${mongoId}`
            );
            data = await data.json();
            setAssessment(data);
            // console.log("assessment: ", data);
        } catch (error) {
            console.error(error);
        }
    };

    const getBeneficiaryByID = async (mongoId) => {
        try {
            let data = await fetch(
                `http://localhost:3000/beneficiaries/?id=${mongoId}`
            );
            data = await data.json();
            setBeneficiary(data);
            //console.log("bfc: ", data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAssessmentById(assessmentId);
    }, []);

    useEffect(() => {
        if (assessment) {
            getBeneficiaryByID(assessment.beneficiary);
        }
    }, [assessment]);

    return (
        beneficiary && (
            <div className="assessment-info">
                <h2>{`${beneficiary.firstName} ${beneficiary.lastName}`}</h2>
                <h3>{`Date Taken: ${assessment.dateTaken}`}</h3>
                <Table
                    dataName="Education / Vocation"
                    dataArr={assessment.educationVocationQs}
                    dataScore={assessment.educationVocationScore}
                    hasOnlyTextQs={true}
                />
                <Table
                    dataName="Emotional / Mental Health"
                    dataArr={assessment.mentalHealthQs}
                    dataScore={assessment.mentalHealthScore}
                />
                <Table
                    dataName="Life Skills / Confidence / Self-esteem"
                    dataArr={assessment.lifeSkillsQs}
                    dataScore={assessment.lifeSkillsScore}
                />
                <Table
                    dataName="Social Skills / Connectedness"
                    dataArr={assessment.socialSkillsQs}
                    dataScore={assessment.socialSkillsScore}
                />
                <h3> Total Score: {assessment.totalScore}%</h3>

                <button onClick={() => navigate("/dashboard/assessments")}>
                    go back
                </button>
            </div>
        )
    );
};
export default SingleAssessment;
