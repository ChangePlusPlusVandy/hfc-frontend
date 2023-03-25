import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import Table from "./Table";

const SingleAssessment = (props) => {
    const [buttonPopup, setButtonPopup] = useState(false);
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
    }, []);

    const ViewComponent = () => (
        <div className="assessment-view">
            <div className="assessment-info">
                <h2>{`${beneficiary.firstName} ${beneficiary.lastName}`}</h2>
                <h3>{`Date Taken: ${props.dateTaken}`}</h3>

                <Table
                    dataName="Mental Health"
                    dataArr={props.mentalHealthQs}
                    dataScore={props.mentalHealthScore}
                />

                <Table
                    dataName="Life Skills"
                    dataArr={props.lifeSkillsQs}
                    dataScore={props.lifeSkillsScore}
                />
                <Table
                    dataName="Social Skills"
                    dataArr={props.socialSkillsQs}
                    dataScore={props.socialSkillsScore}
                />
                <Table
                    dataName="Education"
                    dataArr={props.educationQs}
                    dataScore={props.educationScore}
                />
                <Table
                    dataName="Vocation"
                    dataArr={props.vocationQs}
                    dataScore={props.vocationScore}
                />
                <h3> Total Score: {props.totalScore}%</h3>
            </div>

            {/* <div className="btn-group">
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => deleteBfc(mongoKey.toString())}
                >
                    Delete
                </button>
            </div> */}
        </div>
    );

    return (
        <div className="view-popup">
            <li className="assessment-label">{`${beneficiary.firstName} ${beneficiary.lastName} @ ${props.dateTaken}`}</li>
            <main>
                <button onClick={() => setButtonPopup(true)}> Expand </button>
            </main>

            <Popup
                trigger={buttonPopup}
                setTrigger={setButtonPopup}
                closeBtnName="close"
                content={<ViewComponent />}
            ></Popup>
        </div>
    );
};

export default SingleAssessment;
