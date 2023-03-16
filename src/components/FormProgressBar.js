import React from "react";

import "./FormProgressBar.css";

const FormProgressBar = ({ stepNames, activeStepIndex, onStepClick }) => {
    return (
        <div className="form-progress-bar-container">
            <div className="form-progress-bar">
                {stepNames.map((stepName, index) => {
                    return (
                        <div
                            className="form-progress-bar-step-container"
                            key={index}
                        >
                            <a
                                className={`form-progress-bar-step${
                                    index === activeStepIndex ? " active" : ""
                                }`}
                                onClick={() => onStepClick(index)}
                            >
                                <div className="form-progress-bar-step-circle">
                                    {index + 1}
                                </div>
                                <div className="form-progress-bar-step-name">
                                    {stepName}
                                </div>
                            </a>
                            <div className="form-progress-bar-step-delimiter" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FormProgressBar;
