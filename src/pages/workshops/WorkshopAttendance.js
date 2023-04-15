import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams} from "react-router-dom";
import "./Workshops.css";
import "./SingleWorkshop.css";
import { AttendancePopup } from "./AttendancePopup";
import Sad from "../../assets/images/Emojis/Sad.png";
import Okay from "../../assets/images/Emojis/Okay.png";
import Happy from "../../assets/images/Emojis/Happy.png";
import Happiest from "../../assets/images/Emojis/Happiest.png";

export const WorkshopAttendance = () => {
    const {workshopID} = useParams();
    const [workshop, setWorkshop] = useState({});
    const [idMode, setidMode] = useState(false);
    const [totalAttendees, setTotalAttendees] = useState(0);
    const [attendees, setAttendees] = useState([]);
    const [ratingPoints, setRatingPoints] = useState(0);
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [instructionsScreen, setInstructions] = useState(true);
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

            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    _id: workshopID,
                    content: {
                        numAttendees: totalAttendees,
                        attendees,
                        rating: ratingPoints / totalAttendees,
                    },
                }),
            };
            console.log(requestOptions);
            try {
                fetch("http://localhost:3000/workshops", requestOptions);
            } catch (err) {
                console.log("couldn't update attendance:", err);
            }
        }
    };
    useEffect(() => {
        try {
            fetch("http://localhost:3000/workshops?_id=" + workshopID)
                .then((response) => response.json())
                .then((data) => {
                    setWorkshop(data[0]);
                    if (data[0].numAttendees) {
                        setTotalAttendees(data[0].numAttendees);
                    }
                    if (data[0].attendees) {
                        setAttendees([...data[0].attendees.map(item=>item._id)]);
                    }
                    if (data[0].rating) {
                        setRatingPoints(data[0].rating * data[0].numAttendees);
                    }
                });
                fetch("http://localhost:3000/beneficiaries")
                .then((response) => response.json())
                .then((data) => {
                    setBeneficiaries(data);
                });
        } catch (err) {
            console.log(err);
        }
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
                            to={"../../"+workshopID}
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
                {instructionsScreen ? 
                <div>
                    <h3>Track Workshop Attendance</h3>
                <div className="attendance-instructions">
                    <p>1. Start Attendance</p>
                    <p>2. Each attendee should select the image representing how they feel.</p>
                    <p>3. Direct attendee to enter benficiary ID (if applicable).</p>
                    <p>4. When all attendees have given feedback, click "done with attendance".</p>

                </div>
                <button 
                onClick={(e)=>setInstructions(false)}
                className= "workshop-submit"
                style={{
                    position: "absolute",
                    bottom: "10%",
                    left: "50%"
                }}
                >Begin Attendance</button></div> : <div>{idMode && (
                    <AttendancePopup
                        onClose={handleIDNumber}
                        setAttendees={setAttendees}
                        attendees={attendees}
                        beneficiaries={beneficiaries}
                    />
                )}
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
                    to={"../../"+workshopID}
                >
                    <br></br>
                    <button
                        onClick={submitAttendance}
                        className="workshop-submit"
                        style={{
                            position: "absolute",
                            bottom: "10%",
                            left: "50%",
                        }}
                    >
                        Done with attendance
                    </button>
                </Link>
            </div>
}
                </div>
        </div>
    );
};
