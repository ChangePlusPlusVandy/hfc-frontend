import React, { useEffect, useState } from "react";
import "./styles/ScheduleModal.css";

const SetSchedule = (props) => {
    // TODO: Add state)

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
                                    value={props.mondayStart}
                                    onChange={(e) =>
                                        props.setMondayStart(e.target.value)
                                    }
                                />
                                <h5>-</h5>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                    value={props.mondayEnd}
                                    onChange={(e) =>
                                        props.setMondayEnd(e.target.value)
                                    }
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
                                    value={props.tuesdayStart}
                                    onChange={(e) =>
                                        props.setTuesdayStart(e.target.value)
                                    }
                                />
                                <h5>-</h5>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                    value={props.tuesdayEnd}
                                    onChange={(e) =>
                                        props.setTuesdayEnd(e.target.value)
                                    }
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
                                    value={props.wednesdayStart}
                                    onChange={(e) =>
                                        props.setWednesdayStart(e.target.value)
                                    }
                                />
                                <h5>-</h5>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                    value={props.wednesdayEnd}
                                    onChange={(e) =>
                                        props.setWednesdayEnd(e.target.value)
                                    }
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
                                    value={props.thursdayStart}
                                    onChange={(e) =>
                                        props.setThursdayStart(e.target.value)
                                    }
                                />
                                <h5>-</h5>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                    value={props.thursdayEnd}
                                    onChange={(e) =>
                                        props.setThursdayEnd(e.target.value)
                                    }
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
                                    value={props.fridayStart}
                                    onChange={(e) =>
                                        props.setFridayStart(e.target.value)
                                    }
                                />
                                <h5>-</h5>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                    value={props.fridayEnd}
                                    onChange={(e) =>
                                        props.setFridayEnd(e.target.value)
                                    }
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
                                    value={props.saturdayStart}
                                    onChange={(e) =>
                                        props.setSaturdayStart(e.target.value)
                                    }
                                />
                                <h5>-</h5>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                    value={props.saturdayEnd}
                                    onChange={(e) =>
                                        props.setSaturdayEnd(e.target.value)
                                    }
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
                                    value={props.sundayStart}
                                    onChange={(e) =>
                                        props.setSundayStart(e.target.value)
                                    }
                                />
                                <h5>-</h5>
                                <input
                                    className="schedule-enter-input"
                                    type="text"
                                    placeholder="00"
                                    value={props.sundayEnd}
                                    onChange={(e) =>
                                        props.setSundayEnd(e.target.value)
                                    }
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
