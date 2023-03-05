import React, { useState } from "react";
import Popup from "./Popup";

const SingleAssessment = (props) => {
    const [buttonPopup, setButtonPopup] = useState(false);

    const ViewComponent = () => (
        <div className="assessment-view">
            <div className="assessment-info">
                <h3 id="assessment-date">{`Date taken: ${props.dateTaken}`}</h3>

                <h4>Mental Health Questionnaire</h4>
                <ul role="list" className="assessment-list-stack">
                    {props.mentalHealthQs.map((obj, i) => (
                        <li>
                            Q{i}. {obj.question} {obj.answer}
                            additional note: {obj.text}
                        </li>
                    ))}
                </ul>

                <h4>Life Skills Questionnaire</h4>
                <ul role="list" className="assessment-list-stack">
                    {props.lifeSkillsQs.map((obj, i) => (
                        <li>
                            Q{i}. {obj.question} {obj.answer}
                            additional note: {obj.text}
                        </li>
                    ))}
                </ul>
                <h4>Social Skills Questionnaire</h4>
                <ul role="list" className="assessment-list-stack">
                    {props.socialSkillsQs.map((obj, i) => (
                        <li>
                            Q{i}. {obj.question} {obj.answer}
                            additional note: {obj.text}
                        </li>
                    ))}
                </ul>

                <h4>Education Questionnaire</h4>
                <ul role="list" className="assessment-list-stack">
                    {props.educationQs.map((obj, i) => (
                        <li>
                            Q{i}. {obj.question} {obj.answer}
                            additional note: {obj.text}
                        </li>
                    ))}
                </ul>

                <h4>Vocation Questionnaire</h4>
                <ul role="list" className="assessment-list-stack">
                    {props.vocationQs.map((obj, i) => (
                        <li>
                            Q{i}. {obj.question} {obj.answer}
                            additional note: {obj.text}
                        </li>
                    ))}
                </ul>

                <h4>Scores</h4>
                <li> Mental Health Score: {props.mentalHealthScore}</li>
                <li> Life Skills Score: {props.lifeSkillsScore}</li>
                <li> Social Skills Score: {props.socialSkillsScore}</li>
                <li> Education Score: {props.educationScore}</li>
                <li> Vocation Score: {props.vocationScore}</li>
                <li> Total Score: {props.totalScore}%</li>
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

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <ViewComponent />
            </Popup>
        </div>
    );
};

export default SingleAssessment;
