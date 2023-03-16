import React, { useState } from "react";
import Popup from "./Popup";
import Table from "./Table";

const SingleAssessment = (props) => {
    const [buttonPopup, setButtonPopup] = useState(false);

    const ViewComponent = () => (
        <div className="assessment-view">
            <div className="assessment-info">
                <h3 id="assessment-date">{`Date taken: ${props.dateTaken}`}</h3>

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
                    onClick={() => props.deleteBfc(props.mongoKey.toString())}
                >
                    Delete
                </button>
            </div> */}
        </div>
    );

    return (
        <div className="view-popup">
            <li className="assessment-label">{`${props.dateTaken}`}</li>
            <main>
                <button onClick={() => setButtonPopup(true)}> Expand </button>
            </main>

            <Popup
                trigger={buttonPopup}
                setTrigger={setButtonPopup}
                closeBtnName="close"
            >
                <ViewComponent />
            </Popup>
        </div>
    );
};

export default SingleAssessment;
