import React from "react";
import "./RateButtons.css";

const RateButtons = ({ activeRatingIndex, onBtnClick }) => {
    const buttonNames = [
        "Not at all",
        "Slightly",
        "Moderately",
        "Very much",
        "Extremely",
    ];

    return (
        <div className="form-rate-btns-container">
            <div className="form-rate-btns">
                {buttonNames.map((buttonName, index) => {
                    return (
                        <div className="form-rate-btn-container" key={index}>
                            <button
                                className={`form-rate-btn${
                                    index === activeRatingIndex ? " active" : ""
                                }`}
                                onClick={() => onBtnClick(index + 1)}
                            >
                                <div className="form-rate-btn-circle">
                                    {index + 1}
                                </div>
                                <div className="form-rate-btn-name">
                                    {buttonName}
                                </div>
                            </button>
                            <div className="form-rate-btn-delimiter" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RateButtons;
