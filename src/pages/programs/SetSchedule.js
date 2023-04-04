import React, { useEffect, useState } from "react";
import "./styles/ScheduleModal.css";

const SetSchedule = (props) => {
    if (!props.openModal) return;
    return (
        <div className="schedule-modal-container">
            <div className="schedule-modal-body">
                <button
                    className="schedule-cancel-button"
                    onClick={props.closeModal}
                >
                    X
                </button>
                <div className="make-schedule-inner-body">
                    <h3>Add Schedule</h3>
                    <div className="set-times-container">
                        <div className="schedule-single-day">
                            <h4>Monday</h4>
                            <div className="schedule-enter-time">
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h6>:</h6>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h5>-</h5>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h6>:</h6>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                            </div>
                        </div>
                        <div className="schedule-single-day">
                            <h4>Tuesday</h4>
                            <div className="schedule-enter-time">
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h6>:</h6>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h5>-</h5>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h6>:</h6>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                            </div>
                        </div>
                        <div className="schedule-single-day">
                            <h4>Wednesday</h4>
                            <div className="schedule-enter-time">
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h6>:</h6>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h5>-</h5>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h6>:</h6>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                            </div>
                        </div>
                        <div className="schedule-single-day">
                            <h4>Thursday</h4>
                            <div className="schedule-enter-time">
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h6>:</h6>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h5>-</h5>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h6>:</h6>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                            </div>
                        </div>
                        <div className="schedule-single-day">
                            <h4>Friday</h4>
                            <div className="schedule-enter-time">
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h6>:</h6>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h5>-</h5>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h6>:</h6>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                            </div>
                        </div>
                        <div className="schedule-single-day">
                            <h4>Saturday</h4>
                            <div className="schedule-enter-time">
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h6>:</h6>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h5>-</h5>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h6>:</h6>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                            </div>
                        </div>
                        <div className="schedule-single-day">
                            <h4>Sunday</h4>
                            <div className="schedule-enter-time">
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h6>:</h6>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h5>-</h5>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                                <h6>:</h6>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="submit-button schedule-submit-button"
                    onClick={props.submitSchedule}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default SetSchedule;
