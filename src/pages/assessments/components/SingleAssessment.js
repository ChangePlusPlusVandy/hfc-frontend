import React, { useState } from "react";
import Popup from "./Popup";
import {
    mentalHealthQs,
    lifeSkillsQs,
    socialSkillsQs,
    educationQs,
    vocationQs,
} from "../Assessments";

const SingleAssessment = (item) => {
    const [buttonPopup, setButtonPopup] = useState(false);

    const ViewComponent = () => (
        <div className="assessment-view">
            <div className="assessment-info">
                <h3 id="assessment-date">{`Date taken: ${item.dateTaken}`}</h3>

                <h4>Mental Health Questionnaire</h4>
                <ul role="list" className="assessment-list-stack">
                    {item.mentalHealthAnswers.map((rating, i) => (
                        <li>
                            {mentalHealthQs[i]} {rating}
                        </li>
                    ))}
                </ul>

                <h4>Life Skills Questionnaire</h4>
                <ul role="list" className="assessment-list-stack">
                    {item.lifeSkillsAnswers.map((rating, i) => (
                        <li>
                            {lifeSkillsQs[i]} {rating}
                        </li>
                    ))}
                </ul>
                <h4>Social Skills Questionnaire</h4>
                <ul role="list" className="assessment-list-stack">
                    {item.socialSkillsAnswers.map((rating, i) => (
                        <li>
                            {socialSkillsQs[i]} {rating}
                        </li>
                    ))}
                </ul>

                <h4>Education Questionnaire</h4>
                <ul role="list" className="assessment-list-stack">
                    {item.educationAnswers.map((rating, i) => (
                        <li>
                            {educationQs[i]} {rating}
                        </li>
                    ))}
                </ul>

                <h4>Vocation Questionnaire</h4>
                <ul role="list" className="assessment-list-stack">
                    {item.vocationAnswers.map((rating, i) => (
                        <li>
                            {vocationQs[i]} {rating}
                        </li>
                    ))}
                </ul>
            </div>
            {/* <div className="btn-group">
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => item.deleteBfc(item.mongoKey.toString())}
                >
                    Delete
                </button>
            </div> */}
        </div>
    );

    return (
        <div className="view-popup">
            <li className="assessment-label">{`${item.dateTaken}`}</li>
            <main>
                <button onClick={() => setButtonPopup(true)}> Expand </button>
            </main>

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <ViewComponent />
            </Popup>
        </div>
    );
};

export default SingleAssessment;
