import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Workshops.css";

export const Workshops = () => {
    return (
        <div className="workshops-page-container">
            <h1>Choose an option</h1>
            <div>
                <Link className="button" to="./create">
                    Create Workshop
                </Link>
                <Link className="button" to="./all">
                    Get Workshops
                </Link>
                <Link className="button" to="./delete">
                    Delete Workshops
                </Link>
            </div>
        </div>
    );
};

export const WorkshopDeleteForm = () => {
    let [id, setID] = useState();

    const handleIdChange = (event) => {
        setID(event.target.value);
    };

    const delWorkshop = (event) => {
        event.preventDefault();
        if (id) {
            console.log(`Target Workshop ID: ${id}`);
            const requestOptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ workshopID: id }),
            };
            fetch("http://localhost:3000/workshops", requestOptions);
        }
    };

    return (
        <div className="workshop-delete-form">
            <h3>Delete a Workshop</h3>
            <input
                type="text"
                id="id"
                onChange={handleIdChange}
                placeholder="id"
            />
            <button className="button" onClick={delWorkshop}>
                Delete
            </button>
        </div>
    );
};