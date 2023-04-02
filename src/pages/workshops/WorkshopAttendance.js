import React, { useEffect, useState } from "react";
import { json, Link, useLocation } from "react-router-dom";
import Select from "react-select";
import "./Workshops.css";
import "./SingleWorkshop.css";
import { AttendancePopup } from "./AttendancePopup";
import Sad from "../../assets/images/Emojis/Sad.png"
import Okay from "../../assets/images/Emojis/Okay.png"
import Happy from "../../assets/images/Emojis/Happy.png"
import Happiest from "../../assets/images/Emojis/Happiest.png"
export const WorkshopAttendance = () => {
    const workshopID = useLocation().state.id;
    const [workshop, setWorkshop] = useState({});
    const [idMode, setidMode] = useState(false);
    const [id, setID] = useState(0);
    const [totalAttendees, setTotalAttendees] = useState(0);
    const [registered, setRegistered] = useState(0);
    const [ratingPoints, setRatingPoints] = useState(0);
    const [benIDs, setBenIds] = useState([]);
    const [message, setMessage] = useState("");

    const handleRating = (rating) => {
        setRatingPoints(ratingPoints + rating);
        setTotalAttendees(totalAttendees + 1);
        setidMode(true);
        console.log(totalAttendees);
    };

    const handleIDNumber = (event) => {
        setidMode(false);
    };
    const submitAttendance = () => {
        if (totalAttendees > 0) {
            console.log(totalAttendees, registered, ratingPoints);
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    _id: workshopID,
                    content: {
                        numAttendees: totalAttendees,
                        numRegistered: registered,
                        rating: ratingPoints / totalAttendees,
                    },
                }),
            };
            console.log(requestOptions);
            fetch("http://localhost:3000/workshops", requestOptions);
        }
    };
    useEffect(() => {
        fetch("http://localhost:3000/workshops?_id=" + workshopID)
            .then((response) => response.json())
            .then((data) => {
                setWorkshop(data[0]);
                if (data[0].numAttendees) {
                    setTotalAttendees(data[0].numAttendees);
                }
                if (data[0].numRegistered) {
                    setRegistered(data[0].numRegistered);
                }
                if (data[0].rating) {
                    setRatingPoints(data[0].rating * data[0].numAttendees);
                }
            });
        fetch("http://localhost:3000/beneficiaries")
            .then((response) => response.json())
            .then((data) => {
                setBenIds(data.map((item) => Number(item.id)));
            });
    }, []);
    //TODO: Instructions Page
    return (
        <div className="single-workshop-container">
            <Link to="/dashboard/workshops">&lt; back to workshop list</Link>

            <div className="single-workshop">
                <div className="single-workshop-heading">
                    <h1>{workshop.title}</h1>

                    <div className="heading-buttons">
                        <Link
                            to="../singleview"
                            state={{
                                id: workshopID,
                            }}
                        >
                            <button
                                onClick={() => editOverviewOrEnroll(false)}
                                id="overview-button"
                                className="tab"
                            >
                                Overview
                            </button>
                        </Link>
                        <button
                            id="enrollment-button"
                            className="tab"
                            style={{ backgroundColor: "darkgray" }}
                        >
                            Attendance
                        </button>
                    </div>
                </div>
                {idMode && <AttendancePopup onClose={handleIDNumber} setRegistered={setRegistered} registered={registered}/>}
                <h3>How did the workshop make you feel?</h3>
                <div className="attendance-button-container">
                    <button
                        onClick={(e) => handleRating(0)}
                        className="attendance-button"
                    >
                        <img src={Sad}></img>
                    </button>
                    <button
                        onClick={(e) => handleRating(1)}
                        className="attendance-button"
                    >
                        <img src={Okay}></img>
                    </button>
                    <button
                        onClick={(e) => handleRating(2)}
                        className="attendance-button"
                    >
                        <img src={Happy}></img>
                    </button>
                    <button
                        onClick={(e) => handleRating(3)}
                        className="attendance-button"
                    >
                        <img src={Happiest}></img>
                    </button>
                </div>
                <br></br>
                <Link
                    to="../singleview"
                    state={{
                        id: workshopID,
                    }}
                >
                    <br></br>
                    <button
                        onClick={submitAttendance}
                        className="submit-button"
                        style={{
                            position: "relative",
                            top: "25%",
                            left: "30%",
                        }}
                    >
                        Done with attendance
                    </button>
                </Link>
            </div>
        </div>
    );
};
