import React, { useEffect, useState } from "react";
import { formattedDateOptions } from "../../../utils/constants";
import { Link } from "react-router-dom";
import "./AssessmentRow.css";

const AssessmentRow = (props) => {
    const dateTaken = new Date(props.dateTaken);

    return (
        <Link
            to={`/dashboard/assessments/${props.assessmentId}`}
            className="assessment-row"
        >
            <h4 className="bfc-name">
                {`${props.beneficiary.firstName} ${props.beneficiary.lastName}`}
            </h4>
            <h4 className="bfc-id">{props.beneficiary.id}</h4>
            <h4 className="assessment-date">
                {dateTaken.toLocaleDateString(undefined, formattedDateOptions)}
            </h4>
        </Link>
    );
};

export default AssessmentRow;
