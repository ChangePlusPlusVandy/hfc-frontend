import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formattedDateOptions } from "../../../utils/constants";
import Table from "./Table";
import "./SingleAssessment.css";

const SingleAssessment = () => {
    const { assessmentId } = useParams();
    const navigate = useNavigate();

    const [assessment, setAssessment] = useState();

    const getAssessmentById = async (mongoId) => {
        try {
            let data = await fetch(
                `http://localhost:3000/assessments/?id=${mongoId}`
            );
            data = await data.json();
            setAssessment(data);
            console.log("assessment get: ", data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAssessmentById(assessmentId);
    }, []);

    const dateTaken = assessment && new Date(assessment.dateTaken);

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/assessments/?id=${id}`, {
            method: "DELETE",
        });
        navigate("/dashboard/assessments");
    };

    return (
        assessment && (
            <div className="assessment-info">
                <h2>{`${assessment.beneficiary.firstName} ${assessment.beneficiary.lastName}`}</h2>
                <h3>{`Date Taken: ${dateTaken.toLocaleDateString(
                    undefined,
                    formattedDateOptions
                )}`}</h3>
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

                <button
                    className="return-btn"
                    onClick={() => navigate("/dashboard/assessments")}
                >
                    return
                </button>

                <button
                    className="delete-btn"
                    onClick={() => handleDelete(assessmentId)}
                >
                    delete
                </button>
            </div>
        )
    );
};
export default SingleAssessment;
