import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AssessmentRow.css";

const AssessmentRow = (props) => {
    const [beneficiary, setBeneficiary] = useState({});

    const getBeneficiaryByID = async (mongoId) => {
        try {
            let data = await fetch(
                `http://localhost:3000/beneficiaries/?id=${mongoId}`
            );
            //console.log("get bfc ID: ", mongoId);
            data = await data.json();
            setBeneficiary(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getBeneficiaryByID(props.bfcMongoId);
    });

    return (
        <Link
            to={`/dashboard/assessments/${props.assessmentId}`}
            className="assessment-row"
        >
            <h4 className="bfc-name">
                {`${beneficiary.firstName} ${beneficiary.lastName}`}
            </h4>
            <h4 className="bfc-id">{beneficiary.id}</h4>
            <h4 className="assessment-date">{props.dateTaken}</h4>
        </Link>
    );
};

export default AssessmentRow;
