import React, { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import Select from "react-select";
import "./Workshops.css";

export const WorkshopCreateForm = () => {
    const [message, setMessage] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [numAttendees, setNumAttendees] = useState(0);
    const [date, setDate] = useState(new Date());
    const [hosts, setHosts] = useState([]);
    const [hostOptions, setHostOptions] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/users/users")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                let tempOptions = data
                    .filter((item) => item.firstName && item.lastName)
                    .map((item) => {
                        return {
                            value: item._id,
                            label: item.firstName + " " + item.lastName,
                        };
                    });
                setHostOptions(tempOptions);
            });
    }, []);
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    //const handleHost
    const handleDescChange = (event) => {
        setDescription(event.target.value);
    };
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };
    const handleNumAttendeesChange = (event) => {
        setNumAttendees(event.target.value);
    };
    const handleHostsChange = (event) => {
        setHosts(event);
        console.log(hosts);
        console.log(hostOptions);
    };

    const createWorkshop = () => {
        console.log("Attempting to create a new workshop...");

        const newWorkshopData = {
            title,
            hosts: hosts.map((item) => {
                return item.value;
            }), // TODO:
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
                        if (data.title) {
                            console.log("Post successful! Response:");
                            console.log(data);
                            setMessage("Workshop created successfully!");
                        } else {
                            setMessage("Error: " + data);
                        }
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
            <div className="dropdown-container">
                <label>
                    Hosts
                    <br />
                    <Select
                        options={hostOptions}
                        placeholder="Select Hosts"
                        onChange={handleHostsChange}
                        value={hosts}
                        isSearchable={true}
                        isMulti
                    />
                    {`${hosts}`}
                </label>
            </div>
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