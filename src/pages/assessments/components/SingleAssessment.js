import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { formattedDateOptions } from "../../../utils/constants";
import Table from "./Table";
import TrashCanIcon from "../../../assets/icons/delete-icon.png";
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
                <Link to="/dashboard/assessments" id="back-arrow">
                    {" "}
                    &lt; back to assessment list
                </Link>

                <div className="assessment-info-header">
                    <h1 className="bfc-name">{`${assessment.beneficiary.firstName} ${assessment.beneficiary.lastName}'s Assessment`}</h1>
                    <p className="assessment-date-admin">Date Administered:</p>
                    <p className="assessment-date">
                        {dateTaken.toLocaleDateString(
                            undefined,
                            formattedDateOptions
                        )}{" "}
                    </p>
                </div>
                <div className="section-tables">
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
                </div>
                <div className="total-score-container">
                    <h3 className="total-score"> Total Score</h3>
                    <p className="total-score-num">{assessment.totalScore}%</p>
                </div>
                {!deleteClicked && (
                    <div className="delete-container">
                        <img
                            src={TrashCanIcon}
                            alt="delete assessment"
                            className="delete-icon"
                            onClick={handleDeleteClick}
                        />
                    </div>
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
