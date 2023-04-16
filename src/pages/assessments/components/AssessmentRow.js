import React, { useEffect, useState } from "react";
import { formattedDateOptions } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./AssessmentRow.css";

const AssessmentRow = (props) => {
    const dateTaken = new Date(props.dateTaken);

    const navigate = useNavigate();

    const { isAdmin } = useAuth();

    const handleClick = () => {
        if (isAdmin) navigate(`/dashboard/assessments/${props.assessmentId}`);
    };

    return (
        <div className="assessment-link" onClick={handleClick}>
            {props.beneficiary && (
                <div className="assessment-beneficiary-info">
                    <h4 className="bfc-name">
                        {`${props.beneficiary.firstName} ${props.beneficiary.lastName}`}
                    </h4>
                    <h4 className="bfc-id">{props.beneficiary.id}</h4>
                    <h4 className="assessment-date">
                        {dateTaken.toLocaleDateString(
                            undefined,
                            formattedDateOptions
                        )}
                    </h4>
                </div>
            )}
        </div>
    );
};

export default AssessmentRow;
