import React, { useEffect, useState } from "react";
import { json, Link, useLocation } from "react-router-dom";
import Select from "react-select";
import "./Workshops.css";

export const WorkshopAttendance = () => {
    const workshopID = useLocation().state.id;
    console.log(workshopID);
    const [workshop, setWorkshop] = useState({});
    const [idMode, setidMode] = useState(false);
    const [id, setID] = useState(0);
    const [totalAttendees, setTotalAttendees] = useState(0);
    const [registered, setRegistered] = useState(0);
    const [ratingPoints, setRatingPoints] = useState(0);
    const handleRating = (rating) => {
        setRatingPoints(ratingPoints + rating);
        setTotalAttendees(totalAttendees + 1);
        setidMode(true);
    };
    const handleIDNumber = (event) => {
        //todo: verify ID numbers
        setRegistered(registered + 1);
        setidMode(false);
        console.log(totalAttendees + " " + registered + ratingPoints);
    };
    const submitAttendance = () => {
        if (totalAttendees > 0) {
            console.log("editing");
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
            fetch("http://localhost:3000/workshops", requestOptions);
        }
    };
    useEffect(() => {
        console.log("here");
        fetch("http://localhost:3000/workshops?_id=" + workshopID)
            .then((response) => response.json())
            .then((data) => {
                console.log(data[0]);
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
    }, []);
    return (
        <div className="workshops-page-container">
            <h1>{workshop.title}</h1>
            {idMode ? (
                <div>
                    If you have an ID number, enter it. Otherwise, click skip.
                    <input
                        type="Number"
                        id="BeneficiaryID"
                        onChange={(e) => setID(e.target.value)}
                    />
                    <button onClick={handleIDNumber} className="submit-button">
                        Submit
                    </button>
                    <button onClick={(e) => setidMode(false)}>Skip</button>
                </div>
            ) : (
                <div className="workshops-list-container">
                    <h1>Rate The Workshop</h1>

                    <button onClick={(e) => handleRating(0)} className="button">
                        0
                    </button>
                    <button onClick={(e) => handleRating(1)} className="button">
                        1
                    </button>
                    <button onClick={(e) => handleRating(2)} className="button">
                        2
                    </button>
                    <button onClick={(e) => handleRating(3)} className="button">
                        3
                    </button>
                    <br></br>
                </div>
            )}
            <button onClick={submitAttendance} className="button">
                Submit
            </button>
        </div>
    );
};
