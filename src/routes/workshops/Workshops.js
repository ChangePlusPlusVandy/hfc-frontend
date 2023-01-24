import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Workshops.css";

export const Workshops = () => {
    return (
        <div className="workshops-container">
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

export const WorkshopCreateForm = () => {
    const [message, setMessage] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [numAttendees, setNumAttendees] = useState(0);
    const [date, setDate] = useState(new Date());

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescChange = (event) => {
        setDescription(event.target.value);
    };
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };
    const handleNumAttendeesChange = (event) => {
        setNumAttendees(event.target.value);
    };

    const createWorkshop = () => {
        console.log("Attempting to create a new workshop...");

        const newWorkshopData = {
            title,
            hosts: [], // TODO:
            description,
            date,
            numAttendees, // TODO:
            attendees: [], // TODO:
        };
        console.log("New workshop data:");
        console.log(newWorkshopData);

        // Validate data
        if (title && description) {
            console.log("No missing fields...");
            try {
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newWorkshopData),
                };

                fetch("http://localhost:3000/workshops", requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Post successful! Response:");
                        console.log(data);
                        setMessage("Workshop created successfully!");
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("Missing a required field");
            setMessage("Missing a required field");
        }
    };

    return (
        <div className="create-workshop-form">
            <h3>Create a Workshop</h3>
            <div>Workshop Title</div>
            <input
                type="text"
                id="Workshop Title"
                onChange={handleTitleChange}
                placeholder="Title"
            />
            <br />
            <div>Workshop Description</div>
            <input
                type="text"
                id="description"
                onChange={handleDescChange}
                placeholder="Description"
            />
            <br />
            <div>Workshop Date</div>
            <input type="date" id="Date" onChange={handleDateChange} />
            <br />
            <div>Number of Attendees</div>
            <input
                type="number"
                id="numAttendees"
                onChange={handleNumAttendeesChange}
                placeholder="Number of Attendees"
                min={0}
            />
            <br />
            <br />
            <button className="button" onClick={createWorkshop}>
                Create
            </button>
            <div>{message}</div>
        </div>
    );
};

export const WorkshopsList = () => {
    const [workshops, setWorkshops] = useState([]);

    // Fetch workshops
    useEffect(() => {
        fetch("http://localhost:3000/workshops")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched workshops:");
                console.log(data);
                setWorkshops(data);
            });
    }, []);

    return (
        <ul>
            {workshops.map((workshop) => (
                <li key={workshop.id}>{JSON.stringify(workshop)}</li>
            ))}
        </ul>
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
