import React, { useEffect, useState } from "react";
import { formattedDateOptions } from "../../../utils/constants";
import { Link } from "react-router-dom";
import "./AssessmentRow.css";

const AssessmentRow = (props) => {
    const dateTaken = new Date(props.dateTaken);
    console.log("beneficiary: ", props.beneficiary);

    return (
        <Link to={`/dashboard/assessments/${props.assessmentId}`}>
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
        </Link>
    );
};

export default AssessmentRow;
