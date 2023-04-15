import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formattedDateOptions } from "../../../utils/constants";
import Table from "./Table";
import "./SingleAssessment.css";

const SingleAssessment = () => {
    const { assessmentId } = useParams();
    const navigate = useNavigate();

    const [assessment, setAssessment] = useState();
    const [deleteClicked, setDeleteClicked] = useState(false);
    // const [showAlert, setShowAlert] = useState(false);

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

    const handleDeleteClick = () => {
        setDeleteClicked(true);
        // showConfirmText(true);
    };

    const handleConfirmDelete = (id) => {
        fetch(`http://localhost:3000/assessments/?id=${id}`, {
            method: "DELETE",
        });
        navigate("/dashboard/assessments");
    };

    return (
        assessment && (
            <div className="assessment-info">
                <button
                    className="return-btn"
                    onClick={() => navigate("/dashboard/assessments")}
                >
                    return
                </button>
                <div className="assessment-info-header">
                    <h1 className="bfc-name">{`${assessment.beneficiary.firstName} ${assessment.beneficiary.lastName}'s Assessment`}</h1>
                    <p className="assessment-date">{`Date Administered: ${dateTaken.toLocaleDateString(
                        undefined,
                        formattedDateOptions
                    )}`}</p>
                </div>
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
                    dataName="Life Skills / Confidence / Self-Esteem"
                    dataArr={assessment.lifeSkillsQs}
                    dataScore={assessment.lifeSkillsScore}
                />
                <Table
                    dataName="Social Skills / Connectedness"
                    dataArr={assessment.socialSkillsQs}
                    dataScore={assessment.socialSkillsScore}
                />
                <h3> Total Score: {assessment.totalScore}%</h3>
                {!deleteClicked && (
                    <button className="delete-btn" onClick={handleDeleteClick}>
                        delete
                    </button>
                )}
                {deleteClicked && (
                    <div className="confirm-delete-container">
                        <p className="confirm-delete-text">
                            Delete this assessment? You cannot undo this.
                        </p>

                        <button
                            className="delete-btn"
                            onClick={() => handleConfirmDelete(assessmentId)}
                        >
                            confirm delete
                        </button>
                        <button
                            className="cancel-btn"
                            onClick={() => setDeleteClicked(false)}
                        >
                            cancel
                        </button>
                    </div>
                )}
            </div>
        )
    );
};
export default SingleAssessment;
