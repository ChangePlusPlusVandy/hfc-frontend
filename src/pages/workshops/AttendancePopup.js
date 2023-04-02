import React, { useEffect, useState } from "react";
import "./Workshops.css";
import "./SingleWorkshop.css";

export const AttendancePopup = (props) => {
    const [id, setID] = useState();
    const [benIDs, setBenIds] = useState([]);
    const [mess, setMessage] = useState("");
    useEffect(() => {
        fetch("http://localhost:3000/beneficiaries")
            .then((response) => response.json())
            .then((data) => {
                setBenIds(data.map((item) => Number(item.id)));
            });
    }, []);
    const submit = () => {
        console.log(benIDs);
        console.log(id);
        console.log(benIDs.includes(id));
        if (benIDs.includes(id)) {
            props.setRegistered((previous) => previous + 1);
            props.onClose();
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
