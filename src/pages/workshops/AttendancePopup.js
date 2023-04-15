import React, { useEffect, useState } from "react";
import "./Workshops.css";
import "./SingleWorkshop.css";

export const AttendancePopup = (props) => {
    const [id, setID] = useState();
    const [mess, setMessage] = useState("");
    useEffect(() => {}, []);
    const submit = () => {
        if (
            props.beneficiaries.filter((item) => Number(item?.id) == id)
                .length > 0
        ) {
            const objId = props.beneficiaries.filter(
                (item) => Number(item?.id) == id
            )[0]._id;
            if (!props.attendees.includes(objId)) {
                props.setAttendees((prev) => [...prev, objId]);
                props.onClose();
            } else {
                setMessage("Your attendance has already been recorded");
            }
        } else {
            setMessage(
                "ID number is not valid. Please try again, or click skip."
            );
        }
    };
    const close = () => {
        props.onClose();
    };
    return (
        <div className="modal-container">
            <div className="modal-body">
                Enter Your ID number. If you don't have one, click skip.
                <input
                    type="text"
                    id="ID"
                    onChange={(e) => setID(Number(e.target.value))}
                    placeholder="ID"
                />
                <div className="attendance-button-container">
                    <div className="attendance-button">
                        <button className="submit-button" onClick={close}>
                            Skip
                        </button>
                    </div>
                    <div className="attendance-button">
                        <button className="submit-button" onClick={submit}>
                            Submit
                        </button>
                    </div>
                </div>
                {mess}
            </div>
        </div>
    );
};
